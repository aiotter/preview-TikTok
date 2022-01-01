/** @jsx Nano.h */
/** @jsxFrag Nano.Fragment */
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import * as Nano from "https://deno.land/x/nano_jsx@v0.0.26/mod.ts";

type HeadProps = {
  originalUrl: string;
  title: string;
  description: string;
  image: string;
  redirectUrl: string;
  children?: unknown;
};

const Html: Nano.FC<HeadProps> = (props) => (
  <html prefix="og: https://ogp.me/ns#">
    <head>
      <meta charset="utf-8" />
      <link
        rel="icon"
        href="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-common-sg/mtact/static/images/logo_144c91a.png"
      />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={props.originalUrl} />
      <meta property="og:image" content={props.image} />
      <meta property="og:site-name" content="TikTok" />

      <meta name="twitter:card" content="player" />
      <meta name="twitter:site" content="@tiktok_us" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:player" content={'/player?url=' + props.originalUrl} />
      <script>
        window.location = "{props.originalUrl}";
      </script>
    </head>
    {props.children}
  </html>
);

export async function createHtml(originalUrl: string) {
  const oembedUrl = "https://www.tiktok.com/oembed?url=" + originalUrl;
  const response = await fetch(oembedUrl);
  const data = await response.json();

  return Nano.renderSSR(() => (
    <Html
      originalUrl={originalUrl}
      title={data.author_name}
      description={data.title}
      image={data.thumbnail_url}
      redirectUrl={originalUrl}
    />
  ));
}
