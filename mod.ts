import index from "./index.tsx";
import player from "./player.tsx";
import { serve } from "https://deno.land/std@0.119.0/http/mod.ts";

// expect "/?url=https://tiktok.com/..."
serve(async (req: Request) => {
  const requestUrl = new URL(req.url);
  if (requestUrl.pathname === "/") {
    return await index(req);
  } else if (requestUrl.pathname === "/player") {
    return await player(req);
  } else if (requestUrl.pathname === "/robots.txt") {
    return new Response(`User-agent: *\nDisallow:\n`);
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
