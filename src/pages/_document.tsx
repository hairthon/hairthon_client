import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hairthon.vercel.app" />
        <meta property="og:title" content="SELECT MY HAIR" />
        <meta property="og:image" content="/og.svg" />
        <meta
          property="og:description"
          content="이젠 더이상 머리 스타일로 고민하지 마세요! 나에게 어울리는 머리 스타일을 합성해보세요!"
        />
        <meta property="og:site_name" content="SELECT MY HAIR" />
        <meta property="og:locale" content="ko_KO" />
        {/* <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> */}
        <link rel="icon" href="/favicon.svg" type="image/png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
