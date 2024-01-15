import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Outfit } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const outfit = Outfit({ weight: ["400", "600"], subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={outfit.className}>
      <Component {...pageProps} />
    </main>
  );
}
