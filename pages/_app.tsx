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
    <SessionProvider session={pageProps.session}>
      <Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-E65RTQKQZB"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E65RTQKQZB');`}
        </Script>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;
