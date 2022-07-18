import { 
  Flex,
  Container as ChakraContainer,
  Heading,
  Tag,
  Text,
  HStack,
  Link,
  Box,
  Alert,
  useDisclosure,
  CloseButton,
  IconButton,
  Icon,
} from '@chakra-ui/react'
import ChangeColorMode from '../components/ChangeColorMode';
import NextLink from 'next/link'
import { FaDiscord, FaTwitter } from 'react-icons/fa';

export const Container = ({ children, isIndex }) => { // TODO add heading from index and new header on other pages
  return <>
    <DiscordAlert />

    <ChakraContainer maxW="container.xl" flexDir="column" > 
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
  </>
}

const DiscordAlert = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Alert variant="left-accent" pos="relative" justifyItems="space-between" h="fit-content" colorScheme="purple" justifyContent="center" >
      <Box>
        <Text>
          <Link href='https://discord.gg/ahDJdsaAVY' >join our discord</Link>{" "}
          to chat, submit bugs, and request features!
        </Text>
      </Box>
      <CloseButton
        pos="absolute"
        right={0}
        onClick={onClose}
      />
    </Alert>
  ) : null
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
      NFT analytics tool
    </Text>

    <HStack mt="2" mb="24">
      <Box>
        <Link isExternal href='https://twitter.com/spec0x'>
          <IconButton 
            variant="ghost" 
            aria-label='twitter' 
            icon={<Icon w="5" h="5" as={FaTwitter} />}
          />
        </Link>
      </Box>
      <Box>
        <Link isExternal href='https://discord.gg/ahDJdsaAVY'>
          <IconButton 
              variant="ghost" 
              aria-label='discord' 
              icon={<Icon w="5" h="5" as={FaDiscord} />}
          />
        </Link>
      </Box>
    </HStack>

    <Heading size="md">recent sales</Heading>
  </>
}