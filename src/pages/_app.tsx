import "@/styles/globals.css";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  let router = useRouter();

  return (
    <>
      <NextSeo
        title={"Mohamed Abidi - Portfolio"}
        description={"Portfolio BTS SIO SISR - Responsable Infrastructure Systemes et Reseaux"}
        themeColor={"#2563eb"}
        openGraph={{
          title: "Mohamed Abidi - Portfolio",
          description: "Portfolio BTS SIO SISR - Responsable Infrastructure Systemes et Reseaux",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
