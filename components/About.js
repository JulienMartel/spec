import {
  Stack,
  Box,
  Text,
  Heading,
  SimpleGrid,
  Tag,
  Icon,
  HStack,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { SiMaildotru } from 'react-icons/si';

export const About = () => {
  return <Stack spacing={8} direction={{ base: 'column', lg: 'row' }} py={{ base: 4, md: 20, xl: 24 }}>
    <Stack
      w={["100%",,,"50%"]}
      justify={{ lg: 'center' }}
    >
      <Box mb={{ base: 8, md: 20 }}>
        <Text
          fontWeight={700}
          textTransform={'uppercase'}
          mb={3}
          fontSize={'xl'}
          color={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
        >
          about
        </Text>
        <Heading
          mb={5}
          fontSize={{ base: '3xl', md: '5xl' }}
        >
          in-depth & simple
        </Heading>
        <Text fontSize={'xl'} >
          ◌ spec makes it easy to get your favorite data about nfts on ethereum. we provide you with fast, clean interfaces to get the most out of that data.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {stats.map((stat) => (
          <Box key={stat.title}>
            <Text
              fontSize={'3xl'}
              mb={3}>
              {stat.title}
            </Text>
            <Text fontSize={'xl'}>
              {stat.content}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Stack>

    <Box w={["100%",,,"50%"]} py={12} >
      <Stack 
        h="full" 
        // bg={useColorModeValue("blackAlpha.50", "whiteAlpha.200")} 
        border="1px solid"
        borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        shadow={useColorModeValue("lg", "dark-lg")}
        minH='300px' 
        rounded={'lg'} 
        p={8}
        align="center"
        justify="center"
        spacing={3}
      >
        <Tag p={4} rounded="full" colorScheme="purple">
          <Icon boxSize="8" as={SiMaildotru} />
        </Tag>

        <Text fontSize={'2xl'} fontWeight={'semibold'}>weekly recap</Text>

        <Text textAlign="center" fontSize={'lg'}>subscribe to get a weekly recap on whats happening in eth nfts</Text>

        <form
          action="https://www.getrevue.co/profile/spec/add_subscriber" 
          method="post"
          id="revue-form" 
          name="revue-form" 
          target="_blank"
        >
          <HStack pt={3} w="full">
            <Input
              type="email"
              placeholder="your email"
              rounded="full"
              size="lg"
              name="member[email]"
              id="member_email"
              // variant={"filled"}
            />
            <Button 
              type='submit'
              size="lg" 
              px={8} 
              colorScheme="purple" 
              rounded="full"
              value="Subscribe" 
              name="member[subscribe]"
              id="member_submit"
            >
              subscribe
            </Button>

          </HStack>

          <Text color={useColorModeValue("blackAlpha.700", "whiteAlpha.600")} mt={3} textAlign={'center'}>
            By subscribing, you agree with Revue’s{' '}
            <a target="_blank" href="https://www.getrevue.co/terms">
              Terms of Service
            </a>
            {' '}and{' '}
            <a target="_blank" href="https://www.getrevue.co/privacy">
              Privacy Policy
            </a>.
          </Text>
        </form>

      </Stack>
    </Box>
  </Stack>
}

const StatsText = ({ children }) => (
  <Text as={'span'} fontWeight={700}>
    {children}
  </Text>
);

const stats = [
  {
    title: '5+',
    content: (
      <>
        <StatsText>marketplaces</StatsText> on ethereum being watched with more platforms and chains to come 😁
      </>
    ),
  },
  {
    title: '24/7',
    content: (
      <>
        <StatsText>analytics</StatsText> enabled right in your dashboard and right at your fingertips ⌚
      </>
    ),
  },
  // {
  //   title: '#1',
  //   content: (
  //     <>
  //       <StatsText>portfolio</StatsText> floor price checker in North America has chosen NewLife™ as
  //       their management solution
  //     </>
  //   ),
  // },
  // {
  //   title: '250M+',
  //   content: (
  //     <>
  //       <StatsText>Plants</StatsText> currently connected and monitored by the
  //       NewLife™ software
  //     </>
  //   ),
  // },
];