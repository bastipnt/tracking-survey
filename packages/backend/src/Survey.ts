import Elysia, { t } from "elysia";
import e from "../dbschema/edgeql-js";
import { type edgedb } from "../dbschema/edgeql-js/imports";
import { getUser, userService } from "./user";

const question = t.Object({
  question: t.String(),
  value: t.String(),
});

const surveyPart = t.Object({
  part: t.Number(),
  userId: t.String(),
  questions: t.Array(question),
});

type SurveyPart = typeof surveyPart.static;

class Survey {
  client: edgedb.Client;

  constructor(client: edgedb.Client) {
    this.client = client;
  }

  async add(
    userId: string,
    surveyPartParams: Omit<SurveyPart, "userId">,
  ): Promise<string> {
    const result = await e
      .insert(e.Survey, {
        user: e.select(e.User, () => ({
          filter_single: { id: userId },
        })),
        answers: surveyPartParams.questions,
      })
      .run(this.client);

    return result.id;
  }

  async getAll(): Promise<SurveyPart[]> {
    const result = await e
      .select(e.Survey, (survey) => ({
        userId: survey.id,
        questions: survey.answers,
        part: e.int16(1),
      }))
      .run(this.client);

    console.log(result);

    return result as SurveyPart[];
  }
}

export const survey = (client: edgedb.Client) =>
  new Elysia({ prefix: "/survey" })
    .use(userService)
    .decorate("surveyHandler", new Survey(client))
    .use(getUser)
    .model({ surveyPart: t.Omit(surveyPart, ["userId"]) })
    .post(
      "/1",
      async ({ surveyHandler, body, userId }) => {
        await surveyHandler.add(userId, body);

        return { status: 200, message: "success" };
      },
      { body: "surveyPart" },
    )
    .get("/all", async ({ surveyHandler }) => {
      const surveys = await surveyHandler.getAll();

      return {
        success: true,
        data: surveys,
      };
    });
