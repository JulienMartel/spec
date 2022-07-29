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
         ◌ spec makes it easy to get your favorite information about nfts on eth. We provide you with fast, clean interfaces to get the most out of that data.
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
        bg={useColorModeValue("blackAlpha.50", "whiteAlpha.200")} 
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

        <HStack pt={3} w="full">
          <Input
            type="email"
            placeholder="your email"
            rounded="full"
            size="lg"

          />
          <Button size="lg" px={10} colorScheme="purple" rounded="full" >
            subscribe
          </Button>
        </HStack>

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