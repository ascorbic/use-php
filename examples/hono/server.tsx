/** @jsx h */
import { Context, Hono } from "https://deno.land/x/hono/mod.ts";
import { usePHP } from "https://deno.land/x/use_php/mod.ts";
import { h, renderToString } from "https://deno.land/x/jsx/mod.ts";

const app: Hono = new Hono();

app.get("/", async (c: Context) => {
  const request: Request = c.req.raw;

  const php = await usePHP(request, h);
  return c.html(
    await renderToString(
      <html>
        <head>
          <title>Use PHP</title>
        </head>
        <body>
          {await php`
              <?php phpinfo(); ?>
          `}
        </body>
      </html>
    )
  );
});

Deno.serve(app.fetch);
