import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
  Heading,
  Text,
} from '@chakra-ui/react';
import {} from '@chakra-ui/react';

const Feature = ({ heading, text }) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export const PremiumFeatures = () => {
  return (
    <Box maxW="7xl" mt={["32",,,64]} mb="40">
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <Heading fontSize="5xl" fontWeight="700">
              premium
            </Heading>
            <Button size="lg" colorScheme="purple">
              get premium
            </Button>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <Text fontSize="xl">
              premium membership provides you with acces to all of our premium features (some are stated below) for a one-time fee of 0.1 ETH.
            </Text>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}>
        <Feature
          heading={'portfolio calculator'}
          text={'calculate the value of your entire nft portfolio using collection floor prices'}
        />
        <Feature
          heading={'notifications'}
          text={'get email/text notifications for certain events, like when a floor price is hit'}
        />
        <Feature
          heading={'watchlists'}
          text={'add collections to custom watchlists to filter noise'}
        />
        <Feature
          heading={'lifetime access'}
          text={'Lifetime access to all of our premium features, including future updates'}
        />
      </Grid>
    </Box>
  );
}