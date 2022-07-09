import { useEffect, useState } from 'react';
import { 
  Box,
  Container,
  Heading,
  Text,
  Link,
  Flex,
  Tag,
  IconButton,
  HStack
} from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa';
import ChangeColorMode from '../components/ChangeColorMode';
import { MainTable } from '../components/MainTable';
import { NextSeo } from 'next-seo';


export default function Home() {
  const [data, setData] = useState([])
  const [blockTimestamps, setBlockTimestamps] = useState()

  useEffect(() => {
    const getData = async () => {
      const result = await fetch("/api/data")
      const json = await result.json()
      const { digestedResult, blockTimestamps } = json

      setData(digestedResult.reverse())
      setBlockTimestamps(blockTimestamps)

      console.log(digestedResult)
      console.log(blockTimestamps)
    }
    getData()
  }, [])

  return <Container maxW="container.xl" flexDir="column" >
    <NextSeo
      title="◌ spec"
      description="Multi-marketplace NFT sale feed. See what's going on in the Ethereum blockchain."
      openGraph={{
        url: 'https://google.com', // TODO
        title: '◌ spec | nft sale feed',
        description: "Multi-marketplace NFT sale feed. See what's going on in the Ethereum blockchain.",
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

    <Flex pt="4" justifyContent="flex-end">
      <ChangeColorMode />
    </Flex>

    <Flex align="flex-end" mb="7" mt="14" >
      <Heading size="2xl" mr={3} >
        ◌ spec
      </Heading>

      <Tag size={"sm"} colorScheme='purple'>alpha</Tag>
    </Flex>

    <Text >
      Multi-marketplace NFT activity feed. Currently only supporting OpenSea's 
      <Link mx={1} href='https://etherscan.io/address/0x00000000006c3852cbef3e08e8df289169ede581' isExternal>
        SeaPort
      </Link>
      contract (on eth)
    </Text>

    <HStack divider={<Box mx="4" border="none">|</Box>} mb="24">
      <Box>
        <Link isExternal href='#'>twitter</Link>
      </Box>
      <Box>
        <Link isExternal href='#'>submit a bug</Link>
      </Box>
      <Box>
        <Link isExternal href='#'>donate</Link>
      </Box>
    </HStack>

    <MainTable data={data} blockTimestamps={blockTimestamps} />

  </Container>
}