import Elysia, { t } from "elysia";
import e from "../dbschema/edgeql-js";
import { edgedb } from "../dbschema/edgeql-js/imports";
import { Fingerprint } from "../dbschema/interfaces";
import { getUser, userService } from "./user";

const fingerprintParams = t.Object({
  components: t.String(),
});

class FingerprintController {
  private client: edgedb.Client;

  constructor(client: edgedb.Client) {
    this.client = client;
  }

  async addFP(
    userId: string,
    fpParams: Omit<Fingerprint, "user" | "id" | "createdAt">,
  ): Promise<string> {
    const createdAt = new Date();
    const result = await e
      .insert(e.Fingerprint, {
        user: e.select(e.User, () => ({ filter_single: { id: userId } })),
        ...fpParams,
        createdAt,
      })
      .run(this.client);

    return result.id;
  }
}

export const fingerprintRoutes = (client: edgedb.Client) =>
  new Elysia({ prefix: "/fp" })
    .use(userService)
    .decorate("fpController", new FingerprintController(client))
    .use(getUser)
    .model({ fingerprintParams })
    .post(
      "/",
      async ({ body, userId, fpController }) => {
        await fpController.addFP(userId, body);
        return { status: 200, message: "success" };
      },
      { body: "fingerprintParams" },
    );
