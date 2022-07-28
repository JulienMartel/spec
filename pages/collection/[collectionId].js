import { 
  Avatar,
  Box, 
  Heading, 
  Text,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { VolStats } from "../../components/VolStats";
import { FpStats } from "../../components/FpStats";
import { ShowDescription } from "../../components/ShowDescription";
import { EthLogo } from "../../components/EthLogo";

const Collection = (props) => {
  console.log(props)
  const {
    name,
    metadata,
    volume,
    volumeChange,
    floorSale,
    floorSaleChange,
    floorAsk,
    rank,
  } = props

  return <Container>
    <Box 
      w="full"
      minH={useBreakpointValue([40,,80])}
      bgImage={`url(${metadata.bannerImageUrl || "#"})`}
      bgPos="center"
      bgSize="cover"
    />

    <Box ml={8} mb="-10" pos="relative">
      <Avatar
        outline="5px solid" 
        outlineColor={useColorModeValue("white", "black")}
        pos="relative"  
        size="2xl" 
        src={metadata.imageUrl} 
        bottom="16" 
      />
    </Box>

    <Heading>
      {name}
    </Heading>

    <ShowDescription desc={metadata.description} />

    <Box 
      my="8" 
      rounded="lg" 
      py="4"
    >

      <Accordion allowMultiple defaultIndex={[0,1]}>
        <AccordionItem  >
          <AccordionButton justifyContent="space-between">
            <Text>volume</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
  
            <VolStats {...{volume, volumeChange, rank}} />

          </AccordionPanel>
        </AccordionItem>


        <AccordionItem  >
          <AccordionButton justifyContent="space-between">
            <Text>floor price</Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>

            <FpStats {...{floorSale, floorSaleChange, floorAsk}} />

          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      
    </Box>

  </Container>
}

export default Collection;

export async function getServerSideProps(context) {
  const { collectionId } = context.query

  const result = await fetch(
    `https://api.reservoir.tools/collection/v3?id=${collectionId}&includeTopBid=true`, 
    {timeout: 5000}
  )
  const { collection } = await result.json()

  return {
    props: {...collection}
  }
}