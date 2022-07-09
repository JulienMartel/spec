import { 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Badge,
  useColorModeValue,
  Tooltip,
  Link,
  Box,
  Img,
  IconButton,
  Icon,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { RepeatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { FaEthereum, FaFilter } from 'react-icons/fa'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)


const hexColorFromAddr = (addr) => {
  return "#" + addr.substring(2, 8)
}

export const MainTable = ({data, blockTimestamps}) => {

  return <>
    <Stack position="fixed" p={3} m={3} bottom={0} right={0} w="min" bg={useColorModeValue("#f7f7f7", "#0f0f0f")} rounded="lg" >
      <Tooltip placement='left' label="Back to top">
        <Box>
          <IconButton
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth' // for smoothly scrolling
              });
            }}
            aria-label='Back to top' 
            icon={<ArrowUpIcon />}
            size="lg"
          />
        </Box>
      </Tooltip>
      <Tooltip placement='left' label="Refresh">
        <Box>
          <IconButton
            onClick={() => {console.log("refresh")}}
            aria-label='Refresh' 
            icon={<RepeatIcon />}
            size="lg"
          />
        </Box>
      </Tooltip>
      <Tooltip placement='left' label="Filter">
        <Box>
          <IconButton
            onClick={() => {console.log("filter")}}
            aria-label='Filter' 
            icon={<FaFilter />}
            size="lg"
          />
        </Box>
      </Tooltip>
    </Stack>

    <TableContainer>
      <Table variant='simple'>
        <Thead position="relative">
          <Tr>
            <Th  />
            <Th isNumeric >price</Th>
            <Th >from</Th>
            <Th >to</Th>
            <Th >on</Th>
            <Th >when</Th>
            <Th >type</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map(item => <Item key={item.orderHash} item={item} blockTimestamps={blockTimestamps} />)
          }
        </Tbody>
      </Table>
    </TableContainer>
  </>
}

const Item = ({item, blockTimestamps}) => {
  const timestamp = blockTimestamps[item.blockNumber]

  const when = dayjs.unix(timestamp).fromNow()

  return <Tr
    transition="background-color 0.2s"
    _hover={{ backgroundColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.100') }}
  >
    <Td>
      <Text>
        {item.tokenName || item.contractName + " #" + item.nftId}
      </Text>
    </Td>
    <Td isNumeric w="min-content">
      <Text display="inline" >
        {/* round the number the 4 decimals */}
        {Math.round(Number(item.purchasePriceEth) * 10000) / 10000}
      </Text>
      <Currency tokenAddr={item.paymentToken} />
    </Td>
    <Td>
      <AddressBadge addr={item.seller} />
    </Td>
    <Td>
      <AddressBadge addr={item.buyer} />
    </Td>
    <Td>
      <OpenseaLink addr={item.contractAddr} nftId={item.nftId} />
    </Td>
    <Td>
      <Link isExternal href={'https://etherscan.io/tx/' + item.tx}>{when}</Link>
    </Td>
    <Td>
      <Text as='em' >{item.contractType}</Text>
    </Td>
  </Tr>
}

const EthLogo = ({color}) => {
  return <Icon mb="-0.5" color={color} as={FaEthereum} />
}

const Currency = ({tokenAddr}) => {
  let tokenSymbol

  switch (tokenAddr) {
    case "0x0000000000000000000000000000000000000000":
      tokenSymbol = "ETH"
      break;
    case "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2":
      tokenSymbol = "WETH"
      break;
    default:
      console.log(tokenAddr)
      tokenSymbol = tokenAddr?.substring(0, 4)
  }

  return <Tooltip label={tokenSymbol}>
    <Box display="inline" ml="1">
      {tokenSymbol === "ETH" ? <EthLogo /> : tokenSymbol === "WETH" ? <EthLogo color="#f72585" /> : tokenSymbol}
    </Box>
  </Tooltip>
}

const OpenseaLink = ({addr, nftId}) => {
  return <Box boxSize="5" rounded="full">
    <Link w="min" isExternal href={`https://opensea.io/assets/ethereum/${addr}/${nftId}`}>  
      <Img src='/os.png' />
    </Link>
  </Box>
}

const AddressBadge = ({addr}) => {
  const hex = hexColorFromAddr(addr)
  return <Tooltip label={<Text fontSize="xs">{addr}</Text>}>
    <Badge 
      filter={`brightness(${useColorModeValue("80%", "120%")})`} 
      color={hex} bg={hex + "33"}
    >
      {addr.slice(2,9)}...
    </Badge>
  </Tooltip>
}