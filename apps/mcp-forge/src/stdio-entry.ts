import { ForgeLoreSchemaToolService } from "./lore-schema-tools.js";
import { ForgeSourceRepository } from "./source-repository.js";
import { ForgeStdioServer } from "./stdio.js";

let server: ForgeStdioServer | undefined;
let shuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  process.stderr.write(`forge.transport.shutdown:${signal}\n`);
  await server?.close();
  process.exit(0);
}

process.once("SIGINT", () => {
  void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});

async function main(): Promise<void> {
  const repository = await ForgeSourceRepository.fromProcessWorkingDirectory();
  server = new ForgeStdioServer({
    toolService: new ForgeLoreSchemaToolService(repository),
  });
  await server.serve(process.stdin, process.stdout, process.stderr);
}

main().catch(() => {
  process.stderr.write("forge.transport.startup-failed\n");
  process.exitCode = 1;
});
