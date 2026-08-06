from pathlib import Path
import json

ROOT = Path(".")
GAME = ROOT / "apps/game"

def write(path, content):
    target = ROOT / path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content)

def replace_once(path, old, new, label):
    target = ROOT / path
    source = target.read_text()
    count = source.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    target.write_text(source.replace(old, new, 1))

write("apps/game/src/auth/authentication-boundary.mjs", """export const AUTHENTICATION_BOUNDARY_VERSION = "0.1.0";

export const FUTURE_ACCOUNT_VALUE = Object.freeze([
  "Return to an explicitly owned private Chronicle after later authorization.",
  "Review and correct account-linked provenance after later security work.",
  "Request deletion and export through later accountable operations.",
]);

export const FUTURE_TRANSFER_REQUIREMENTS = Object.freeze([
  {
    id: "disclosure",
    label: "Explicit disclosure",
    description: "Explain exactly what would move, what would not move, and why.",
  },
  {
    id: "review",
    label: "Review",
    description: "Show the complete candidate transfer before any account action.",
  },
  {
    id: "player-confirmation",
    label: "Player confirmation",
    description: "Require a separate affirmative confirmation after review.",
  },
  {
    id: "provenance",
    label: "Provenance",
    description: "Retain where each transferred item came from and its evidence class.",
  },
  {
    id: "purpose",
    label: "Purpose",
    description: "Bind the transfer to a visible, limited purpose.",
  },
  {
    id: "correction",
    label: "Correction",
    description: "Provide a way to correct transferred material and its provenance.",
  },
  {
    id: "deletion",
    label: "Deletion",
    description: "Provide a way to delete transferred material and verify the result.",
  },
]);

export const PROLOGUE_AUTHORITY_CLAIMS = Object.freeze([
  "chronicle-evidence",
  "permission",
  "canonical-progression",
  "quest-completion",
  "reward",
  "personal-progress",
  "health-result",
  "authentic-preference",
  "longitudinal-intelligence",
]);

export function createAuthenticationBoundaryState() {
  return Object.freeze({
    version: AUTHENTICATION_BOUNDARY_VERSION,
    publicExperienceCompletableWithoutAccount: true,
    accountOfferPosition: "after-public-presentation",
    providerSelected: false,
    accountActive: false,
    sessionActive: false,
    silentTransferAllowed: false,
    defaultDisposition: "discard",
    transferAuthorized: false,
  });
}

export function evaluateFutureTransfer(reviewedRequirementIds = []) {
  const reviewed = new Set(reviewedRequirementIds);
  const missingRequirements = FUTURE_TRANSFER_REQUIREMENTS.filter(
    (requirement) => !reviewed.has(requirement.id),
  ).map((requirement) => requirement.id);

  return Object.freeze({
    reviewComplete: missingRequirements.length === 0,
    missingRequirements: Object.freeze(missingRequirements),
    transferAuthorized: false,
    accountActive: false,
    providerSelected: false,
    disposition: "discard",
    reason:
      missingRequirements.length === 0
        ? "Review completeness is evidence for a future decision only; Sprint 10 still authorizes no transfer."
        : "Future transfer review is incomplete and Sprint 10 authorizes no transfer.",
  });
}

export function denyAuthenticationAuthority(claim) {
  return Object.freeze({
    claim,
    allowed: false,
    reason:
      "Authentication cannot convert public or synthetic presentation state into domain authority.",
  });
}
""")

write("apps/game/src/auth/authentication-boundary.d.mts", """export interface FutureTransferRequirement {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

export interface AuthenticationBoundaryState {
  readonly version: string;
  readonly publicExperienceCompletableWithoutAccount: true;
  readonly accountOfferPosition: "after-public-presentation";
  readonly providerSelected: false;
  readonly accountActive: false;
  readonly sessionActive: false;
  readonly silentTransferAllowed: false;
  readonly defaultDisposition: "discard";
  readonly transferAuthorized: false;
}

export interface FutureTransferEvaluation {
  readonly reviewComplete: boolean;
  readonly missingRequirements: readonly string[];
  readonly transferAuthorized: false;
  readonly accountActive: false;
  readonly providerSelected: false;
  readonly disposition: "discard";
  readonly reason: string;
}

export const AUTHENTICATION_BOUNDARY_VERSION: "0.1.0";
export const FUTURE_ACCOUNT_VALUE: readonly string[];
export const FUTURE_TRANSFER_REQUIREMENTS: readonly FutureTransferRequirement[];
export const PROLOGUE_AUTHORITY_CLAIMS: readonly string[];

export function createAuthenticationBoundaryState(): AuthenticationBoundaryState;
export function evaluateFutureTransfer(
  reviewedRequirementIds?: readonly string[],
): FutureTransferEvaluation;
export function denyAuthenticationAuthority(claim: string): {
  readonly claim: string;
  readonly allowed: false;
  readonly reason: string;
};
""")

