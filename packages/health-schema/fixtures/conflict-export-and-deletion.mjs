import { addDeletionScenario } from "./deletion-lifecycle.mjs";
import { addDocumentConflictScenario } from "./document-conflict.mjs";
import { addDuplicateMergeScenario } from "./duplicate-merge.mjs";
import { addExportScenario } from "./export-lifecycle.mjs";

export * from "./conflict-export-deletion-ids.mjs";

export function addConflictExportAndDeletionScenarios(bundle) {
  addDocumentConflictScenario(bundle);
  addDuplicateMergeScenario(bundle);
  addExportScenario(bundle);
  addDeletionScenario(bundle);
  return bundle;
}
