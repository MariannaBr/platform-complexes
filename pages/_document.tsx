import { metaTitle, metaDescription } from "../lib/defaults";
import Document, { Html, Main, Head, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content={metaDescription} />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta
            property="og:image"
            content="https://storage.googleapis.com/communitiesplatform-pictures/Winsdor/windsor_overview.webp"
          />
          <meta
            property="og:url"
            content="https://www.dogpatchapartments.com/"
          />
          <meta property="og:type" content="website" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
