export const PROJECT_NAME = "Calypso’s Promise" as const;

export type RepositoryDataClass = "public" | "synthetic";

export function assertContributorDataClass(
  value: string,
): asserts value is RepositoryDataClass {
  if (value !== "public" && value !== "synthetic") {
    throw new Error(
      "Contributor workflows may use only public or synthetic data.",
    );
  }
}
