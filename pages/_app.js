import "../styles/globals.css";
import { Fragment, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@lib/ThemeContext";
import DefaultLayout from "layouts/default";
import { AuthContextProvider } from "@lib/AuthContext";
import LoadingScreen from "@components/Global/LoadingScreen";
import GlobalContextProvider from "@lib/GlobalContext";

function MyApp({ Component, pageProps, router }) {
  const Layout = Component.layout || DefaultLayout;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading || typeof window === "undefined") {
    return <LoadingScreen />;
  }
  return (
    <Fragment>
      <AuthContextProvider>
        <GlobalContextProvider>
          <ThemeProvider>
            <AnimatePresence initial={true} exitBeforeEnter>
              <Layout key={router.route}>
                <main className="min-h-[calc(100vh-67px)]">
                  <Component {...pageProps} />
                </main>
                <Toaster />
              </Layout>
            </AnimatePresence>
          </ThemeProvider>
        </GlobalContextProvider>
      </AuthContextProvider>
    </Fragment>
  );
}

export default MyApp;
