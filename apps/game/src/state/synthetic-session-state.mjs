export const SYNTHETIC_SESSION_STATE_VERSION = "0.1.0";

export const SYNTHETIC_SESSION_STATUSES = Object.freeze([
  "pending",
  "presented",
  "failed",
  "stale",
  "corrected",
  "superseded",
  "conflict",
  "deferred",
  "refused",
  "discarded",
]);

export const CLIENT_AUTHORITY_CLAIMS = Object.freeze([
  "scene-completion",
  "quest-completion",
  "reward",
  "restoration",
  "unlock",
  "permission",
  "chronicle-truth",
  "personal-progress",
  "health-result",
  "authentic-preference",
  "longitudinal-intelligence",
]);

export const CLIENT_AUTHORITY_CEILING = Object.freeze({
  authoritative: false,
  sceneCompletion: false,
  questCompletion: false,
  rewards: false,
  restoration: false,
  unlocks: false,
  permission: false,
  chronicleTruth: false,
  personalProgress: false,
  healthResults: false,
  authenticPreference: false,
  longitudinalIntelligence: false,
});

const QUEST_LABELS = Object.freeze({
  pending: "Presentation pending",
  presented: "Scene displayed in this temporary session",
  failed: "Presentation failed without completion",
  stale: "Presentation evidence is stale",
  corrected: "Presentation evidence was corrected",
  superseded: "Presentation evidence was superseded",
  conflict: "Presentation evidence is in conflict",
  deferred: "Presentation deferred",
  refused: "Presentation refused",
  discarded: "Presentation discarded",
});

function freezeList(values) {
  return Object.freeze([...values]);
}

function nextState(state, patch) {
  return Object.freeze({
    ...state,
    ...patch,
    revision: state.revision + 1,
    authority: CLIENT_AUTHORITY_CEILING,
  });
}

export function createSyntheticSessionState(sceneId) {
  return Object.freeze({
    version: SYNTHETIC_SESSION_STATE_VERSION,
    revision: 0,
    status: "pending",
    sceneId,
    presentedSceneIds: freezeList([]),
    notice:
      "Synthetic presentation is pending. No completion, reward, permission, or personal progress exists.",
    authority: CLIENT_AUTHORITY_CEILING,
  });
}

export function createPresentedSyntheticSessionState(sceneId) {
  return transitionSyntheticSession(createSyntheticSessionState(sceneId), {
    type: "scene-presented",
    sceneId,
    notice: "Synthetic presentation ready. Nothing authoritative was recorded.",
  });
}

export function transitionSyntheticSession(state, event) {
  switch (event.type) {
    case "scene-requested":
      return nextState(state, {
        status: "pending",
        sceneId: event.sceneId,
        notice:
          event.notice ??
          "A bundled synthetic scene was requested. The client has not created completion or progress.",
        failureReason: undefined,
        conflictReason: undefined,
        supersededBySceneId: undefined,
        correctedFromRevision: undefined,
      });
    case "scene-presented": {
      const presentedSceneIds = state.presentedSceneIds.includes(event.sceneId)
        ? state.presentedSceneIds
        : freezeList([...state.presentedSceneIds, event.sceneId]);
      return nextState(state, {
        status: "presented",
        sceneId: event.sceneId,
        presentedSceneIds,
        notice:
          event.notice ??
          "The bundled scene was displayed as temporary presentation evidence only.",
        failureReason: undefined,
        conflictReason: undefined,
        supersededBySceneId: undefined,
        correctedFromRevision: undefined,
      });
    }
    case "failed":
      return nextState(state, {
        status: "failed",
        notice:
          event.notice ??
          "Presentation failed closed. No completion, reward, or personal state was created.",
        failureReason: event.reason,
      });
    case "stale":
      return nextState(state, {
        status: "stale",
        notice:
          event.notice ??
          "This presentation evidence is stale and cannot support completion or authority.",
      });
    case "corrected":
      return nextState(state, {
        status: "corrected",
        sceneId: event.sceneId ?? state.sceneId,
        notice:
          event.notice ??
          "The temporary presentation evidence was corrected. The correction remains non-authoritative.",
        correctedFromRevision: state.revision,
        failureReason: undefined,
        conflictReason: undefined,
        supersededBySceneId: undefined,
      });
    case "superseded":
      return nextState(state, {
        status: "superseded",
        notice:
          event.notice ??
          "This presentation evidence was superseded and cannot create progress or completion.",
        supersededBySceneId: event.replacementSceneId,
      });
    case "conflict":
      return nextState(state, {
        status: "conflict",
        notice:
          event.notice ??
          "Conflicting presentation evidence was detected. The client failed closed.",
        conflictReason: event.reason,
      });
    case "deferred":
      return nextState(state, {
        status: "deferred",
        notice:
          event.notice ??
          "The synthetic presentation was deferred without penalty or inferred preference.",
      });
    case "refused":
      return nextState(state, {
        status: "refused",
        notice:
          event.notice ??
          "The synthetic presentation was refused. Essential information remains available.",
      });
    case "discarded":
      return nextState(state, {
        status: "discarded",
        presentedSceneIds: freezeList([]),
        notice:
          event.notice ??
          "Temporary presentation state was discarded. No personal state remains.",
      });
    case "restart":
      return Object.freeze({
        ...createPresentedSyntheticSessionState(event.sceneId),
        revision: state.revision + 1,
        notice:
          event.notice ??
          "The temporary synthetic session restarted from bundled content. No history was retained.",
      });
    case "offline-restored": {
      const restored = event.state;
      if (
        restored?.version !== SYNTHETIC_SESSION_STATE_VERSION ||
        !SYNTHETIC_SESSION_STATUSES.includes(restored.status) ||
        typeof restored.sceneId !== "string" ||
        !Array.isArray(restored.presentedSceneIds) ||
        restored.presentedSceneIds.some((id) => typeof id !== "string")
      ) {
        return nextState(state, {
          status: "failed",
          notice:
            "Stored synthetic session state was invalid and failed closed. No completion, reward, permission, or progress was created.",
          failureReason: "invalid-offline-state",
        });
      }

      return Object.freeze({
        ...createSyntheticSessionState(restored.sceneId),
        revision: state.revision + 1,
        status: restored.status,
        sceneId: restored.sceneId,
        presentedSceneIds: freezeList(restored.presentedSceneIds.slice(0, 32)),
        notice:
          event.notice ??
          "Stored public/synthetic session state was restored explicitly. No authority transferred.",
        authority: CLIENT_AUTHORITY_CEILING,
      });
    }
    default:
      return nextState(state, {
        status: "failed",
        notice:
          "An unknown client-state event failed closed. No completion, reward, permission, or progress was created.",
        failureReason: "unknown-event",
      });
  }
}

export function denyClientAuthority(claim) {
  const known = CLIENT_AUTHORITY_CLAIMS.includes(claim);
  return Object.freeze({
    claim,
    known,
    allowed: false,
    authoritative: false,
    reason: known
      ? "Sprint 10 client state is presentation evidence only and cannot grant this authority."
      : "Unknown authority claims fail closed.",
  });
}

export function canInteractWithSyntheticSession(state) {
  return state.status === "presented" || state.status === "corrected";
}

export function isTerminalSyntheticSession(state) {
  return ["deferred", "refused", "discarded"].includes(state.status);
}

export function getQuestPresentationEvidence(state) {
  return Object.freeze({
    sessionStatus: state.status,
    label: QUEST_LABELS[state.status] ?? "Unknown presentation state",
    authoritative: false,
    completed: false,
    rewarded: false,
    restored: false,
    unlocked: false,
    personalProgress: false,
  });
}
