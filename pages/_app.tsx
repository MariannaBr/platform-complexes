import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

// These styles apply to every route in the application
import "./globals.css";
import "../lib/mapStyle.css";
import "../lib/emblaStyle.css";
import "../lib/customCSS.css";
import "../lib/tableCSS.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    // <SessionProvider session={pageProps.session}>
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
