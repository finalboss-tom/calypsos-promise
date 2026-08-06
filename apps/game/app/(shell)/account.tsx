import { useRouter } from "expo-router";
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
