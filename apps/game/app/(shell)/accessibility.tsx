import { AccessibilityParityPanel } from "../../src/components/AccessibilityParityPanel";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ShellPage } from "../../src/components/ShellPage";

export default function AccessibilityParityScreen() {
  return (
    <ShellPage
      eyebrow="ACCESSIBILITY AND PLATFORM PARITY"
      title="One essential text-first path across browser, iOS, and Android."
      intro="The shell documents keyboard, screen-reader, touch, switch, scaling, reflow, contrast, orientation, reduced-motion, reduced-data, low-bandwidth, audio-text, haptic, and gesture alternatives."
      aside={
        <BoundaryNotice>
          This matrix records source and CI evidence. Independent assistive
          technology, device, affected-user, accessibility, security, privacy,
          and legal review remain open.
        </BoundaryNotice>
      }
    >
      <AccessibilityParityPanel />
    </ShellPage>
  );
}
