import FingerprintJS, { type GetResult } from "@fingerprintjs/fingerprintjs";
import type { VPNDetectionValuesStrings } from "./VPNDetection";
import VPNDetection from "./VPNDetection";

export type Fingerprint = {
  fingerprintJS: GetResult;
  additional: {
    vpnDetection: VPNDetectionValuesStrings;
  };
  visitorId: string;
};

export type FingerprintArr = {
  name: string;
  value: string | number | boolean;
}[];

export default class Fingerprinter {
  fingerprint?: Fingerprint;

  async createFingerprint() {
    const fingerprintJS = await this.createFingerprintJSFingerprint();
    const vpnDetection = new VPNDetection().getValue();

    this.fingerprint = {
      fingerprintJS,
      additional: {
        vpnDetection,
      },
      visitorId: "",
    };
  }

  get fingerprintArr(): FingerprintArr {
    if (!this.fingerprint) return [];

    const fingerprintArr = Object.entries(
      this.fingerprint.fingerprintJS.components,
    ).map(([componentName, component]) => {
      const name = componentName;
      let value;

      if ("value" in component) value = component.value;

      if (value && typeof value === "object") value = "Object";

      if (value === undefined || value === "") value = "Unknown";

      return {
        name,
        value,
      };
    });

    return [
      {
        name: "Your Visitor-ID:",
        value: this.fingerprint.fingerprintJS.visitorId,
      },
      ...fingerprintArr,
      {
        name: "vpnDetection",
        value: this.fingerprint.additional.vpnDetection,
      },
    ];
  }

  private async createFingerprintJSFingerprint(): Promise<GetResult> {
    const fingerprintAgent = await FingerprintJS.load();
    const fingerprint = await fingerprintAgent.get();

    return fingerprint;
  }
}
