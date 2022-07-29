import { ChakraProvider, extendTheme, useColorModeValue } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Head from 'next/head'
import { AppWrapper } from '../context/state'
import { DefaultSeo } from 'next-seo';
import { useEffect } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
  midnightTheme
} from '@rainbow-me/rainbowkit';


const infuraId = process.env.INFURA_ID

const { provider, webSocketProvider, chains } = configureChains(
  [chain.mainnet],
  [infuraProvider({infuraId}), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'spec',
  chains
});

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
  connectors,
})

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', '#020202')(props),
      },
    
    }),
  },
})

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <DefaultSeo
        title="◌ spec"
        description="Aggregated NFT sales feed & analytics. See what's going on in the Ethereum blockchain."
        openGraph={{
          url: 'https://spec-app.vercel.app/',
          title: '◌ spec',
          description: "Aggregated NFT sales feed & analytics. See what's going on in the Ethereum blockchain.",
          images: [
            {
              url: '/spec-og-img2.png',
              width: 800,
              height: 600,
              alt: 'spec',
              type: 'image/png',
            },
          ],
          site_name: '◌ spec',
        }}
        // twitter={{
        //   handle: '@vendo_deals',
        //   site: '@vendo',
        //   cardType: 'summary_large_image', // TODO
        // }}
      />

      <Head>
        {/* from https://realfavicongenerator.net/favicon_result?file_id=p1g7iechpivd68ej180jsu6g6h6 */}
        <link rel="apple-touch-icon" sizes="76x76" href="/metadata/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/metadata/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/metadata/favicon-16x16.png" />
        <link rel="manifest" href="/metadata/site.webmanifest" />
        <link rel="mask-icon" href="/metadata/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/metadata/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/metadata/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AppWrapper>
        <WagmiConfig client={client}>
          <RKP>
            <Component {...pageProps} />
          </RKP>
        </WagmiConfig>
      </AppWrapper>
    </ChakraProvider>
  )
}

export default MyApp

const RKP = ({children}) => {
  return (
    <RainbowKitProvider
      chains={chains}
      theme={useColorModeValue(
        lightTheme({accentColor: "#805AD5", accentColorForeground: "white"}), 
        midnightTheme({accentColor: "#D6BCFA", accentColorForeground: "black"})
      )}
    >
      {children}
    </RainbowKitProvider>
  )
}