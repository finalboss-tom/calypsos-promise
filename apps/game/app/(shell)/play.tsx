import { useLocalSearchParams } from "expo-router";

import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { SceneRenderer } from "../../src/components/SceneRenderer";
import { ShellPage } from "../../src/components/ShellPage";
import { WELCOME_SCENE_ID } from "../../src/presentation/synthetic-presentation";

export default function PlayPresentationScreen() {
  const params = useLocalSearchParams<{ scene?: string | string[] }>();
  const requestedScene =
    typeof params.scene === "string" ? params.scene : WELCOME_SCENE_ID;

  return (
    <ShellPage
      eyebrow="STATE AND AUTHORITY BOUNDARIES"
      title="A deterministic synthetic session where every client-authority claim fails closed."
      intro="The renderer exposes pending, failed, stale, corrected, superseded, conflict, deferred, refused, and discarded states without treating any of them as completion or personal truth."
      tone="dark"
      aside={
        <BoundaryNotice tone="dark">
          Scene presentation, dialogue choices, quest cards, the Wayfinder Orb,
          and local session state are non-authoritative. They cannot create
          Chronicle truth, permission, durable completion, rewards, authentic
          preferences, health results, or progress with authority.
        </BoundaryNotice>
      }
    >
      <SceneRenderer initialSceneId={requestedScene} />
    </ShellPage>
  );
}
