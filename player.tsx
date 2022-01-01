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
    <html>
      <body dangerouslySetInnerHTML={{ __html: oembedData.html }} />
    </html>
  ));
  return new Response("<!DOCTYPE html>" + html, {
    headers: new Headers({ "Content-Type": "text/html" }),
  });
}
