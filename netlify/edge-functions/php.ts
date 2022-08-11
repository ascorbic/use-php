import { PhpWorker } from "../../vendor/php-wasm/PhpWorker.js";
import wasmData from "../../vendor/php-wasm/php-worker.wasm.js";
import { bootstrapCode } from "../../bootstrap.ts";
export default async function handler(request: Request) {
  try {
    globalThis.location = { href: request.url } as Location;
    const { pathname } = new URL(request.url);
    if (pathname === "/favicon.ico") {
      return;
    }
    const buff: string[] = [];
    const php = await new PhpWorker({
      print: (...args: string[]) => buff.push(...args),
      printErr: (...args: string[]) => console.warn("warn", ...args),
      locateFile: () => wasmData,
    });
    return new Promise((resolve) => {
      php.addEventListener("ready", async () => {
        await php.run(bootstrapCode(pathname, request.method));
        await php.run(`<?php phpinfo();`);
        resolve(
          new Response(buff.join("\n"), {
            headers: {
              "Content-Type": "text/html",
            },
          }),
        );
      });
    });
  } catch (e) {
    return new Response(e.message, {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
