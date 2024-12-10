import FingerprintJS, { type GetResult } from "@fingerprintjs/fingerprintjs";

class Fingerprinter {
  async createFingerprint(): Promise<GetResult> {
    const fingerprintAgent = await FingerprintJS.load();
    const fingerprint = await fingerprintAgent.get();
    return fingerprint;
  }
}

export default Fingerprinter;
