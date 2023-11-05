# 🏎️ usePHP 💨

A React hook for running PHP? Why not?

It runs in a Netlify Edge Function and uses [php-wasm](https://github.com/seanmorris/php-wasm) to execute the PHP. It runs asynchronously, so you need a renderer that supports async components.

**[View the demo](https://php-edge.netlify.app/)**

### Usage

```tsx filename=netlify/edge-functions/php.tsx
/** @jsx h */
import { h, renderToString } from "https://deno.land/x/jsx/mod.ts";
import { usePHP } from "https://deno.land/x/use_php/mod.ts";

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
              <?php phpinfo(); ?>
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
```

## API

### `usePHP(request: Request, renderer?: JSXRenderer)`

Pass in the request object and an optional JSX renderer and it will return a JSX element. If you omit the renderer it will return an HTML string instead.

Try it yourself:

[![deploy to netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ascorbic/php-edge)

## FAQ

- **Why?**
  - Why not? That Lambo won't buy itself.
- **How can I deploy this to production?**
  - 🤦🏻‍♂️ 

### LICENCE

MIT Licence. © 2023 [Matt Kane](https://github.com/ascorbic)
