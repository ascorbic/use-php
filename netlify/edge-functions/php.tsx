/** @jsx h */
/** @jsxFrag Fragment */
import { h, renderToString } from "https://deno.land/x/jsx/mod.ts";
import { usePHP } from "../../lib/usephp.tsx";

export default async function handler(request: Request) {
  const php = await usePHP(request, h);
  return new Response(
    await renderToString(
      <html>
        <head>
          <title>Use PHP</title>
        </head>
        <body>
          {await php`
            Hello
            <?php
              echo 1;
              print("<h1>hello</h1>");
            ?>
            <div>
              <?php phpinfo(); ?>
            </div>
          `}
        </body>
      </html>
    ),
    {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    }
  );
}

export const config = {
  path: "/*",
  excluded_paths: "/public/*",
};