write("apps/game/src/components/AccountBoundaryPanel.tsx", """import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  FUTURE_ACCOUNT_VALUE,
  FUTURE_TRANSFER_REQUIREMENTS,
  PROLOGUE_AUTHORITY_CLAIMS,
  createAuthenticationBoundaryState,
  denyAuthenticationAuthority,
  evaluateFutureTransfer,
} from "../auth/authentication-boundary.mjs";
import { colors, radii, spacing } from "../theme";
import { ActionLink } from "./ActionLink";

interface AccountBoundaryPanelProps {
  notice: string;
  onDiscard: () => void;
}

export function AccountBoundaryPanel({
  notice,
  onDiscard,
}: AccountBoundaryPanelProps) {
  const boundary = createAuthenticationBoundaryState();
  const completeReview = evaluateFutureTransfer(
    FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => requirement.id),
  );

  return (
    <View style={styles.panel}>
      <View accessibilityRole="summary" style={styles.statusCard}>
        <Text style={styles.kicker}>CURRENT SPRINT 10 STATE</Text>
        <Text accessibilityRole="header" style={styles.title}>
          No account system is active.
        </Text>
        <Text style={styles.body}>
          The public synthetic experience remains completable without an
          account. No provider, credential, token, recovery flow, or production
          session is present.
        </Text>
        <View accessibilityRole="list" style={styles.factList}>
          <Text accessibilityRole="listitem" style={styles.fact}>
            Offer position: {boundary.accountOfferPosition}
          </Text>
          <Text accessibilityRole="listitem" style={styles.fact}>
            Default temporary-state disposition: {boundary.defaultDisposition}
          </Text>
          <Text accessibilityRole="listitem" style={styles.fact}>
            Silent transfer allowed: no
          </Text>
          <Text accessibilityRole="listitem" style={styles.fact}>
            Transfer authorized: no
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.kicker}>FUTURE ACCOUNT VALUE</Text>
          <Text style={styles.cardTitle}>Possible later value, not active capability</Text>
          <View accessibilityRole="list" style={styles.factList}>
            {FUTURE_ACCOUNT_VALUE.map((value) => (
              <Text accessibilityRole="listitem" key={value} style={styles.fact}>
                • {value}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>FUTURE TRANSFER REVIEW</Text>
          <Text style={styles.cardTitle}>
            Seven requirements before any later confirmation
          </Text>
          <View accessibilityRole="list" style={styles.requirements}>
            {FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => (
              <View
                accessibilityRole="listitem"
                key={requirement.id}
                style={styles.requirement}
              >
                <Text style={styles.requirementTitle}>{requirement.label}</Text>
                <Text style={styles.fact}>{requirement.description}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.warning}>
            Even a complete review authorizes nothing in Sprint 10:{" "}
            {completeReview.transferAuthorized ? "authorized" : "not authorized"}.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.kicker}>AUTHORITY DENIAL</Text>
        <Text style={styles.cardTitle}>
          Authentication cannot transform presentation into personal truth
        </Text>
        <View accessibilityRole="list" style={styles.claims}>
          {PROLOGUE_AUTHORITY_CLAIMS.map((claim) => {
            const denial = denyAuthenticationAuthority(claim);
            return (
              <Text accessibilityRole="listitem" key={claim} style={styles.fact}>
                {claim}: {denial.allowed ? "allowed" : "denied"}
              </Text>
            );
          })}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Clears the stored temporary synthetic session and returns to the public arrival."
          onPress={onDiscard}
          style={({ pressed }: { pressed: boolean }) => [
            styles.discard,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.discardText}>Discard temporary state</Text>
        </Pressable>
        <ActionLink
          href="/map"
          label="Continue without an account"
          description="Return to the public synthetic island map."
          variant="secondary"
        />
        <ActionLink
          href="/direct"
          label="Review the direct explanation"
          description="Read the same essential authority boundary without story framing."
          variant="secondary"
        />
      </View>

      <Text accessibilityLiveRegion="polite" style={styles.notice}>
        {notice}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: spacing.large,
  },
  statusCard: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    backgroundColor: colors.nightSoft,
    padding: spacing.large,
    gap: spacing.small,
  },
  kicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
  },
  body: {
    color: colors.foam,
    fontSize: 16,
    lineHeight: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.medium,
  },
  card: {
    flexGrow: 1,
    flexBasis: 320,
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.small,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  factList: {
    gap: spacing.xsmall,
  },
  fact: {
    color: colors.inkSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  requirements: {
    gap: spacing.small,
  },
  requirement: {
    gap: 3,
  },
  requirementTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "800",
  },
  warning: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
  },
  claims: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.small,
  },
  actions: {
    gap: spacing.small,
  },
  discard: {
    minHeight: 56,
    borderRadius: radii.medium,
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.medium,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  discardText: {
    color: colors.night,
    fontSize: 16,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.76,
  },
  notice: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
});
""")

write("apps/game/app/(shell)/account.tsx", """import { useRouter } from "expo-router";
import { useState } from "react";

import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { AccountBoundaryPanel } from "../../src/components/AccountBoundaryPanel";
import { ShellPage } from "../../src/components/ShellPage";
import { clearStoredSyntheticSession } from "../../src/offline/async-offline-storage";

export default function AccountBoundaryScreen() {
  const router = useRouter();
  const [notice, setNotice] = useState(
    "Default boundary: temporary and synthetic state is discarded, and no account or transfer is active.",
  );

  async function discardTemporaryState() {
    const result = await clearStoredSyntheticSession();
    setNotice(
      result.ok
        ? "Temporary synthetic state was cleared. No account, Chronicle record, permission, or progress was created."
        : "The storage adapter could not confirm a clear. The boundary still authorizes no transfer or account state.",
    );
    router.replace("/");
  }

  return (
    <ShellPage
      eyebrow="POST-PROLOGUE ACCOUNT BOUNDARY"
      title="Future account value is explained here, but authentication is not implemented."
      intro="This informational boundary appears after the public presentation path. It selects no provider, creates no account, and transfers no state."
      aside={
        <BoundaryNotice>
          The default is to discard temporary or synthetic state. Any future
          transfer requires disclosure, review, confirmation, provenance,
          purpose, correction, and deletion behavior through a separately
          authorized security and operations workstream.
        </BoundaryNotice>
      }
    >
      <AccountBoundaryPanel
        notice={notice}
        onDiscard={() => void discardTemporaryState()}
      />
    </ShellPage>
  );
}
""")

