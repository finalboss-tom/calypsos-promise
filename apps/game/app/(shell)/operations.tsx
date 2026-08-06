import { BuildReleaseOperationsPanel } from "../../src/components/BuildReleaseOperationsPanel";
import { BoundaryNotice } from "../../src/components/BoundaryNotice";
import { ShellPage } from "../../src/components/ShellPage";

export default function OperationsScreen() {
  return (
    <ShellPage
      eyebrow="BUILD AND OPERATIONS EVIDENCE"
      title="Inspect what can be built—and what is still not released."
      intro="Sprint 10.9 records exact unsigned build provenance, release gates, provider replacement, incident scope, rollback, and cleanup without deploying the game or selecting signing, store, update, or monitoring providers."
      aside={
        <BoundaryNotice>
          Passing CI or exporting browser, iOS, and Android bundles does not
          authorize preview hosting, production, signing, store submission,
          public beta, official release, accounts, private data, or Longitudinal
          Intelligence.
        </BoundaryNotice>
      }
    >
      <BuildReleaseOperationsPanel />
    </ShellPage>
  );
}
