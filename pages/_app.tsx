import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";

// These styles apply to every route in the application
import "./globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
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
