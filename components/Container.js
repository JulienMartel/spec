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
  useColorModeValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { useEffect } from 'react';
import { SidebarWithHeader } from './SidebarWithHeader';
import ChangeColorMode from './ChangeColorMode';

export const Container = ({ children, isIndex }) => { // TODO add heading from index and new header on other pages
  if (isIndex) return <ChakraContainer pos="relative" maxW="container.xl" flexDir="column">
    <IndexHeader />
    {children}
  </ChakraContainer>

  return <>
    <DiscordAlert />

    <SidebarWithHeader>
      <ChakraContainer pos="relative" maxW="full" flexDir="column" > 

        {children}

      </ChakraContainer>
    </SidebarWithHeader>
  </>
}

const IndexHeader = () => {
  return <Flex
    pos="sticky" 
    top="0" 
    py={4} 
    bg={useColorModeValue("white", "#020202")} 
    zIndex="9999"
    align="center"
    justify="space-between"
  >
    <Flex align="flex-end">
      <NextLink href="/" passHref>
        <Link _hover={{textDecoration: "none"}} >
          <Heading size="2xl" mr={3} >
            ◌ spec
          </Heading>
        </Link>
      </NextLink>

      <Tag size={"sm"} colorScheme='purple'>alpha</Tag>
    </Flex>

    <ChangeColorMode />
  </Flex> 
}

// const IndexHeader = () => {
//   return <Flex
//     justify='space-between'
//     py={5}

//   >
//     <Text></Text>
//   </Flex>
// }

const DiscordAlert = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ 
    defaultIsOpen: false,
    onClose: () => {window.localStorage.setItem('discordAlertClosed', true)},
  })

  useEffect(() => {
    const isClosed = window.localStorage.getItem('discordAlertClosed')

    if (!isClosed) {
      onOpen()
    }
  }, [])

  return isVisible ? (
    <Alert variant="left-accent" pos="relative" justifyItems="space-between" h="fit-content" colorScheme="purple" justifyContent="center" >
      <Box>
        <Text>
          <Link href='https://discord.gg/ahDJdsaAVY' >join our discord</Link>{" "}
          to submit bugs, request features, or just chat!
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



// const IndexHeader = () => {
//   return <>
//     <Flex align="flex-end" mb="6" mt="14" >
//       <Heading size="2xl" mr={3} >
//         ◌ spec
//       </Heading>

//       <Tag size={"sm"} colorScheme='purple'>alpha</Tag>
//     </Flex>

//     <Text >
//       nft analytics tool
//     </Text>

//     <HStack mt="2" mb="24">
//       <Box>
//         <Link isExternal href='https://twitter.com/spec0x'>
//           <IconButton 
//             variant="ghost" 
//             aria-label='twitter' 
//             icon={<Icon w="5" h="5" as={FaTwitter} />}
//           />
//         </Link>
//       </Box>
//       <Box>
//         <Link isExternal href='https://discord.gg/ahDJdsaAVY'>
//           <IconButton 
//               variant="ghost" 
//               aria-label='discord' 
//               icon={<Icon w="5" h="5" as={FaDiscord} />}
//           />
//         </Link>
//       </Box>
//     </HStack>

//     <Heading size="md">recent sales</Heading>
//   </>
// }