write("apps/game/src/accessibility/accessibility-parity.mjs", """export const ACCESSIBILITY_PARITY_VERSION = "0.1.0";

export const ACCESSIBILITY_MODALITIES = Object.freeze([
  "keyboard",
  "screen-reader",
  "touch",
  "switch",
  "scaling",
  "reflow",
  "contrast",
  "orientation",
  "reduced-motion",
  "reduced-data",
  "low-bandwidth",
  "audio-text",
  "haptic",
  "gesture-alternatives",
]);

export const ACCESSIBILITY_PLATFORMS = Object.freeze([
  "browser",
  "ios",
  "android",
]);

function support(status, evidence, alternative, residual = null) {
  return Object.freeze({ status, evidence, alternative, residual });
}

export const PLATFORM_SUPPORT_MATRIX = Object.freeze({
  browser: Object.freeze({
    keyboard: support(
      "supported-by-shell",
      "Links and buttons use semantic roles and sequential focus without gesture-only actions.",
      "Every action is available as a visible link or button.",
    ),
    "screen-reader": support(
      "platform-assisted",
      "Headings, lists, alerts, summaries, labels, hints, and polite live regions are exposed.",
      "Essential information is also visible text.",
      "Browser and screen-reader combinations still require independent device testing.",
    ),
    touch: support(
      "supported-by-shell",
      "Interactive targets use at least 44 logical pixels of height.",
      "Keyboard and switch-access paths expose the same actions.",
    ),
    switch: support(
      "platform-assisted",
      "Semantic links and buttons participate in platform focus traversal.",
      "No action requires free-form drawing, dragging, or timed gestures.",
      "Switch-control behavior varies by browser and operating system.",
    ),
    scaling: support(
      "supported-by-shell",
      "Text uses platform scaling and compact layouts reduce title size without clipping.",
      "All essential copy remains text rather than image text.",
    ),
    reflow: support(
      "supported-by-shell",
      "Pages use scroll containers, wrapping rows, flexible bases, and bounded readable widths.",
      "Content remains in document order when cards wrap.",
    ),
    contrast: support(
      "validated-by-contract",
      "Named foreground/background pairs meet at least 4.5:1.",
      "Meaning is not conveyed by color alone.",
    ),
    orientation: support(
      "supported-by-reflow",
      "The layout responds to available width rather than requiring one orientation.",
      "Scrollable text-first content remains available.",
    ),
    "reduced-motion": support(
      "not-required-by-default",
      "The Sprint 10 shell uses no essential animation or motion transition.",
      "All state changes are announced with text.",
    ),
    "reduced-data": support(
      "supported-by-bundle",
      "Essential public content is bundled and does not require analytics, media, or provider requests.",
      "Text-first routes remain complete.",
    ),
    "low-bandwidth": support(
      "supported-by-bundle",
      "Essential content and interaction rules work without a network request.",
      "The direct path is always available.",
    ),
    "audio-text": support(
      "text-is-primary",
      "No essential information depends on audio.",
      "Dialogue and state changes are exposed as text.",
    ),
    haptic: support(
      "not-required-by-default",
      "No essential state or action depends on haptic feedback.",
      "Visible and announced text provides the equivalent.",
    ),
    "gesture-alternatives": support(
      "supported-by-shell",
      "Every action is a standard pressable link or button.",
      "No essential action depends on swipe, pinch, drag, long press, or multi-touch.",
    ),
  }),
  ios: Object.freeze({
    keyboard: support(
      "platform-assisted",
      "Semantic controls support external-keyboard and focus traversal through React Native.",
      "Touch and switch-access paths expose the same actions.",
      "External-keyboard behavior requires device testing.",
    ),
    "screen-reader": support(
      "platform-assisted",
      "VoiceOver receives roles, labels, hints, headings, lists, alerts, and live-region text.",
      "Essential information is visible text.",
      "Independent VoiceOver device testing remains open.",
    ),
    touch: support(
      "supported-by-shell",
      "Interactive targets use at least 44 logical pixels of height.",
      "VoiceOver and Switch Control can reach the same controls.",
    ),
    switch: support(
      "platform-assisted",
      "Standard semantic controls are compatible with Switch Control traversal.",
      "No timed or gesture-only action exists.",
      "Independent Switch Control device testing remains open.",
    ),
    scaling: support(
      "supported-by-shell",
      "React Native text scaling remains enabled and compact layout avoids fixed-height text containers.",
      "All essential copy remains text.",
    ),
    reflow: support(
      "supported-by-shell",
      "Scroll containers and wrapping cards adapt to compact widths.",
      "Direct information remains in reading order.",
    ),
    contrast: support(
      "validated-by-contract",
      "Named foreground/background pairs meet at least 4.5:1.",
      "Labels and state text accompany color.",
    ),
    orientation: support(
      "supported-by-reflow",
      "No route is locked to portrait or landscape.",
      "The same scrollable content reflows by width.",
    ),
    "reduced-motion": support(
      "not-required-by-default",
      "No essential animation, parallax, or auto-advancing transition is present.",
      "Text and explicit controls expose every state.",
    ),
    "reduced-data": support(
      "supported-by-bundle",
      "Essential content is bundled and no media or analytics request is required.",
      "The direct path remains complete.",
    ),
    "low-bandwidth": support(
      "supported-by-bundle",
      "Public content and rules remain usable without network access.",
      "Storage failure falls back to bundled text.",
    ),
    "audio-text": support(
      "text-is-primary",
      "No essential information depends on audio.",
      "Dialogue, notices, and alternatives are text.",
    ),
    haptic: support(
      "not-required-by-default",
      "No essential state depends on haptics.",
      "Text and control state provide the equivalent.",
    ),
    "gesture-alternatives": support(
      "supported-by-shell",
      "All actions are standard buttons or links.",
      "No essential action requires swipe, drag, pinch, shake, or long press.",
    ),
  }),
  android: Object.freeze({
    keyboard: support(
      "platform-assisted",
      "Semantic controls support hardware-keyboard and focus traversal through React Native.",
      "Touch and switch-access paths expose the same actions.",
      "Hardware-keyboard behavior requires device testing.",
    ),
    "screen-reader": support(
      "platform-assisted",
      "TalkBack receives roles, labels, hints, headings, lists, alerts, and live-region text.",
      "Essential information is visible text.",
      "Independent TalkBack device testing remains open.",
    ),
    touch: support(
      "supported-by-shell",
      "Interactive targets use at least 44 logical pixels of height.",
      "TalkBack and Switch Access can reach the same controls.",
    ),
    switch: support(
      "platform-assisted",
      "Standard semantic controls are compatible with Switch Access traversal.",
      "No timed or gesture-only action exists.",
      "Independent Switch Access device testing remains open.",
    ),
    scaling: support(
      "supported-by-shell",
      "React Native text scaling remains enabled and compact layout avoids fixed-height text containers.",
      "All essential copy remains text.",
    ),
    reflow: support(
      "supported-by-shell",
      "Scroll containers and wrapping cards adapt to compact widths.",
      "Direct information remains in reading order.",
    ),
    contrast: support(
      "validated-by-contract",
      "Named foreground/background pairs meet at least 4.5:1.",
      "Labels and state text accompany color.",
    ),
    orientation: support(
      "supported-by-reflow",
      "No route is locked to portrait or landscape.",
      "The same scrollable content reflows by width.",
    ),
    "reduced-motion": support(
      "not-required-by-default",
      "No essential animation, parallax, or auto-advancing transition is present.",
      "Text and explicit controls expose every state.",
    ),
    "reduced-data": support(
      "supported-by-bundle",
      "Essential content is bundled and no media or analytics request is required.",
      "The direct path remains complete.",
    ),
    "low-bandwidth": support(
      "supported-by-bundle",
      "Public content and rules remain usable without network access.",
      "Storage failure falls back to bundled text.",
    ),
    "audio-text": support(
      "text-is-primary",
      "No essential information depends on audio.",
      "Dialogue, notices, and alternatives are text.",
    ),
    haptic: support(
      "not-required-by-default",
      "No essential state depends on haptics.",
      "Text and control state provide the equivalent.",
    ),
    "gesture-alternatives": support(
      "supported-by-shell",
      "All actions are standard buttons or links.",
      "No essential action requires swipe, drag, pinch, shake, or long press.",
    ),
  }),
});

export const DIRECT_PATH_PARITY = Object.freeze({
  narrative: Object.freeze([
    "no-account-public-entry",
    "authority-boundary",
    "meaningful-refusal",
    "future-account-inactive",
    "discard-by-default",
  ]),
  direct: Object.freeze([
    "no-account-public-entry",
    "authority-boundary",
    "meaningful-refusal",
    "future-account-inactive",
    "discard-by-default",
  ]),
});

export const CONTRAST_PAIRS = Object.freeze([
  Object.freeze({ name: "ink on paper", foreground: "#1D272B", background: "#FFFDF7" }),
  Object.freeze({ name: "soft ink on paper", foreground: "#526168", background: "#FFFDF7" }),
  Object.freeze({ name: "white on night", foreground: "#FFFFFF", background: "#101A24" }),
  Object.freeze({ name: "foam on night", foreground: "#E9F1EE", background: "#101A24" }),
  Object.freeze({ name: "soft gold on night", foreground: "#F1DEAE", background: "#101A24" }),
  Object.freeze({ name: "night on gold", foreground: "#101A24", background: "#D6A84A" }),
  Object.freeze({ name: "coral on paper", foreground: "#9F523F", background: "#FFFDF7" }),
  Object.freeze({ name: "ink on parchment", foreground: "#1D272B", background: "#F4EFE3" }),
  Object.freeze({ name: "soft ink on parchment", foreground: "#526168", background: "#F4EFE3" }),
]);

export const RESIDUAL_ACCESSIBILITY_LIMITATIONS = Object.freeze([
  "Independent browser and assistive-technology testing remains open.",
  "Independent VoiceOver, TalkBack, Switch Control, Switch Access, external-keyboard, orientation, and device testing remains open.",
  "Affected-user comprehension and usability evidence remains open.",
  "Operating-system focus, scaling, backup, and eviction behavior may vary.",
  "Accessibility preferences are not persisted in Sprint 10.",
  "No audio or haptic experience is implemented; text is the complete primary path.",
  "Structural parity evidence is not independent accessibility certification.",
]);

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const red = channel(Number.parseInt(value.slice(0, 2), 16));
  const green = channel(Number.parseInt(value.slice(2, 4), 16));
  const blue = channel(Number.parseInt(value.slice(4, 6), 16));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function calculateContrastRatio(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateDirectPathParity() {
  const narrative = new Set(DIRECT_PATH_PARITY.narrative);
  const direct = new Set(DIRECT_PATH_PARITY.direct);
  const missingFromDirect = [...narrative].filter((item) => !direct.has(item));
  const missingFromNarrative = [...direct].filter(
    (item) => !narrative.has(item),
  );

  return Object.freeze({
    ok: missingFromDirect.length === 0 && missingFromNarrative.length === 0,
    missingFromDirect: Object.freeze(missingFromDirect),
    missingFromNarrative: Object.freeze(missingFromNarrative),
  });
}

export function validateAccessibilityParity() {
  const failures = [];

  for (const platform of ACCESSIBILITY_PLATFORMS) {
    const support = PLATFORM_SUPPORT_MATRIX[platform];
    for (const modality of ACCESSIBILITY_MODALITIES) {
      if (!support[modality]) {
        failures.push(`${platform} is missing ${modality}`);
      }
    }
  }

  for (const pair of CONTRAST_PAIRS) {
    const ratio = calculateContrastRatio(pair.foreground, pair.background);
    if (ratio < 4.5) {
      failures.push(`${pair.name} contrast is ${ratio.toFixed(2)}:1`);
    }
  }

  if (!validateDirectPathParity().ok) {
    failures.push("direct and narrative essential concepts are not equivalent");
  }

  if (RESIDUAL_ACCESSIBILITY_LIMITATIONS.length === 0) {
    failures.push("residual limitations are not documented");
  }

  return Object.freeze({
    ok: failures.length === 0,
    failures: Object.freeze(failures),
  });
}
""")

