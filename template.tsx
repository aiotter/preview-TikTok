/** @jsx Nano.h */
/** @jsxFrag Nano.Fragment */
/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import * as Nano from "https://deno.land/x/nano_jsx@v0.0.26/mod.ts";

type HeadProps = {
  url: string;
  title: string;
  description: string;
  image: string;
  redirect: string;
};

const Head = (props: HeadProps) => (
  <head>
    <meta charSet="utf-8" />
    <link
      rel="icon"
      href="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web-common-sg/mtact/static/images/logo_144c91a.png"
    />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta property="og:url" content={props.url} />
    <meta property="og:image" content={props.image} />
    <meta property="og:site-name" content="TikTok" />

    <meta name="twitter:card" content="player" />
    <meta name="twitter:site" content="@tiktok_us" />
    <meta name="twitter:title" content={props.title} />
    <script>
      window.location.href = "{props.redirect}";
    </script>
  </head>
);

export async function createHtml(url: string, redirect: string) {
  const response = await fetch(url);
  const data = await response.json();

  const head = Nano.renderSSR(() => (
    <Head
      url={url}
      title={data.author_name}
      description={data.title}
      image={data.thumbnail_url}
      redirect={redirect}
    />
  ));

  return `<html>${head}</html>`;
}
