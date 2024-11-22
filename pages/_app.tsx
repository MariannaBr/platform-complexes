import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";

// These styles apply to every route in the application
import "./globals.css";
import "../lib/mapStyle.css";
import "../lib/emblaStyle.css";
import "../lib/customCSS.css";
import "../lib/tableCSS.css";
import { dogpatchData, missionBayData, rinconHillData } from "../lib/defaults";

const App = ({ Component, pageProps }: AppProps) => {
  const [gtmId, setGtmId] = useState(""); // Initialize Google Tag Manager ID

  useEffect(() => {
    const host = window.location.host;
    console.log(host);

    // Adjust GTM ID based on the host
    if (host.includes(dogpatchData.domain)) {
      setGtmId(dogpatchData.gtmId);
    } else if (host.includes(missionBayData.domain)) {
      setGtmId(missionBayData.gtmId);
    } else if (host.includes(rinconHillData.domain)) {
      setGtmId(rinconHillData.gtmId);
    } else {
      setGtmId(dogpatchData.gtmId); // Default GTM ID - Dogpatch
    }
  }, []);

  return (
    // <SessionProvider session={pageProps.session}>
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {gtmId && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
          />
          <Script id="google-analytics">
            {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gtmId}');`}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </>
    // </SessionProvider>
  );
};

export default App;
