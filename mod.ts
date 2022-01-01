import { createHtml } from "./template.tsx";
import { serve } from "https://deno.land/std@0.119.0/http/mod.ts";

// expect "/?url=https://tiktok.com/..."
serve(async (req: Request) => {
  const requestUrl = new URL(req.url);
  if (requestUrl.pathname === "/") {
    const originalUrl = requestUrl.searchParams.get("url");
    if (!originalUrl) return new Response(null, { status: 404 });
    const oembedUrl = "https://www.tiktok.com/oembed?url=" + originalUrl;
    return new Response(
      "<!DOCTYPE html>" + await createHtml(oembedUrl, originalUrl),
      {
        status: 200,
        headers: new Headers({ "content-type": "html" }),
      },
    );
  } else if (requestUrl.pathname === "/player") {
    const originalUrl = requestUrl.searchParams.get("url");
    if (!originalUrl) return new Response(null, { status: 404 });
    const oembedUrl = "https://www.tiktok.com/oembed?url=" + originalUrl;
    const response = await fetch(oembedUrl);
    const data = await response.json();
    return new Response(data.html);
  } else {
    return new Response(null, { status: 404 });
  }
});

// import { Application, Router, helpers } from "https://deno.land/x/oak@v10.1.0/mod.ts";
// const app = new Application();
// const router = new Router();
//
// router.get("/", async (ctx) => {
//   const url = helpers.getQuery(ctx).url;
//   ctx.response.type = "html";
//   ctx.response.body = await createHtml(url);
// });
//
// app.use(router.routes());
// app.use(router.allowedMethods());
// await app.listen({ port: 8000 });
