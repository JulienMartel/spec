import { useEffect, useState } from 'react';
import { 
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Tag,
  HStack,
  Spinner,
} from '@chakra-ui/react'
import { MainTable } from '../components/MainTable';
import { Controls } from './../components/Controls'
import { Container } from './../components/Container';

export default function Home() {
  const [sales, setSales] = useState(null)
  const [continuation, setContinuation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [collectionFilters, setCollectionFilters] = useState([])

  useEffect(() => {
    getSales()
  }, [collectionFilters])
  
  const getSales = async () => {
    setLoading(true)

    if (collectionFilters.length > 0) {
      const promises = collectionFilters.map(({contract}) => {
        const limit = Math.round(50/collectionFilters.length)
        return fetch(`https://api.reservoir.tools/sales/v3?contract=${contract}&limit=${limit}`)
      })
      const results = await Promise.all(promises)
      const data = await Promise.all(results.map(r => r.json()))
      
      const sales = data.reduce((acc, cur) => {
        return [...acc, ...cur.sales]
      }, [])

      const continuations = data.reduce((acc, cur) => { //TODO
        return [...acc, cur.continuation]
      }, [])
      
      const orderedSales = sales.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp)
      })

      console.log(orderedSales, continuations)

      setSales(sales)
      setLoading(false)
    } else {

      const result = await fetch("https://api.reservoir.tools/sales/v3?limit=50")
      const { sales, continuation } = await result.json()
      console.log(sales)
  
      setSales(sales)
      setLoading(false)
    }

    
  }

  useEffect(() => {
    getSales()
  }, [])

  return <Container isIndex >

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
        <Link isExternal href='#'>twitter</Link>
      </Box>
      <Box>
        <Link isExternal href='#'>submit a bug</Link>
      </Box>
      <Box>
        <Link isExternal href='#'>request a feature</Link>
      </Box>
      <Box>
        <Link isExternal href='#'>donate</Link>
      </Box>
    </HStack>

    { sales ? <MainTable sales={sales} /> : <MainSpinner /> }

    <Controls {...{getSales, loading, setCollectionFilters, collectionFilters}} isInitialLoad={sales === null} />

  </Container>
}

const MainSpinner = () => {
  return <Flex w="full" justify="center" mt="40">
    <Spinner size='xl' />
  </Flex>
}