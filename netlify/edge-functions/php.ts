import { PhpWorker } from "../../vendor/php-wasm/PhpWorker.js";
import wasmData from "../../vendor/php-wasm/php-worker.wasm.js";
import { bootstrapCode } from "../../bootstrap.ts";
export default async function handler(request: Request) {
  try {
    //  emscripten expects workers to have window.location available
    globalThis.location = { href: request.url } as Location;
    const { pathname } = new URL(request.url);

    // an example of serving static content
    if (pathname === "/favicon.ico") {
      return;
    }
    const buff: string[] = [];
    const headers = new Headers();
    const php = await new PhpWorker({
      // we could use a stream instead here
      print: (...args: string[]) => buff.push(...args),
      printErr: (...args: string[]) => console.warn("warn", ...args),
      // wasmData here is a data uri. We could also use a regular url to a .wasm file
      locateFile: () => wasmData,
    });
    return new Promise((resolve) => {
      php.addEventListener("ready", async () => {
        // This runs some PHP bootstrap code to set up the environment
        // We could do more here, e.g. pass in the request body etc. See bootstrap.ts for an example
        await php.run(bootstrapCode(pathname, request.method));
        // This is the actual code that we want to run. We could fetch this from a file, but for simplicity we just pass it in directly
        await php.run(`<?php phpinfo();`);
        resolve(
          new Response(buff.join("\n"), {
            // to use the PHP headers, we can look in the error handler for JSON objects with headers
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
