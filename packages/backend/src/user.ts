import Elysia, { t } from "elysia";
import e from "../dbschema/edgeql-js";
import { type edgedb } from "../dbschema/edgeql-js/imports";

const userObject = t.Object({
  id: t.String(),
  visitorId: t.String(),
});

type UserObject = typeof userObject.static;

class UserHandler {
  private client: edgedb.Client;

  constructor(client: edgedb.Client) {
    this.client = client;
  }

  async checkExists(visitorId: string): Promise<string | undefined> {
    const result = await e
      .select(e.User, (user) => ({
        filter_single: e.op(user.visitorId, "=", visitorId),
      }))
      .run(this.client);

    return result?.id;
  }

  async create(visitorId: string): Promise<string> {
    const result = await e.insert(e.User, { visitorId }).run(this.client);

    console.log(JSON.stringify(result, null, 2));
    return result.id;
  }
}

export const userService = new Elysia({ name: "user/service" })
  .state({
    session: {} as Record<string, string>,
  })
  .model({
    userParams: t.Omit(userObject, ["id"]),
    session: t.Cookie(
      {
        token: t.String(),
      },
      { secrets: "s3cr3t" },
    ),
  })
  .model((model) => ({
    ...model,
    optionalSession: t.Optional(model.session),
  }))
  .macro(({ onBeforeHandle }) => ({
    isSignedIn(enabled: boolean) {
      if (!enabled) return;

      onBeforeHandle(({ error, cookie: { token }, store: { session } }) => {
        if (!token.value)
          return error(401, {
            success: false,
            message: "Unauthorized",
          });

        const userId = session[token.value as unknown as number];

        if (!userId)
          return error(401, {
            success: false,
            message: "Unauthorized",
          });
      });
    },
  }));

export const getUser = new Elysia()
  .use(userService)
  .guard({
    isSignedIn: true,
    cookie: "session",
  })
  .resolve(({ store: { session }, cookie: { token } }) => ({
    userId: session[token.value],
  }))
  .as("plugin");

export const user = (client: edgedb.Client) =>
  new Elysia({ prefix: "/user" })
    .use(userService)
    .decorate("userHandler", new UserHandler(client))
    .post(
      "/sign-up-in",
      async ({
        userHandler,
        body: { visitorId },
        store: { session },
        cookie: { token },
        error,
      }) => {
        let key: string;

        if (token.value) {
          const existingSessionUserId = session[token.value];
          key = token.value;

          if (existingSessionUserId !== undefined) {
            return error(400, { success: false, message: "already signed in" });
          }
        } else {
          key = crypto.getRandomValues(new Uint32Array(1))[0].toString();
          token.value = key;
        }

        const existingUserId = await userHandler.checkExists(visitorId);
        if (existingUserId !== undefined) {
          session[key] = existingUserId;

          return {
            success: true,
            message: "signed in",
          };
        }

        const userId = await userHandler.create(visitorId);
        session[key] = userId;

        return { success: true, message: "created" };
      },
      { body: "userParams", cookie: "optionalSession" },
    )
    .get(
      "/sign-out",
      ({ cookie: { token } }) => {
        token.remove();

        return {
          success: true,
          message: "signed out",
        };
      },
      {
        cookie: "optionalSession",
      },
    )
    .use(getUser)
    .get("/profile", ({ userId }) => ({
      success: true,
      userId,
    }));
