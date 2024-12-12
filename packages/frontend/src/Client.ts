import { treaty } from "@elysiajs/eden";
import type {
  Fingerprint,
  SurveyPart1,
  SurveyPart2,
} from "../../backend/dbschema/interfaces";
import type { App } from "../../backend/src";

export type SurveyParams1 = Omit<SurveyPart1, "user" | "id" | "createdAt">;
export type SurveyParams2 = Omit<SurveyPart2, "user" | "id" | "createdAt">;
export type FingerprintParams = Omit<Fingerprint, "user" | "id" | "createdAt">;

export default class Client {
  private signedIn = false;
  private app = treaty<App>("localhost:3000", {
    fetch: {
      credentials: "include",
    },
  });

  signIn = async (visitorId: string) => {
    const res = await this.app.user["sign-up-in"].post({ visitorId });
    if (res.status === 200) this.signedIn = true;
  };

  getAll = async () => {
    if (!this.signedIn) return;

    const { data } = await this.app.survey.all.get();
    console.log(data);
  };

  submitPart1 = async (params: SurveyParams1): Promise<boolean> => {
    const res = await this.app.survey[1].post(params);
    return res.status === 200;
  };

  submitPart2 = async (params: SurveyParams2): Promise<boolean> => {
    const res = await this.app.survey[2].post(params);
    return res.status === 200;
  };

  submitFP = async (params: FingerprintParams): Promise<boolean> => {
    const requestParams = {
      components: JSON.stringify(params.components),
    };
    const res = await this.app.fp.index.post(requestParams);
    return res.status === 200;
  };
}