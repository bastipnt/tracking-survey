import FingerprintJS, { type GetResult } from "@fingerprintjs/fingerprintjs";
import type { VPNDetectionValuesStrings } from "./VPNDetection";
import VPNDetection from "./VPNDetection";

export type Fingerprint = GetResult;

export type FingerprintArr = {
  name: string;
  value: string | number | boolean;
}[];

export default class Fingerprinter {
  fingerprint?: Fingerprint;

  async createFingerprint() {
    const fingerprintJS = await this.createFingerprintJSFingerprint();

    this.fingerprint = fingerprintJS;
  }

  get fingerprintArr(): FingerprintArr {
    if (!this.fingerprint) return [];

    const fingerprintArr = Object.entries(this.fingerprint.components).map(
      ([componentName, component]) => {
        const name = componentName;
        let value;

        if ("value" in component) value = component.value;

        if (value && typeof value === "object") value = "Object";

        if (value === undefined || value === "") value = "Unknown";

        return {
          name,
          value,
        };
      },
    );

    return [
      {
        name: "Your Visitor-ID",
        value: this.fingerprint.visitorId,
      },
      ...fingerprintArr,
    ];
  }

  private async createFingerprintJSFingerprint(): Promise<GetResult> {
    const fingerprintAgent = await FingerprintJS.load();
    const fingerprint = await fingerprintAgent.get();

    return fingerprint;
  }
}
