import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

// These styles apply to every route in the application
import "./globals.css";
import "../lib/mapStyle.css";
import "../lib/emblaStyle.css";
import "../lib/customCSS.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // <SessionProvider session={pageProps.session}>
    <>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dogpatch Apartment Communities</title>
        <meta
          name="description"
          content="Find your favorite apartment communities in Dogpatch, San Francisco. 
          Complete list of all apartment communities with all information you need for finding the most suitable apartment for rent."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Dogpatch Apartment Communities" />
        <meta
          property="og:description"
          content="Find your favorite apartment communities in Dogpatch, San Francisco. 
          Complete list of all apartment communities with all information you need for finding the most suitable apartment for rent."
        />
        <meta
          property="og:image"
          content="https://storage.googleapis.com/communitiesplatform-pictures/Winsdor/windsor_overview.webp"
        />
        <meta property="og:url" content="https://www.dogpatchapartments.com/" />
        <meta property="og:type" content="website" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E65RTQKQZB"
      />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E65RTQKQZB');`}
      </Script>
      <Component {...pageProps} />
    </>
    // </SessionProvider>
  );
};

export default App;
