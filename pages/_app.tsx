import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

// These styles apply to every route in the application
import './globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default App;