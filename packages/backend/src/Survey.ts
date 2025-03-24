import Elysia, { t } from "elysia";
import e from "../../../dbschema/edgeql-js";
import { type gel } from "../../../dbschema/edgeql-js/imports";
import { SurveyPart1, SurveyPart2 } from "../../../dbschema/interfaces";
// import { mergeRows } from "../../shared/helper";
import { getUser, userService } from "./user";

const surveyPart1Params = t.Object({
  numLastWeeksAds1: t.String(),
  howDoAdvertisersKnow2: t.String(),
  knowledgeTargetedAds3: t.String(),
  IAmTrackedKnowledge4: t.String(),
  okToBeTracked5: t.String(),
  knowledgeHowTracking6: t.String(),
  trackingMethodsFamiliar7: t.Array(t.String()),
  referredFromTest: t.Boolean(),
});

const surveyPart2Params = t.Object({
  interestInLearning8: t.String(),
  learningApproaches9: t.Array(t.String(), { minItems: 1 }),
  age10: t.String(),
  work11: t.String(),
  pronouns12: t.String(),
  referredFromTest: t.Boolean(),
});

class SurveyController {
  private client: gel.Client;

  constructor(client: gel.Client) {
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

  // async getAll(): Promise<any> {
  //   const query = e.select(e.User, (user) => ({
  //     id: true,
  //     visitorId: true,
  //     createdAt: true,
  //     surveyPart1: e.select(e.SurveyPart1, (surveyPart1) => ({
  //       ...e.SurveyPart1["*"],
  //       user: false,
  //       filter: e.op(user, "=", surveyPart1.user),
  //     })),
  //     surveyPart2: e.select(e.SurveyPart2, (surveyPart2) => ({
  //       ...e.SurveyPart2["*"],
  //       user: false,
  //       filter: e.op(user, "=", surveyPart2.user),
  //     })),
  //     fingerprint: e.select(e.Fingerprint, (fingerprint) => ({
  //       ...e.Fingerprint["*"],
  //       user: false,
  //       filter: e.op(user, "=", fingerprint.user),
  //     })),
  //     order_by: user.createdAt,
  //     filter: e.op(user.createdAt, ">=", new Date("2024-12-14")),
  //   }));

  //   // console.log("Query:", query.toEdgeQL());
  //   const eql = query.toEdgeQL();

  //   const result = await query.run(this.client);

  //   const csvArr = [
  //     [
  //       "User Id",
  //       "Tracking Id",
  //       "Date submitted",
  //       "How much targeted ads in the last weeks",
  //       "Knowledge about how advertisers know interests",
  //       "Knowledge about targeted ads",
  //       "Knowledge about being tracked",
  //       "How much ok to be tracked from 1 (not at all) to 5 (very much)",
  //       "Knowledge about how tracking works",
  //       "Familiar tracking methods",
  //       "Participant interested in learning more",
  //       "Participant interested in following learning methods",
  //       "Participant age group",
  //       "Participant employment/educational status",
  //       "Participants pronouns",
  //       "Participant has agreed to give device fingerprint",
  //     ],
  //   ];

  //   result.forEach((user) => {
  //     const part1Arr = mergeRows(
  //       user.surveyPart1.map((part1) => {
  //         return [
  //           part1.numLastWeeksAds1,
  //           part1.howDoAdvertisersKnow2,
  //           part1.knowledgeTargetedAds3,
  //           part1.IAmTrackedKnowledge4,
  //           part1.okToBeTracked5,
  //           part1.knowledgeHowTracking6,
  //           part1.trackingMethodsFamiliar7.join("; "),
  //         ];
  //       }),
  //     );

  //     const part2Arr = mergeRows(
  //       user.surveyPart2.map((part2) => {
  //         return [
  //           part2.interestInLearning8,
  //           part2.learningApproaches9.join("; "),
  //           part2.age10 === "25-40" ? "26-40" : part2.age10,
  //           part2.work11,
  //           part2.pronouns12,
  //         ];
  //       }),
  //     );

  //     const hasFingerprint = user.fingerprint.length > 0 ? "yes" : "no";

  //     if (part1Arr.length === 0 && part2Arr.length === 0) return;
  //     if (part1Arr.length === 0) part1Arr.push(...new Array(7).fill(""));
  //     if (part2Arr.length === 0) part2Arr.push(...new Array(5).fill(""));

  //     const row = [
  //       user.id,
  //       user.visitorId,
  //       user.createdAt.toLocaleDateString(),
  //       ...part1Arr,
  //       ...part2Arr,
  //       hasFingerprint,
  //     ];

  //     csvArr.push(row);
  //   });

  //   // let csvContent = "data:text/csv;charset=utf-8,";
  //   let csvContent = "";
  //   csvArr.forEach((rowArr) => {
  //     const row = rowArr.join(",");
  //     csvContent += row + "\r\n";
  //   });

  //   return { result, csvArr, csvContent, eql };
  // }
}

export const surveyRoutes = (client: gel.Client) =>
  new Elysia({ prefix: "/survey" })
    .use(userService)
    .decorate("surveyController", new SurveyController(client))
    // .get("/all", async ({ surveyController, set }) => {
    //   const { csvContent, eql } = await surveyController.getAll();
    //   set.headers["Content-Type"] = "data:text/csv";

    //   return csvContent;

    //   // return {
    //   //   success: true,
    //   //   data: eql,
    //   // };
    // })
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
    );
