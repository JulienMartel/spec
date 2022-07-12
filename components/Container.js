import { 
  Flex,
  Container as ChakraContainer,
} from '@chakra-ui/react'
import ChangeColorMode from '../components/ChangeColorMode';
import { NextSeo } from 'next-seo';

export const Container = ({ children, isIndex }) => { // TODO add heading from index and new header on other pages
  return <ChakraContainer maxW="container.xl" flexDir="column" > 
    <Flex pt="4" justifyContent="flex-end">
      <ChangeColorMode />
    </Flex>

    <NextSeo
      title="◌ spec"
      description="Aggregated NFT sales feed & analytics. See what's going on in the Ethereum blockchain."
      openGraph={{
        url: 'https://spec-app.vercel.app/',
        title: '◌ spec',
        description: "Aggregated NFT sales feed & analytics. See what's going on in the Ethereum blockchain.",
        images: [
          {
            url: '/spec-og-img.png',
            width: 1200,
            height: 630,
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

    {children}
  </ChakraContainer>
}