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
      eyebrow="SCENE, DIALOGUE, AND QUEST PRESENTATION"
      title="A deterministic synthetic scene, with authority kept outside the client."
      intro="This renderer consumes the versioned public package. Choices can change only the temporary presentation shown on this screen."
      tone="dark"
      aside={
        <BoundaryNotice tone="dark">
          Scene presentation, dialogue choices, quest cards, and the Wayfinder
          Orb are non-authoritative. They cannot create Chronicle truth,
          permission, durable completion, rewards, authentic preferences, or
          health results.
        </BoundaryNotice>
      }
    >
      <SceneRenderer initialSceneId={requestedScene} />
    </ShellPage>
  );
}
