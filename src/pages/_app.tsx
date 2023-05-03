import { AuthContext, AuthProvider } from "@/context/auth-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SimpleLoading } from "@/components/loading";
import { useContext } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <App pageProps={pageProps} Component={Component} />
    </AuthProvider>
  );
};

const App = ({ Component, pageProps }: any) => {
  const { loadingprivate, infouser } = useContext(AuthContext);

  return (
    <div>
      {loadingprivate && !infouser.name && <SimpleLoading />}
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