write("apps/game/src/accessibility/accessibility-parity.d.mts", """export type AccessibilityPlatform = "browser" | "ios" | "android";

export interface AccessibilitySupport {
  readonly status: string;
  readonly evidence: string;
  readonly alternative: string;
  readonly residual: string | null;
}

export const ACCESSIBILITY_PARITY_VERSION: "0.1.0";
export const ACCESSIBILITY_MODALITIES: readonly string[];
export const ACCESSIBILITY_PLATFORMS: readonly AccessibilityPlatform[];
export const PLATFORM_SUPPORT_MATRIX: Readonly<
  Record<AccessibilityPlatform, Readonly<Record<string, AccessibilitySupport>>>
>;
export const DIRECT_PATH_PARITY: {
  readonly narrative: readonly string[];
  readonly direct: readonly string[];
};
export const CONTRAST_PAIRS: readonly {
  readonly name: string;
  readonly foreground: string;
  readonly background: string;
}[];
export const RESIDUAL_ACCESSIBILITY_LIMITATIONS: readonly string[];

export function calculateContrastRatio(
  foreground: string,
  background: string,
): number;
export function validateDirectPathParity(): {
  readonly ok: boolean;
  readonly missingFromDirect: readonly string[];
  readonly missingFromNarrative: readonly string[];
};
export function validateAccessibilityParity(): {
  readonly ok: boolean;
  readonly failures: readonly string[];
};
""")

