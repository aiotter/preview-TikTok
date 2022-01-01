/** @jsx Nano.h */
/** @jsxFrag Nano.Fragment */
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import * as Nano from "https://deno.land/x/nano_jsx@v0.0.26/mod.ts";

export default async function (req: Request) {
  const requestUrl = new URL(req.url);
  const originalUrl = requestUrl.searchParams.get("url");

  if (!originalUrl) return new Response(null, { status: 404 });

  const oembedUrl = "https://www.tiktok.com/oembed?url=" + originalUrl;
  const oembedResponse = await fetch(oembedUrl);
  const oembedData = await oembedResponse.json();

  const html = Nano.renderSSR(() => (
    <html prefix="og: https://ogp.me/ns#">
      <head>
        <meta charset="utf-8" />
        <link
          rel="icon"
          href="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-common-sg/mtact/static/images/logo_144c91a.png"
        />
        <meta property="og:title" content={oembedData.title} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:description" content={oembedData.title} />
        <meta property="og:url" content={originalUrl} />
        <meta property="og:image" content={oembedData.thumbnail_url} />
        <meta property="og:site_name" content="TikTok" />

        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@tiktok_us" />
        <meta name="twitter:title" content={oembedData.author_name} />
        <meta
          name="twitter:player"
          content={requestUrl.origin + "/player?url=" + originalUrl}
        />
        <meta name="twitter:player:width" content="420" />
        <meta name="twitter:player:height" content="900" />
        <meta name="twitter:image" content={oembedData.thumbnail_url} />
        <meta http-equiv="Refresh" content={`0; url='${originalUrl}'`} />
      </head>
    </html>
  ));
  return new Response("<!DOCTYPE html>" + html, {
    headers: new Headers({ "Content-Type": "text/html" }),
  });
}
