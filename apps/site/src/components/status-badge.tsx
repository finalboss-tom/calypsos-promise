import {
  capabilityStatusDefinitions,
  type CapabilityStatus,
} from "@/lib/capability-status";

export function StatusBadge({ status }: { status: CapabilityStatus }) {
  const definition = capabilityStatusDefinitions[status];

  return (
    <span
      className={`status status-${status}`}
      title={definition.explanation}
      data-status={status}
    >
      {definition.label}
    </span>
  );
}
