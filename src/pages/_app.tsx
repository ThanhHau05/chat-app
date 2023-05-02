import { AuthContext, AuthProvider } from "@/context/auth-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useContext } from "react";

import { SimpleLoading } from "@/components/loading";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <App pageProps={pageProps} Component={Component} />
    </AuthProvider>
  );
};

const App = ({ Component, pageProps }: any) => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      {loading && <SimpleLoading />}
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