write("apps/game/src/components/AccessibilityParityPanel.tsx", """import { Platform, StyleSheet, Text, View } from "react-native";

import {
  ACCESSIBILITY_MODALITIES,
  ACCESSIBILITY_PLATFORMS,
  PLATFORM_SUPPORT_MATRIX,
  RESIDUAL_ACCESSIBILITY_LIMITATIONS,
  validateAccessibilityParity,
  validateDirectPathParity,
  type AccessibilityPlatform,
} from "../accessibility/accessibility-parity.mjs";
import { colors, radii, spacing } from "../theme";

export function AccessibilityParityPanel() {
  const currentPlatform: AccessibilityPlatform =
    Platform.OS === "web" ? "browser" : Platform.OS;
  const parity = validateAccessibilityParity();
  const directParity = validateDirectPathParity();

  return (
    <View style={styles.panel}>
      <View accessibilityRole="summary" style={styles.summary}>
        <Text style={styles.kicker}>CURRENT PLATFORM</Text>
        <Text accessibilityRole="header" style={styles.summaryTitle}>
          {currentPlatform.toUpperCase()} uses the same essential text and
          authority rules.
        </Text>
        <Text style={styles.summaryBody}>
          This is executable maintainer evidence, not independent
          accessibility certification.
        </Text>
        <Text accessibilityLiveRegion="polite" style={styles.validation}>
          Contract validation: {parity.ok ? "passed" : "failed closed"}
        </Text>
      </View>

      <View accessibilityRole="list" style={styles.platformList}>
        {ACCESSIBILITY_PLATFORMS.map((platform) => (
          <View
            accessibilityRole="listitem"
            key={platform}
            style={styles.platformCard}
          >
            <Text accessibilityRole="header" style={styles.platformTitle}>
              {platform.toUpperCase()}
            </Text>
            <View style={styles.modalityGrid}>
              {ACCESSIBILITY_MODALITIES.map((modality) => {
                const support = PLATFORM_SUPPORT_MATRIX[platform][modality];
                return (
                  <View key={modality} style={styles.modality}>
                    <Text style={styles.modalityTitle}>{modality}</Text>
                    <Text style={styles.status}>{support.status}</Text>
                    <Text style={styles.body}>{support.evidence}</Text>
                    <Text style={styles.alternative}>
                      Alternative: {support.alternative}
                    </Text>
                    {support.residual ? (
                      <Text style={styles.residual}>
                        Residual: {support.residual}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.twoColumn}>
        <View style={styles.card}>
          <Text style={styles.kicker}>DIRECT-PATH PARITY</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Narrative and direct routes retain the same essential concepts
          </Text>
          <Text style={styles.body}>
            Structural parity: {directParity.ok ? "passed" : "failed closed"}.
            Neither route changes access, authority, preference, completion,
            reward, or progress.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.kicker}>RESIDUAL LIMITATIONS</Text>
          <Text accessibilityRole="header" style={styles.cardTitle}>
            Evidence still required
          </Text>
          <View accessibilityRole="list" style={styles.residualList}>
            {RESIDUAL_ACCESSIBILITY_LIMITATIONS.map((limitation) => (
              <Text
                accessibilityRole="listitem"
                key={limitation}
                style={styles.body}
              >
                • {limitation}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: spacing.large,
  },
  summary: {
    borderRadius: radii.large,
    backgroundColor: colors.nightSoft,
    borderWidth: 1,
    borderColor: colors.oceanBright,
    padding: spacing.large,
    gap: spacing.small,
  },
  kicker: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  summaryTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
  },
  summaryBody: {
    color: colors.foam,
    fontSize: 15,
    lineHeight: 23,
  },
  validation: {
    color: colors.goldSoft,
    fontSize: 14,
    fontWeight: "800",
  },
  platformList: {
    gap: spacing.large,
  },
  platformCard: {
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.medium,
  },
  platformTitle: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "800",
  },
  modalityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: spacing.small,
  },
  modality: {
    flexGrow: 1,
    flexBasis: 260,
    borderRadius: radii.medium,
    backgroundColor: colors.parchment,
    padding: spacing.medium,
    gap: spacing.xsmall,
  },
  modalityTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "800",
  },
  status: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  body: {
    color: colors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
  },
  alternative: {
    color: colors.ink,
    fontSize: 13,
    lineHeight: 20,
  },
  residual: {
    color: colors.coral,
    fontSize: 13,
    lineHeight: 20,
  },
  twoColumn: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.medium,
  },
  card: {
    flexGrow: 1,
    flexBasis: 320,
    borderRadius: radii.large,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.paper,
    padding: spacing.large,
    gap: spacing.small,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
  },
  residualList: {
    gap: spacing.xsmall,
  },
});
""")

write("apps/game/app/(shell)/accessibility.tsx", """import { AccessibilityParityPanel } from "../../src/components/AccessibilityParityPanel";
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
""")

write("apps/game/scripts/validate-authentication-boundary.mjs", """import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FUTURE_TRANSFER_REQUIREMENTS,
  PROLOGUE_AUTHORITY_CLAIMS,
  createAuthenticationBoundaryState,
  denyAuthenticationAuthority,
  evaluateFutureTransfer,
} from "../src/auth/authentication-boundary.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");

function read(path) {
  return readFileSync(join(gameRoot, path), "utf8");
}

const boundary = createAuthenticationBoundaryState();
assert.equal(boundary.publicExperienceCompletableWithoutAccount, true);
assert.equal(boundary.accountOfferPosition, "after-public-presentation");
assert.equal(boundary.providerSelected, false);
assert.equal(boundary.accountActive, false);
assert.equal(boundary.sessionActive, false);
assert.equal(boundary.silentTransferAllowed, false);
assert.equal(boundary.defaultDisposition, "discard");
assert.equal(boundary.transferAuthorized, false);

assert.equal(FUTURE_TRANSFER_REQUIREMENTS.length, 7);
const completeReview = evaluateFutureTransfer(
  FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => requirement.id),
);
assert.equal(completeReview.reviewComplete, true);
assert.equal(completeReview.transferAuthorized, false);
assert.equal(completeReview.disposition, "discard");

const incompleteReview = evaluateFutureTransfer(["disclosure"]);
assert.equal(incompleteReview.reviewComplete, false);
assert.equal(incompleteReview.transferAuthorized, false);

for (const claim of [...PROLOGUE_AUTHORITY_CLAIMS, "unknown-future-claim"]) {
  assert.equal(denyAuthenticationAuthority(claim).allowed, false);
}

const packageJson = JSON.parse(read("package.json"));
for (const prohibitedDependency of [
  "@auth0/auth0-react",
  "@clerk/clerk-expo",
  "@supabase/supabase-js",
  "firebase",
  "next-auth",
]) {
  assert.equal(
    packageJson.dependencies?.[prohibitedDependency],
    undefined,
    `Sprint 10.7 must not select ${prohibitedDependency}`,
  );
}

const play = read("app/(shell)/play.tsx");
assert.match(play, /<SceneRenderer/);
assert.match(play, /href="\/account"/);
assert.ok(
  play.indexOf("<SceneRenderer") < play.indexOf('href="/account"'),
  "the account boundary offer must follow the public presentation",
);

const account = read("app/(shell)/account.tsx");
assert.match(account, /POST-PROLOGUE ACCOUNT BOUNDARY/);
assert.match(account, /clearStoredSyntheticSession/);
assert.doesNotMatch(account, /TextInput/);
assert.doesNotMatch(account, /password\s*[:=]/i);
assert.doesNotMatch(account, /accessToken|refreshToken/);
assert.doesNotMatch(account, /signIn\s*\(|signUp\s*\(|createAccount\s*\(/);

const panel = read("src/components/AccountBoundaryPanel.tsx");
for (const requiredText of [
  "No account system is active",
  "Default temporary-state disposition",
  "Silent transfer allowed",
  "Seven requirements",
  "Discard temporary state",
  "Continue without an account",
]) {
  assert.match(panel, new RegExp(requiredText));
}

console.log("Sprint 10.7 authentication-after-prologue boundary validated:");
console.log("- public synthetic completion remains no-account");
console.log("- informational account value appears after presentation only");
console.log("- discard is the default and silent transfer is denied");
console.log("- all seven future transfer requirements remain non-authorizing");
console.log("- no provider, credential, token, recovery, or account session exists");
""")

