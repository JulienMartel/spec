import { 
  Flex,
  Container as ChakraContainer,
  Heading,
  Tag,
  Text,
  HStack,
  Link,
  Box,
} from '@chakra-ui/react'
import ChangeColorMode from '../components/ChangeColorMode';
import { NextSeo } from 'next-seo';
import NextLink from 'next/link'

export const Container = ({ children, isIndex }) => { // TODO add heading from index and new header on other pages
  return <ChakraContainer maxW="container.xl" flexDir="column" > 
    <Flex 
      pt="4" 
      justifyContent={isIndex ? "flex-end" : "space-between"}
      mb={isIndex ? "0" : "20"}
    >
      {!isIndex && <NotIndexHeader />}
      <ChangeColorMode />
    </Flex>

    { isIndex && <IndexHeader /> }

    {children}
  </ChakraContainer>
}

const NotIndexHeader = () => {
  return <Flex align="flex-end" h="min" >
    <NextLink href="/" passHref>
      <Link _hover={{textDecoration: "none"}} >
        <Heading size="xl" mr={3} >
          ◌ spec
        </Heading>
      </Link>
    </NextLink>

    <Tag size={"sm"} colorScheme='purple'>alpha</Tag>
  </Flex>
}

const IndexHeader = () => {
  return <>
    <Flex align="flex-end" mb="7" mt="14" >
      <Heading size="2xl" mr={3} >
        ◌ spec
      </Heading>

      <Tag size={"sm"} colorScheme='purple'>alpha</Tag>
    </Flex>

    <Text >
      Aggregated NFT sales feed & analytics.
    </Text>

    <HStack divider={<Box mx="4" border="none">|</Box>} mb="24">
      <Box>
        <Link href='#'>twitter</Link>
      </Box>
      <Box>
        <Link href='#'>discord</Link>
      </Box>
    </HStack>
  </>
}