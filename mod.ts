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