write("apps/game/scripts/validate-accessibility-parity.mjs", """import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ACCESSIBILITY_MODALITIES,
  ACCESSIBILITY_PLATFORMS,
  CONTRAST_PAIRS,
  PLATFORM_SUPPORT_MATRIX,
  RESIDUAL_ACCESSIBILITY_LIMITATIONS,
  calculateContrastRatio,
  validateAccessibilityParity,
  validateDirectPathParity,
} from "../src/accessibility/accessibility-parity.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");

function read(path) {
  return readFileSync(join(gameRoot, path), "utf8");
}

function listFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

assert.equal(ACCESSIBILITY_MODALITIES.length, 14);
assert.deepEqual(ACCESSIBILITY_PLATFORMS, ["browser", "ios", "android"]);

for (const platform of ACCESSIBILITY_PLATFORMS) {
  for (const modality of ACCESSIBILITY_MODALITIES) {
    assert.ok(
      PLATFORM_SUPPORT_MATRIX[platform][modality],
      `${platform} is missing ${modality}`,
    );
  }
}

for (const pair of CONTRAST_PAIRS) {
  assert.ok(
    calculateContrastRatio(pair.foreground, pair.background) >= 4.5,
    `${pair.name} must meet 4.5:1`,
  );
}

assert.equal(validateDirectPathParity().ok, true);
assert.equal(validateAccessibilityParity().ok, true);
assert.ok(RESIDUAL_ACCESSIBILITY_LIMITATIONS.length >= 6);

const theme = read("src/theme.ts");
assert.match(theme, /coral: "#9F523F"/);

const shellPage = read("src/components/ShellPage.tsx");
assert.match(shellPage, /useWindowDimensions/);
assert.match(shellPage, /flexGrow: 1/);
assert.match(shellPage, /width: "100%"/);
assert.match(shellPage, /maxWidth: 1040/);
assert.match(shellPage, /titleCompact/);

const actionLink = read("src/components/ActionLink.tsx");
assert.match(actionLink, /accessibilityRole="link"/);
assert.match(actionLink, /minHeight: 56/);

const dialogueChoices = read("src/components/DialogueChoices.tsx");
assert.match(dialogueChoices, /accessibilityRole="button"/);
assert.match(dialogueChoices, /minHeight: 64/);

const accessibilityRoute = read("app/(shell)/accessibility.tsx");
assert.match(accessibilityRoute, /AccessibilityParityPanel/);
assert.match(accessibilityRoute, /Independent assistive/);

const shellLayout = read("app/(shell)/_layout.tsx");
assert.match(shellLayout, /href: "\/accessibility"/);

const direct = read("app/(shell)/direct.tsx");
const hearth = read("app/(shell)/hearth.tsx");
for (const essentialId of [
  "lesson.shell.authority-boundary.synthetic",
  "dialogue.aster.direct-path.synthetic",
]) {
  assert.match(direct + hearth, new RegExp(essentialId.replaceAll(".", "\\.")));
}

const sourceFiles = [
  ...listFiles(join(gameRoot, "app")),
  ...listFiles(join(gameRoot, "src")),
].filter((path) => /\.(?:ts|tsx|js|jsx|mjs)$/.test(path));

for (const path of sourceFiles) {
  const source = readFileSync(path, "utf8");
  for (const prohibited of [
    /\bAnimated\b/,
    /LayoutAnimation/,
    /PanResponder/,
    /react-native-gesture-handler/,
    /expo-haptics/,
    /expo-av/,
    /<Audio\b/,
    /<Video\b/,
  ]) {
    assert.doesNotMatch(
      source,
      prohibited,
      `${relative(gameRoot, path)} matched ${prohibited}`,
    );
  }
}

console.log("Sprint 10.8 accessibility and platform parity validated:");
console.log(`- modalities: ${ACCESSIBILITY_MODALITIES.join(", ")}`);
console.log("- browser, iOS, and Android matrix coverage is complete");
console.log("- named contrast pairs meet at least 4.5:1");
console.log("- direct and narrative essential concepts are equivalent");
console.log("- no essential motion, audio, haptic, or gesture-only dependency exists");
console.log("- residual independent testing limitations remain explicit");
""")

write("apps/game/test/authentication-boundary.test.mjs", """import assert from "node:assert/strict";
import test from "node:test";

import {
  FUTURE_TRANSFER_REQUIREMENTS,
  PROLOGUE_AUTHORITY_CLAIMS,
  createAuthenticationBoundaryState,
  denyAuthenticationAuthority,
  evaluateFutureTransfer,
} from "../src/auth/authentication-boundary.mjs";

test("authentication boundary is no-account, no-provider, and discard by default", () => {
  const boundary = createAuthenticationBoundaryState();
  assert.equal(boundary.publicExperienceCompletableWithoutAccount, true);
  assert.equal(boundary.providerSelected, false);
  assert.equal(boundary.accountActive, false);
  assert.equal(boundary.silentTransferAllowed, false);
  assert.equal(boundary.defaultDisposition, "discard");
  assert.equal(boundary.transferAuthorized, false);
});

test("complete future review still creates no transfer authority", () => {
  const evaluation = evaluateFutureTransfer(
    FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => requirement.id),
  );
  assert.equal(evaluation.reviewComplete, true);
  assert.equal(evaluation.transferAuthorized, false);
  assert.equal(evaluation.accountActive, false);
});

test("authentication denies all known and unknown authority claims", () => {
  for (const claim of [...PROLOGUE_AUTHORITY_CLAIMS, "unknown"]) {
    assert.equal(denyAuthenticationAuthority(claim).allowed, false);
  }
});
""")

