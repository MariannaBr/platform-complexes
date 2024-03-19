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
