import Elysia, { t } from "elysia";
import e from "../dbschema/edgeql-js";
import { type edgedb } from "../dbschema/edgeql-js/imports";
import { SurveyPart1, SurveyPart2 } from "../dbschema/interfaces";
import { getUser, userService } from "./user";

const surveyPart1Params = t.Object({
  numLastWeeksAds1: t.String(),
  howDoAdvertisersKnow2: t.String(),
  knowledgeTargetedAds3: t.String(),
  IAmTrackedKnowledge4: t.String(),
  okToBeTracked5: t.String(),
  knowledgeHowTracking6: t.String(),
  trackingMethodsFamiliar7: t.Array(t.String()),
});

const surveyPart2Params = t.Object({
  interestInLearning8: t.String(),
  learningApproaches9: t.Array(t.String(), { minItems: 1 }),
  age10: t.String(),
  work11: t.String(),
  pronouns12: t.String(),
});

type Survey = {
  id: string;
  visitorId: string;
  surveyPart1: Omit<SurveyPart1, "user"> | null;
  surveyPart2: Omit<SurveyPart2, "user"> | null;
};

class SurveyController {
  private client: edgedb.Client;

  constructor(client: edgedb.Client) {
    this.client = client;
  }

  async addPart1(
    userId: string,
    surveyParams: Omit<SurveyPart1, "user" | "id" | "createdAt">,
  ): Promise<string> {
    const createdAt = new Date();
    const result = await e
      .insert(e.SurveyPart1, {
        user: e.select(e.User, () => ({
          filter_single: { id: userId },
        })),
        ...surveyParams,
        createdAt,
      })
      .run(this.client);

    return result.id;
  }

  async addPart2(
    userId: string,
    surveyParams: Omit<SurveyPart2, "user" | "id" | "createdAt">,
  ): Promise<string> {
    const createdAt = new Date();
    const result = await e
      .insert(e.SurveyPart2, {
        user: e.select(e.User, () => ({
          filter_single: { id: userId },
        })),
        ...surveyParams,
        learningApproaches9: surveyParams.learningApproaches9 as [
          string,
          ...string[],
        ],
        createdAt,
      })
      .run(this.client);

    return result.id;
  }

  async getAll(): Promise<Survey[]> {
    const result = await e
      .select(e.User, (user) => ({
        id: true,
        visitorId: true,
        surveyPart1: e.select(e.SurveyPart1, (surveyPart1) => ({
          ...e.SurveyPart1["*"],
          user: false,
          filter_single: e.op(user, "=", surveyPart1.user),
        })),
        surveyPart2: e.select(e.SurveyPart2, (surveyPart2) => ({
          ...e.SurveyPart2["*"],
          user: false,
          filter_single: e.op(user, "=", surveyPart2.user),
        })),
      }))
      .run(this.client);

    return result;
  }
}

export const surveyRoutes = (client: edgedb.Client) =>
  new Elysia({ prefix: "/survey" })
    .use(userService)
    .decorate("surveyController", new SurveyController(client))
    .use(getUser)
    .model({ surveyPart1Params, surveyPart2Params })
    .post(
      "/1",
      async ({ surveyController, body, userId }) => {
        await surveyController.addPart1(userId, body);
        return { status: 200, message: "success" };
      },
      { body: "surveyPart1Params" },
    )
    .post(
      "/2",
      async ({ surveyController, body, userId }) => {
        await surveyController.addPart2(userId, body);
        return { status: 200, message: "success" };
      },
      { body: "surveyPart2Params" },
    )
    .get("/all", async ({ surveyController }) => {
      const surveys = await surveyController.getAll();

      return {
        success: true,
        data: surveys,
      };
    });
