import { useEffect, useState } from 'react';
import { 
  Flex,
  Spinner,
  Button,
  Box
} from '@chakra-ui/react'
import { MainTable } from '../components/MainTable';
import { Controls } from './../components/Controls'
import { Container } from './../components/Container';

export default function Home() {
  const [sales, setSales] = useState(null)
  const [continuation, setContinuation] = useState()
  const [loading, setLoading] = useState(false)
  const [collectionFilters, setCollectionFilters] = useState([])

  useEffect(() => {
    getSales()
  }, [collectionFilters])
  
  const getSales = async () => {
    setLoading(true)

    const result = await fetch(
      "https://api.reservoir.tools/sales/v3?" +
      (collectionFilters ? collectionFilters.map(({contract}) => `contract=${contract}`).join("&") + "&" : "") +
      ( continuation ? "continuation=" + continuation + "&" : "") +
      "limit=20"
    )

    const { sales: newSales, continuation: newContinuation } = await result.json()
    console.log(newSales, newContinuation)

    continuation ? setSales(s => {
      console.log(s)
      return [...s, ...newSales]
    }) : setSales(newSales)
    // setSales(newSales)

    newContinuation && setContinuation(newContinuation)

    setLoading(false)
  }

  useEffect(() => {
    getSales()
  }, [])

  return <Container isIndex >

    { sales ? <MainTable sales={sales} /> : <MainSpinner /> }

    {continuation &&
      <Flex
        w="full"
        justify="center"
        py="10"
      >
        <Button isLoading={loading} onClick={getSales} >load more</Button>
      </Flex>
    }

    <Controls {...{getSales, loading, setCollectionFilters, collectionFilters, setContinuation}} isInitialLoad={sales === null} />

  </Container>
}

const MainSpinner = () => {
  return <Flex w="full" justify="center" mt="40">
    <Spinner size='xl' />
  </Flex>
}