import { AppContext, AppProvider } from "@/context/app-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SimpleLoading } from "@/components/loading";
import { useContext } from "react";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <App pageProps={pageProps} Component={Component} />
    </AppProvider>
  );
};

const App = ({ Component, pageProps }: any) => {
  const { loadingprivate, infousersidebar } = useContext(AppContext);

  return (
    <div>
      {loadingprivate && !infousersidebar.name && <SimpleLoading />}
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
