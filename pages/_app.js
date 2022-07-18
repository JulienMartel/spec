import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import Head from 'next/head'
import { AppWrapper } from '../context/state'
import { DefaultSeo } from 'next-seo';

import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  defaultChains,
} from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'

const infuraId = process.env.INFURA_ID

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [infuraProvider({ infuraId})],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})
  
  
const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'blackAlpha.700')(props),
      },
    
    }),
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
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
      <WagmiConfig client={client}>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </WagmiConfig>
    </ChakraProvider>
  )
}

export default MyApp