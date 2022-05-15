import { useEffect } from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import splitbee from "@splitbee/web";

import { defaultSEO } from "../next-seo.config";

import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    splitbee.init({
      scriptUrl: "/bee.js",
      apiUrl: "/_hive",
    });
  }, []);

  return (
    <>
      <DefaultSeo {...defaultSEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
