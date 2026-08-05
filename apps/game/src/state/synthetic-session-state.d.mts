export type SyntheticSessionStatus =
  | "pending"
  | "presented"
  | "failed"
  | "stale"
  | "corrected"
  | "superseded"
  | "conflict"
  | "deferred"
  | "refused"
  | "discarded";

export type ClientAuthorityClaim =
  | "scene-completion"
  | "quest-completion"
  | "reward"
  | "restoration"
  | "unlock"
  | "permission"
  | "chronicle-truth"
  | "personal-progress"
  | "health-result"
  | "authentic-preference"
  | "longitudinal-intelligence";

export interface ClientAuthorityCeiling {
  readonly authoritative: false;
  readonly sceneCompletion: false;
  readonly questCompletion: false;
  readonly rewards: false;
  readonly restoration: false;
  readonly unlocks: false;
  readonly permission: false;
  readonly chronicleTruth: false;
  readonly personalProgress: false;
  readonly healthResults: false;
  readonly authenticPreference: false;
  readonly longitudinalIntelligence: false;
}

export interface SyntheticSessionState {
  readonly version: "0.1.0";
  readonly revision: number;
  readonly status: SyntheticSessionStatus;
  readonly sceneId: string;
  readonly presentedSceneIds: readonly string[];
  readonly notice: string;
  readonly authority: ClientAuthorityCeiling;
  readonly failureReason?: string;
  readonly conflictReason?: string;
  readonly supersededBySceneId?: string;
  readonly correctedFromRevision?: number;
}

export type SyntheticSessionEvent =
  | { type: "scene-requested"; sceneId: string; notice?: string }
  | { type: "scene-presented"; sceneId: string; notice?: string }
  | { type: "failed"; reason: string; notice?: string }
  | { type: "stale"; notice?: string }
  | { type: "corrected"; sceneId?: string; notice?: string }
  | {
      type: "superseded";
      replacementSceneId: string;
      notice?: string;
    }
  | { type: "conflict"; reason: string; notice?: string }
  | { type: "deferred"; notice?: string }
  | { type: "refused"; notice?: string }
  | { type: "discarded"; notice?: string }
  | { type: "restart"; sceneId: string; notice?: string }
  | {
      type: "offline-restored";
      state: SyntheticSessionState;
      notice?: string;
    };

export const SYNTHETIC_SESSION_STATE_VERSION: "0.1.0";
export const SYNTHETIC_SESSION_STATUSES: readonly SyntheticSessionStatus[];
export const CLIENT_AUTHORITY_CLAIMS: readonly ClientAuthorityClaim[];
export const CLIENT_AUTHORITY_CEILING: ClientAuthorityCeiling;

export function createSyntheticSessionState(
  sceneId: string,
): SyntheticSessionState;
export function createPresentedSyntheticSessionState(
  sceneId: string,
): SyntheticSessionState;
export function transitionSyntheticSession(
  state: SyntheticSessionState,
  event: SyntheticSessionEvent,
): SyntheticSessionState;
export function denyClientAuthority(claim: string): {
  readonly claim: string;
  readonly known: boolean;
  readonly allowed: false;
  readonly authoritative: false;
  readonly reason: string;
};
export function canInteractWithSyntheticSession(
  state: SyntheticSessionState,
): boolean;
export function isTerminalSyntheticSession(
  state: SyntheticSessionState,
): boolean;
export function getQuestPresentationEvidence(state: SyntheticSessionState): {
  readonly sessionStatus: SyntheticSessionStatus;
  readonly label: string;
  readonly authoritative: false;
  readonly completed: false;
  readonly rewarded: false;
  readonly restored: false;
  readonly unlocked: false;
  readonly personalProgress: false;
};
