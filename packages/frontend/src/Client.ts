import { treaty } from "@elysiajs/eden";
import type { App } from "../../backend/src";

export default class Client {
  private signedIn = false;
  private app = treaty<App>("localhost:3000", {
    fetch: {
      credentials: "include",
    },
  });

  async signIn(visitorId: string) {
    const res = await this.app.user["sign-up-in"].post({ visitorId });
    console.log(res);
    if (res.status === 200) this.signedIn = true;
  }

  async getAll() {
    if (!this.signedIn) return;

    const { data } = await this.app.survey.all.get();
    console.log(data);
  }

  async submitPart1() {
    const res = await this.app.survey[1].post();
  }
}
