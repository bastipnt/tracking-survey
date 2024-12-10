/**
 * VPN detection
 *
 * Ressources:
 * @see https://nordvpn.com/blog/how-to-detect-vpn/
 * @see https://www.ip2proxy.com/demo
 * @see https://fingerprint.com/blog/vpn-detection-location-spoofing-fraud-prevention/
 * @see https://fingerprint.com/blog/vpn-detection-how-it-works/
 *
 * Detection implementet here:
 * - Timezone mismatch
 * - OS mismatch
 *
 */

export enum VPNDetectionValues {
  NoVpn = "0",
  TimezoneMismatch = "1",
  OSMismatch = "2",
}

export type VPNDetectionValuesStrings = `${VPNDetectionValues}`;

export default class VPNDetection {
  getValue(): VPNDetectionValuesStrings {
    // temp disabled - needs backend
    // try {
    //   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    //   console.log(timezone);
    // } catch (error) {}

    return VPNDetectionValues.NoVpn;
  }
}
