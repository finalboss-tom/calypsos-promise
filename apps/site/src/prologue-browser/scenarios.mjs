export const shortest = Object.freeze([
  ["Skip directly to Lantern Shore", "lantern-shore"],
  ["Choose how to continue", "guide-choice"],
  ["Continue without Aster", "manual-introduction"],
  ["Continue to the synthetic demonstration", "capture-choice"],
  ["Use the synthetic text example", "synthetic-draft"],
  ["Review and correct the draft", "review-and-correction"],
  [
    "Accept the synthetic value as written",
    "review-and-correction",
    "synthetic value will remain",
  ],
  ["Confirm this synthetic demonstration", "confirmed-entry"],
  ["View the temporary synthetic Chronicle", "synthetic-chronicle"],
  ["Continue to the receipt explanation", "synthetic-receipt"],
  ["Light the First Lantern from this evidence", "first-lantern"],
  ["Continue to departure choices", "exit-choice"],
  ["Complete without an account", "complete"],
]);

export const representative = Object.freeze([
  ["Begin the opening", "lantern-shore"],
  ["Choose how to continue", "guide-choice"],
  ["Continue with Aster", "aster-introduction"],
  ["Continue to the synthetic demonstration", "capture-choice"],
  ["Use the synthetic voice transcript", "synthetic-draft"],
  ["Review and correct the draft", "review-and-correction"],
  [
    "Correct the synthetic walk to fifteen minutes",
    "review-and-correction",
    "prepared synthetic correction",
  ],
  ["Confirm this synthetic demonstration", "confirmed-entry"],
  ["View the temporary synthetic Chronicle", "synthetic-chronicle"],
  ["Continue to the receipt explanation", "synthetic-receipt"],
  ["Light the First Lantern from this evidence", "first-lantern"],
  ["Continue to departure choices", "exit-choice"],
  ["Inspect the future account boundary", "future-account"],
  ["Return to departure choices", "exit-choice"],
  ["Complete without an account", "complete"],
]);

export const longest = Object.freeze([
  ["Begin the opening", "lantern-shore"],
  ["Choose how to continue", "guide-choice"],
  ["Continue with Aster", "aster-introduction"],
  ["Switch to the direct guide", "manual-introduction"],
  ["Switch to Aster framing", "aster-introduction"],
  ["Continue to the synthetic demonstration", "capture-choice"],
  ["Use the synthetic text example", "synthetic-draft"],
  ["Review and correct the draft", "review-and-correction"],
  [
    "Correct the synthetic duration to six hours",
    "review-and-correction",
    "prepared synthetic correction",
  ],
  ["Confirm this synthetic demonstration", "confirmed-entry"],
  ["View the temporary synthetic Chronicle", "synthetic-chronicle"],
  ["Inspect the mapped Chronicle vocabulary", "synthetic-chronicle"],
  ["Continue to the receipt explanation", "synthetic-receipt"],
  ["Inspect the receipt-shaped field mapping", "synthetic-receipt"],
  ["Return to the synthetic Chronicle view", "synthetic-chronicle"],
  ["Continue to the receipt explanation", "synthetic-receipt"],
  ["Light the First Lantern from this evidence", "first-lantern"],
  ["Review the receipt evidence again", "synthetic-receipt"],
  ["Light the First Lantern from this evidence", "first-lantern"],
  ["Continue to departure choices", "exit-choice"],
  ["Inspect the future account boundary", "future-account"],
  ["Return to departure choices", "exit-choice"],
  ["Complete without an account", "complete"],
]);

export const supplemental = Object.freeze([
  {
    id: "replay-arrival",
    setup: shortest.slice(0, 1),
    target: ["Replay the arrival", "arrival"],
  },
  {
    id: "return-to-lantern",
    setup: shortest.slice(0, 2),
    target: ["Return to Lantern Shore", "lantern-shore"],
  },
  {
    id: "reconsider-guide",
    setup: shortest.slice(0, 3),
    target: ["Reconsider the guide choice", "guide-choice"],
  },
  {
    id: "return-to-guide",
    setup: shortest.slice(0, 4),
    target: ["Return to the guide choice", "guide-choice"],
  },
  {
    id: "choose-another",
    setup: shortest.slice(0, 5),
    target: ["Choose another synthetic example", "capture-choice"],
  },
  {
    id: "refuse-draft",
    setup: shortest.slice(0, 5),
    target: ["Refuse this synthetic draft", "capture-choice"],
  },
  {
    id: "review-confirmed",
    setup: shortest.slice(0, 8),
    target: ["Review or correct the synthetic entry", "review-and-correction"],
  },
  {
    id: "discard-confirmed",
    setup: shortest.slice(0, 8),
    target: ["Discard the confirmed synthetic state", "capture-choice"],
  },
  {
    id: "discard-chronicle",
    setup: shortest.slice(0, 9),
    target: ["Discard the temporary projection", "capture-choice"],
  },
  {
    id: "discard-receipt",
    setup: shortest.slice(0, 10),
    target: ["Discard the temporary projection", "capture-choice"],
  },
  {
    id: "review-after-completion",
    setup: shortest.slice(0, 11),
    target: ["Review or correct the synthetic entry", "review-and-correction"],
  },
  {
    id: "discard-completion",
    setup: shortest.slice(0, 11),
    target: ["Discard the temporary completion state", "capture-choice"],
  },
  {
    id: "restart-future-account",
    setup: representative.slice(0, 13),
    target: ["Restart the prologue", "arrival"],
  },
]);
