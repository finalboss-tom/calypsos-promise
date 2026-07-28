import { ForgeStdioServer } from "./stdio.js";

const server = new ForgeStdioServer();
let shuttingDown = false;

async function shutdown(signal: string): Promise<void> {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  process.stderr.write(`forge.transport.shutdown:${signal}\n`);
  await server.close();
  process.exit(0);
}

process.once("SIGINT", () => {
  void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});

server.serve(process.stdin, process.stdout, process.stderr).catch(() => {
  process.stderr.write("forge.transport.fatal\n");
  process.exitCode = 1;
});
