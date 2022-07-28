import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Td,
  Flex,
  Skeleton,
  Box,
  Heading,
  SkeletonCircle,
  Text,
  Button,
} from '@chakra-ui/react'
import { Sale } from './Sale'
import { useEffect, useState } from 'react'
import { Controls } from './Controls'
import { Container } from './Container'

export const MainTable = () => {
  const [sales, setSales] = useState(null)
  const [continuation, setContinuation] = useState()
  const [loading, setLoading] = useState(false)
  const [collectionFilters, setCollectionFilters] = useState([])

  useEffect(() => {
    getSales()
  }, [collectionFilters])
  
  const getSales = async (args) => {
    setLoading(true)

    const result = await fetch(
      "https://api.reservoir.tools/sales/v3?" +
      (collectionFilters ? collectionFilters.map(({contract}) => `contract=${contract}`).join("&") + "&" : "") +
      ( continuation && !args?.isRefresh ? "continuation=" + continuation + "&" : "") +
      "limit=20"
    )

    const { sales: newSales, continuation: newContinuation } = await result.json()
    console.log(newSales, newContinuation)

    if (continuation && !args?.isRefresh) {
      setSales(s => {
        console.log(s)
        return [...s, ...newSales]
      })
    } else {
      setSales(newSales)
    }
    
    setContinuation(newContinuation)
    setLoading(false)
  }

  useEffect(() => {
    getSales()
  }, [])

  return <Box>

    <Box my={8} textAlign="center">
      <Heading mb={2} >recent sales</Heading>
      <Text>browse recent nft sales on eth and filter by collection</Text>
    </Box>

    <Controls 
      {...{
        getSales, 
        loading, 
        setCollectionFilters, 
        collectionFilters, 
        setContinuation,
        isInitialLoad: sales === null
      }} 
    />

    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th  />
            <Th isNumeric >price</Th>
            <Th >from</Th>
            <Th >to</Th>
            <Th >on</Th>
            <Th >when</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sales?.map(sale => <Sale key={sale.id + String(sale.logIndex)} sale={sale} />)}
          {loading && <SkeletonTable />}
        </Tbody>
      </Table>
    </TableContainer>

    {continuation &&
      <Flex
        w="full"
        justify="center"
        py="10"
      >
        <Button isLoading={loading} onClick={getSales} >load more</Button>
      </Flex>
    }

  </Box>
}

const SkeletonTable = () => (
  <>
    {new Array(20).fill().map((_, i) => 
      <Tr key={i}>
        <Td>
          <Flex>
            <Skeleton boxSize="14" rounded="md" />

            <Box ml="2">
              <Skeleton>
                <Heading mb="1" size="xs">
                  token collecition name is long
                </Heading>
              </Skeleton>

              <Skeleton w="fit-content" >token namey can be long too</Skeleton>
            </Box>
          </Flex>
        </Td>
        <Td isNumeric>
          <Flex flexDir="column" align="flex-end">
            <Skeleton >
              <Text fontWeight="medium" display="inline" >
                150000
              </Text>
            </Skeleton>
          </Flex>
          <Skeleton >
            <Text fontWeight="medium" fontSize="smaller" >
              $1,000.00
            </Text>
          </Skeleton>

        </Td>
        <Td>
          <Skeleton>12345</Skeleton>
        </Td>
        <Td>
          <Skeleton>12345</Skeleton>
        </Td>
        <Td>
          <SkeletonCircle boxSize="6" />
        </Td>
        <Td>
          <Skeleton>two minutes ago</Skeleton>
        </Td>
      </Tr>
    )}
  </>
)

