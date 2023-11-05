import { PhpWorker } from "https://cdn.jsdelivr.net/npm/php-wasm@0.0.0-esm-preview-45/PhpWorker.mjs";
import { bootstrapCode } from "./bootstrap.ts";

type JSXRenderer = (tag: string, props: Record<string, unknown>) => JSX.Element;

/**
 * Creates a "php" tag that can be used to run php code in a template literal.
 * @param request The incoming request
 * @returns {string}
 */
export async function usePHP(
  request: Request
): Promise<(code: TemplateStringsArray) => Promise<string>>;
/**
 * Creates a "php" tag that can be used to run php code in a template literal.
 * @param request The incoming request
 * @param jsxRenderer A jsx renderer to use to render the output
 * @returns {JSX.Element}
 */
export async function usePHP(
  request: Request,
  jsxRenderer: JSXRenderer
): Promise<(code: TemplateStringsArray) => Promise<JSX.Element>>;
export async function usePHP(
  request: Request,
  jsxRenderer?: JSXRenderer
): Promise<(code: TemplateStringsArray) => Promise<JSX.Element | string>> {
  //  emscripten expects workers to have window.location available
  globalThis.location ||= { href: request.url } as Location;

  const url = new URL(request.url);

  const buff: string[] = [];

  const php = await new PhpWorker();

  php.addEventListener("output", (e) => {
    buff.push((e as CustomEvent).detail);
  });

  php.addEventListener("error", (event) => {
    (event as CustomEvent<string[]>).detail.forEach((error) => {
      error = error.trim();
      if (error) {
        console.error(error);
      }
    });
  });

  await new Promise<void>((resolve) => {
    php.addEventListener("ready", () => resolve());
  });

  await php.run(
    bootstrapCode(
      url.pathname,
      request.method,
      JSON.stringify(url.searchParams)
    )
  );

  return async (source: TemplateStringsArray) => {
    const code = source.raw.join("");
    await php.run(code);
    const res = buff.join("\n");
    buff.length = 0;
    return jsxRenderer
      ? jsxRenderer("div", { dangerouslySetInnerHTML: { __html: res } })
      : res;
  };
}