write("apps/game/test/accessibility-parity.test.mjs", """import assert from "node:assert/strict";
import test from "node:test";

import {
  ACCESSIBILITY_MODALITIES,
  ACCESSIBILITY_PLATFORMS,
  CONTRAST_PAIRS,
  PLATFORM_SUPPORT_MATRIX,
  calculateContrastRatio,
  validateAccessibilityParity,
  validateDirectPathParity,
} from "../src/accessibility/accessibility-parity.mjs";

test("every platform covers every required accessibility modality", () => {
  for (const platform of ACCESSIBILITY_PLATFORMS) {
    for (const modality of ACCESSIBILITY_MODALITIES) {
      assert.ok(PLATFORM_SUPPORT_MATRIX[platform][modality]);
    }
  }
});

test("named text contrast pairs meet 4.5 to 1", () => {
  for (const pair of CONTRAST_PAIRS) {
    assert.ok(calculateContrastRatio(pair.foreground, pair.background) >= 4.5);
  }
});

test("direct and narrative essential concepts remain equivalent", () => {
  assert.equal(validateDirectPathParity().ok, true);
});

test("accessibility parity contract passes with residual limits retained", () => {
  assert.deepEqual(validateAccessibilityParity(), {
    ok: true,
    failures: [],
  });
});
""")

write("docs/roadmap/sprint-10.7-authentication-after-prologue-boundary.md", """# Sprint 10.7 — Authentication-after-prologue boundary

**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Implement the boundary and explanation for a possible future account after the public synthetic presentation. Do not implement production authentication.

The public experience remains completable without an account. The only account-related surface is informational, appears after the presentation route, selects no identity provider, creates no account or session, and transfers no public or synthetic state.

## Boundary behavior

- future account value is described without representing the capability as active;
- the default disposition for temporary or synthetic state is discard;
- no public presentation or offline state transfers silently;
- a future transfer candidate requires disclosure, review, player confirmation, provenance, purpose, correction, and deletion behavior;
- even a complete future review authorizes no transfer in Sprint 10; and
- account creation, recovery, session security, support, abuse, deletion operations, incidents, and production accessibility remain later work.

## Authority ceiling

Authentication cannot convert:

- dialogue choices;
- temporary presentation state;
- synthetic-session storage;
- prologue or First Lantern presentation;
- Aster framing;
- refusal, deferral, or exit;
- direct-path selection; or
- any unknown future client claim

into Chronicle evidence, permission, canonical progression, completion, rewards, personal progress, health truth, authentic preference, or Longitudinal Intelligence.

## Holdpoints preserved

Sprint 10.7 does not authorize a production identity provider, account database, credential, token, recovery flow, production session, private Chronicle, House of Keys execution, provider egress, analytics, deployment, indexing, store distribution, Sprint 11, LI-V1 through LI-V8, or institutional Phase 0 exit.

## Validation target

The exact implementation checkpoint must pass focused authentication-boundary tests, the complete permanent repository suite, existing production-site validation, browser/iOS/Android credential-free export, cleanup, and no tracked build mutation.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.8 on the same branch and PR.
""")

write("docs/roadmap/sprint-10.8-accessibility-platform-parity.md", """# Sprint 10.8 — Accessibility and platform parity

**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Establish one text-first, materially equivalent essential path across browser, iOS, and Android with executable modality, contrast, reflow, and direct-path parity evidence.

## Required modalities

The platform matrix covers:

- keyboard;
- screen reader;
- touch;
- switch access;
- text scaling;
- reflow;
- contrast;
- orientation;
- reduced motion;
- reduced data;
- low bandwidth;
- audio-to-text alternatives;
- haptic alternatives; and
- gesture alternatives.

Essential information uses semantic headings, lists, summaries, alerts, labels, hints, and live-region text. Interactive controls use standard links or buttons with at least 44 logical pixels of height. No essential action depends on animation, audio, haptics, swipe, drag, pinch, long press, multi-touch, a successful write, or a network request.

## Platform parity

Browser, iOS, and Android use the same bundled public content, deterministic rules, direct path, authority ceiling, and account boundary.

Platform assistive technologies remain adapters. Browser screen readers, VoiceOver, TalkBack, Switch Control, Switch Access, hardware keyboards, device orientation, scaling, and focus behavior still require independent testing.

## Contrast and reflow

Named text foreground/background pairs meet at least 4.5:1. The coral text token is darkened to preserve normal-text contrast on paper and parchment surfaces.

Pages use scroll containers, flexible bases, wrapping rows, compact-width title treatment, and no fixed-height essential text containers. No route is locked to portrait or landscape.

## Direct-path parity

Narrative and direct routes retain the same essential concepts:

- no-account public entry;
- the authority boundary;
- meaningful refusal;
- future account capability remains inactive; and
- temporary state is discarded by default.

Choosing the direct path cannot change access, authority, completion, rewards, preference, or progress.

## Residual limitations

The implementation is maintainer source and CI evidence, not independent accessibility certification. Independent assistive-technology, browser, mobile-device, orientation, external-keyboard, switch-access, affected-user comprehension, security, privacy, legal, and field evidence remains open.

Accessibility preferences are not persisted in Sprint 10. Audio and haptic experiences are not implemented because text is the complete primary path.

## Holdpoints preserved

Sprint 10.8 does not authorize claims of WCAG conformance, independent certification, production authentication, private Chronicle operation, analytics, provider egress, deployment, indexing, store distribution, Sprint 11, LI-V1 through LI-V8, or institutional Phase 0 exit.

## Validation target

The exact implementation checkpoint must pass modality coverage, platform matrix, contrast, reflow, direct-path parity, motion/audio/haptic/gesture absence, focused tests, the complete permanent repository suite, existing production-site validation, browser/iOS/Android credential-free export, cleanup, and no tracked build mutation.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.9 on the same branch and PR.
""")

replace_once(
    "apps/game/src/theme.ts",
    'coral: "#B96B56",',
    'coral: "#9F523F",',
    "accessible coral token",
)

