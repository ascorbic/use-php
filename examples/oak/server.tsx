/** @jsx h */
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { usePHP } from "https://deno.land/x/use_php/mod.ts";
import { h, renderToString } from "https://deno.land/x/jsx/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", async (ctx) => {
  const request = ctx.request as unknown as Request;

  const php = await usePHP(request, h);

  const body = await renderToString(
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
  );

  ctx.response.body = body;
  ctx.response.type = "text/html";
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
