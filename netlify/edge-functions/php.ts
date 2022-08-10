import { PhpWorker } from "https://esm.sh/v90/php-wasm@0.0.5/PhpWorker.js";
import { code } from "../../bootstrap.ts";
export default async function handler(request: Request) {
  try {
    (globalThis as any).location = { href: request.url };
    const { pathname } = new URL(request.url);
    if (pathname === "/favicon.ico") {
      return;
    }
    const buff: string[] = [];
    const php = await new PhpWorker({
      print: (...args: string[]) => buff.push(...args),
      printErr: (...args: string[]) => console.warn("warn", ...args),
      locateFile: () => "https://unpkg.com/php-wasm@0.0.5/php-worker.wasm",
    });
    return new Promise((resolve) => {
      php.addEventListener("ready", async () => {
        await php.run(code(pathname, request.method));
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