replace_once(
    "apps/game/src/components/ShellPage.tsx",
    'import { ScrollView, StyleSheet, Text, View } from "react-native";',
    'import {\n  ScrollView,\n  StyleSheet,\n  Text,\n  View,\n  useWindowDimensions,\n} from "react-native";',
    "ShellPage responsive import",
)
replace_once(
    "apps/game/src/components/ShellPage.tsx",
    '  const dark = tone === "dark";\n  return (',
    '  const dark = tone === "dark";\n  const { width } = useWindowDimensions();\n  const compact = width < 480;\n\n  return (',
    "ShellPage responsive state",
)
replace_once(
    "apps/game/src/components/ShellPage.tsx",
    '      contentContainerStyle={styles.content}',
    '      contentContainerStyle={[styles.content, compact && styles.contentCompact]}',
    "ShellPage responsive content",
)
replace_once(
    "apps/game/src/components/ShellPage.tsx",
    '            style={[styles.title, dark && styles.titleDark]}',
    '            style={[\n              styles.title,\n              compact && styles.titleCompact,\n              dark && styles.titleDark,\n            ]}',
    "ShellPage responsive title",
)
replace_once(
    "apps/game/src/components/ShellPage.tsx",
    '  frame: {\n    width: "100%",',
    '  contentCompact: {\n    paddingHorizontal: spacing.medium,\n    paddingVertical: spacing.large,\n  },\n  frame: {\n    width: "100%",',
    "ShellPage compact content style",
)
replace_once(
    "apps/game/src/components/ShellPage.tsx",
    '  titleDark: {\n    color: colors.white,\n  },',
    '  titleCompact: {\n    fontSize: 32,\n    lineHeight: 38,\n  },\n  titleDark: {\n    color: colors.white,\n  },',
    "ShellPage compact title style",
)

replace_once(
    "apps/game/app/(shell)/_layout.tsx",
    '  { href: "/direct", label: "Direct path" },',
    '  { href: "/direct", label: "Direct path" },\n  { href: "/accessibility", label: "Accessibility" },',
    "shell accessibility navigation",
)

replace_once(
    "apps/game/app/(shell)/play.tsx",
    'import { BoundaryNotice } from "../../src/components/BoundaryNotice";',
    'import { ActionLink } from "../../src/components/ActionLink";\nimport { BoundaryNotice } from "../../src/components/BoundaryNotice";',
    "play account link import",
)
replace_once(
    "apps/game/app/(shell)/play.tsx",
    '      <SceneRenderer initialSceneId={requestedScene} />',
    '      <SceneRenderer initialSceneId={requestedScene} />\n      <ActionLink\n        href="/account"\n        label="Review the future account boundary"\n        description="Informational only: no provider, account, session, or state transfer is active."\n        variant="quiet"\n      />',
    "play post-prologue account link",
)

replace_once(
    "apps/game/scripts/shell-contract.mjs",
    '  { route: "/map", file: "app/(shell)/map.tsx", purpose: "island map" },',
    '  { route: "/map", file: "app/(shell)/map.tsx", purpose: "island map" },\n  {\n    route: "/accessibility",\n    file: "app/(shell)/accessibility.tsx",\n    purpose: "accessibility and platform parity",\n  },\n  {\n    route: "/account",\n    file: "app/(shell)/account.tsx",\n    purpose: "post-prologue informational account boundary",\n  },',
    "shell new routes",
)

replace_once(
    "apps/game/scripts/validate-shell.mjs",
    'for (const route of ["/map", "/hearth", "/direct"]) {',
    'for (const route of ["/map", "/hearth", "/direct", "/accessibility"]) {',
    "shell navigation validator",
)
replace_once(
    "apps/game/scripts/validate-shell.mjs",
    'assert.match(direct, /DIRECT INFORMATION PATH/);',
    'assert.match(direct, /DIRECT INFORMATION PATH/);\n\nconst play = read(join(gameRoot, "app/(shell)/play.tsx"));\nassert.match(play, /href="\\/account"/);\nconst account = read(join(gameRoot, "app/(shell)/account.tsx"));\nassert.match(account, /POST-PROLOGUE ACCOUNT BOUNDARY/);\nconst accessibility = read(\n  join(gameRoot, "app/(shell)/accessibility.tsx"),\n);\nassert.match(accessibility, /ACCESSIBILITY AND PLATFORM PARITY/);',
    "shell new route validation",
)

package_path = GAME / "package.json"
package = json.loads(package_path.read_text())
lint_parts = package["scripts"]["lint"].split(" && ")
for command in [
    "node scripts/validate-authentication-boundary.mjs",
    "node scripts/validate-accessibility-parity.mjs",
]:
    if command not in lint_parts:
        lint_parts.append(command)
package["scripts"]["lint"] = " && ".join(lint_parts)
package["scripts"]["validate:authentication-boundary"] = (
    "node scripts/validate-authentication-boundary.mjs"
)
package["scripts"]["validate:accessibility-parity"] = (
    "node scripts/validate-accessibility-parity.mjs"
)
package_path.write_text(json.dumps(package, indent=2) + "\n")

readme = (GAME / "README.md").read_text()
readme = readme.replace(
    "- **10.6:** bundled public-content fallback plus versioned, expiring, clearable, migratable temporary PUBLIC_SYNTHETIC storage with corruption, conflict, quota, and adapter-failure handling.\n",
    "- **10.6:** bundled public-content fallback plus versioned, expiring, clearable, migratable temporary PUBLIC_SYNTHETIC storage with corruption, conflict, quota, and adapter-failure handling.\n"
    "- **10.7:** informational authentication-after-prologue boundary with no provider, no silent transfer, and discard-by-default temporary state.\n"
    "- **10.8:** executable browser/iOS/Android accessibility matrix, contrast, reflow, modality alternatives, direct-path parity, and residual limitations.\n",
)
readme = readme.replace(
    "Authentication, accessibility certification, release, and production-authority work remain assigned to later Sprint 10 workstreams.",
    "Production authentication, independent accessibility certification, release, and production-authority work remain separately gated. Sprint 10.7 implements only the informational account boundary, and Sprint 10.8 implements maintainer source and CI parity evidence.",
)
readme = readme.replace(
    "| `/map`         | island map and availability orientation                   |",
    "| `/map`         | island map and availability orientation                   |\n"
    "| `/accessibility` | modality and platform-parity evidence                    |\n"
    "| `/account`     | post-prologue informational account boundary               |",
)
readme = readme.replace(
    "pnpm --filter @calypsos-promise/game validate:offline-resilience\n",
    "pnpm --filter @calypsos-promise/game validate:offline-resilience\n"
    "pnpm --filter @calypsos-promise/game validate:authentication-boundary\n"
    "pnpm --filter @calypsos-promise/game validate:accessibility-parity\n",
)
readme = readme.replace(
    "Run `validate:toolchain`, `validate:shell`, `validate:presentation`, `validate:state-authority`, and `validate:offline-resilience` to enforce these boundaries.",
    "Run `validate:toolchain`, `validate:shell`, `validate:presentation`, `validate:state-authority`, `validate:offline-resilience`, `validate:authentication-boundary`, and `validate:accessibility-parity` to enforce these boundaries.",
)
(GAME / "README.md").write_text(readme)
