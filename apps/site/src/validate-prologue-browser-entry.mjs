import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const reportPath = process.env.PROLOGUE_BROWSER_REPORT;

try {
  await import(`./validate-prologue-browser-runner.mjs?run=${Date.now()}`);
  if (process.exitCode) {
    throw new Error(
      `Prologue browser runner completed with exit code ${process.exitCode}`,
    );
  }
} catch (error) {
  if (reportPath) {
    const absolute = resolve(process.cwd(), reportPath);
    let partial = {};
    try {
      partial = JSON.parse(await readFile(absolute, "utf8"));
    } catch {
      // The failure may occur before the primary report is created.
    }
    await mkdir(dirname(absolute), { recursive: true });
    await writeFile(
      absolute,
      `${JSON.stringify(
        {
          ...partial,
          schema: partial.schema ?? "calypsos.prologue-browser-evidence.v1",
          evidenceClass:
            partial.evidenceClass ?? "isolated-local-rendered-browser",
          diagnosticFailure: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
  }
  console.error(error.stack ?? error);
  throw error;
}
