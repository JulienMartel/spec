import { Heading, VStack, Box, Text, HStack, Stack, Button, Highlight, useColorModeValue, Flex, Link, IconButton, Icon } from '@chakra-ui/react';
import { Container } from './../components/Container';
import NextLink from 'next/link';
import { SplashBackground } from '../components/SplashBackground';
import ChangeColorMode from '../components/ChangeColorMode';
import { About } from '../components/About';
import { PremiumFeatures } from '../components/PremiumFeatures';
import { FaDiscord, FaTwitter } from 'react-icons/fa';
import { ArrowForwardIcon } from '@chakra-ui/icons';


export default function Home() {


  return <>

    <Container isIndex >  

      <Stack flexDir={["column-reverse",,,"row"]} align="center" h={["70vh",,,"50vh"]} mb="64" mt={[0,,,"36"]} >
        <VStack w={["100%",,,"50%"]} align="start" spacing="4" mt={[6,,,0]}>
          <Heading
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          >
            <Highlight
              query='analytics'
              styles={{ 
                px: 3, 
                pb: 2, 
                rounded: 'full', 
                bg: useColorModeValue("purple.500","purple.200"), 
                color: useColorModeValue("white","gray.800"),
              }}
            >
              nft analytics
            </Highlight>
          
            <Text color={useColorModeValue("purple.500","purple.200")}>
              for pros
            </Text>
          </Heading>

          <Text fontSize="xl" maxW="container.sm">
            all the best info about nfts on eth, for <Text as="b">free</Text>. we visualize data in a simple way, and provide you with the best tools to get the most out of it.
          </Text>

          <HStack>
            <Button 
              size="lg"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight - 200,
                  behavior: 'smooth' // for smoothly scrolling
                });
              }}
            >
              learn more
            </Button>
            
            <NextLink href="/top">
              <Button size="lg" colorScheme="purple" rightIcon={<ArrowForwardIcon />}>enter app</Button>
            </NextLink>
          </HStack>

        </VStack>


        <SplashBackground />
      </Stack>



      <About />
      <PremiumFeatures />
      <Footer />

    </Container>
  </>
}

const Footer = () => <Flex
  w="full"
  py="4"
  justify="space-between"
  align="center"
>
  <Text>© {new Date().getFullYear()} ◌ spec - all rights reserved</Text>

  <Socials />
</Flex>

export const Socials = ({...rest}) => <HStack {...rest}>
  <Box>
    <Link isExternal href='https://twitter.com/spec0x'>
      <IconButton 
        variant="ghost" 
        aria-label='twitter' 
        size="lg"
        icon={<Icon w="5" h="5" as={FaTwitter} />}
      />
    </Link>
  </Box>
  <Box>
    <Link isExternal href='https://discord.gg/ahDJdsaAVY'>
      <IconButton 
          variant="ghost" 
          aria-label='discord' 
          size="lg"
          icon={<Icon w="5" h="5" as={FaDiscord} />}
      />
    </Link>
  </Box>
</HStack>