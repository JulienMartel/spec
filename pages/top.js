import { 
  Box, 
  Table, 
  TableContainer, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr, 
  Heading,
  Text,
  Button,
  useColorModeValue,
  Avatar,
  Flex,
  HStack,
  MenuItemOption,
  IconButton,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuList,
  Tfoot,
} from '@chakra-ui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import NextLink from 'next/link';
import { optimizeImage } from '../utils';
import { Container } from '../components/Container';
import { forwardRef, useEffect, useState } from 'react';
import { abbrNum } from '../utils';
import { EthLogo } from '../components/EthLogo';
import { ChevronDownIcon } from '@chakra-ui/icons';

const menuOptions = {
  "1DayVolume": {label: '24h', selector: '1day'},
  "7DayVolume": {label: '7 days', selector: '7day'},
  "30DayVolume": {label: '30 days', selector: '30day'},
  "allTimeVolume": {label: 'all-time', selector: 'allTime'},
}

export default function Home(props) {
  const [collections, setCollection] = useState(props.collections)
  const [continuation, setContinuation] = useState(props.continuation)

  const [sortBy, setSortBy] = useState('1DayVolume')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    refetch({})
  }, [sortBy])

  const refetch = async ({isPagination}) => {
    setLoading(true)
    const { collections: newCollections, continuation: newContinuation } = await fetchCollections({
      sortBy,
      continuation: isPagination ? continuation : null
    })

    setContinuation(newContinuation)
    
    isPagination ? setCollection([...collections, ...newCollections]) : setCollection(newCollections)
    setLoading(false)
  }

  console.log(collections)
  return <Container >

    <Box my={8} textAlign="center">
      <Heading mb={2} >top collections</Heading>
      <Text>the top nfts on eth ranked by volume, floor price, etc</Text>
    </Box>

    <Box rounded="lg" py={4} bg={useColorModeValue("white", "#020202")} pos="sticky" top="0" zIndex={10}>
      <Menu>
        <MenuButton rightIcon={<ChevronDownIcon />} isLoading={loading} as={Button} colorScheme="purple" variant="outline">
          {menuOptions[sortBy].label}
        </MenuButton>
        <MenuList bg={useColorModeValue("white", "#020202")} minWidth='240px'>
          <MenuOptionGroup value={sortBy} title='length' type='radio' onChange={setSortBy}>
            {Object.keys(menuOptions).map(key => (
              <MenuItemOption value={key} key={key}>{menuOptions[key].label}</MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Box>

    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>collection</Th>
            <Th isNumeric>volume</Th>
            <Th isNumeric>24h</Th>
            <Th isNumeric>7d</Th>
            <Th isNumeric>floor</Th>
            <Th isNumeric>24h</Th>
            <Th isNumeric>7d</Th>
          </Tr>
        </Thead>
        <Tbody>
          {collections.map(c => <Collection collection={c} sortBy={sortBy} key={c.id} />)}
        </Tbody>
      </Table>
    </TableContainer>
    
    {continuation &&
      <Flex
        w="full"
        justify="center"
        py="10"
      >
        <Button isLoading={loading} onClick={() => refetch({isPagination: true})} >load more</Button>
      </Flex>
    }

  </Container>
}


const fetchCollections = ({sortBy, continuation}) => {
  return fetch(
    "https://api.reservoir.tools/collections/v4?includeTopBid=false&limit=20" +
    (sortBy ? '&sortBy=' + sortBy : "") + 
    (continuation ? '&continuation=' + continuation : "")
  ).then(r => r.json())
}

export async function getServerSideProps() {

  const { collections, continuation } = await fetchCollections({sortBy: '1DayVolume'})

  return {
    props: {collections: [...collections], continuation}
  }
}

const Collection = ({collection, sortBy}) => (
  <NextLink href={"/collection/" + collection.id}>
    <Tr 
      _hover={{
        cursor: "pointer", 
        bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50"), 
        ".name": {textDecoration: "underline"},
      }} 
    >
      <Td>
        <HStack spacing="3" align="center">
          <Text fontWeight="normal">{collection.rank[menuOptions[sortBy].selector]}</Text>
          <Avatar size="md" src={optimizeImage(collection.image, 60)}/>
          <Text className='name'>
            {collection.name}
          </Text>
        </HStack>
      </Td>

      <Td isNumeric fontWeight="medium" >
        <EthLogo mr="1" />
        {abbrNum(collection.volume[menuOptions[sortBy].selector])}
      </Td>
      <Td isNumeric >
        <ChangePercent value={collection.volumeChange['1day']} />
      </Td>
      <Td isNumeric >
        <ChangePercent value={collection.volumeChange['7day']} />
      </Td>

      <Td isNumeric fontWeight="medium" >
        <EthLogo mr="1" />
        {abbrNum(collection.floorAskPrice)}
      </Td>
      <Td isNumeric >
        <ChangePercent value={collection.floorSaleChange['1day']} />
      </Td>
      <Td isNumeric >
        <ChangePercent value={collection.floorSaleChange['7day']} />
      </Td>

    </Tr>
  </NextLink>
)

const ChangePercent = ({value}) => {
  const percent = ((value - 1) * 100).toFixed(2)
  const color = percent > 0 ? "green" : "red"

  return <Text fontWeight="medium" color={color}>{percent > 0 ? "+" : ""}{percent}%</Text>
  // return <Text fontWeight="medium">
  //   {/* {value > 0 ? <Text color="green.500">+{value}%</Text> : <Text color="red.500">{value}%</Text>} */}
  //   test
  // </Text>
}