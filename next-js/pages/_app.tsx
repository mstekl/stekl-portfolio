import { AppProps } from "next/app"
import { AnimatePresence } from 'framer-motion'

import { IBM_Plex_Sans } from 'next/font/google';

import "styles/globals.css"

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: '400' });

export default function App({ Component, pageProps, router }: AppProps) {

  return <AnimatePresence 
            mode="wait" initial={false}>
    <Component key={router.route} {...pageProps} />
  </AnimatePresence>
}
