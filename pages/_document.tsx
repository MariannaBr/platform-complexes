import { metaTitleHome, metaDescriptionHome } from "../lib/defaults";
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
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content={metaTitleHome} />
          <meta property="og:description" content={metaDescriptionHome} />
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
