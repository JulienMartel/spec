import { 
  Tr,
  Td,
  Text,
  useColorModeValue,
  Tooltip,
  Link,
  Box,
  Image,
  Icon,
  Heading,
  Flex,
} from '@chakra-ui/react'
import { FaEthereum } from 'react-icons/fa'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { AddressBadge } from './AddressBadge'
import { Platform } from './Platform'
import NextLink from 'next/link'

dayjs.extend(relativeTime)

export const Sale = ({sale}) => {

  const when = dayjs.unix(sale.timestamp).fromNow()
  const { token } = sale

  return <Tr
    transition="background-color 0.2s"
    _hover={{ backgroundColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.100') }}
  >

    <Td>
      <Flex>
        <Image boxSize="14" src={token.image} fallback={<ImageFallback />} rounded="md" />

        <Box ml="2">
          <NextLink href={'/collection/' + token.collection.id} passHref>
            <Link w="min-content" >
              <Heading mb="1" size="xs">{token.collection.name}</Heading>
            </Link>
          </NextLink>

          <Text>
            {token.name}
          </Text>
        </Box>
      </Flex>
    </Td>
    <Td isNumeric w="min-content">
      <Text display="inline" >
        {sale.price}
      </Text>
      <EthLogo orderSide={sale.orderSide} />
    </Td>
    <Td>
      <AddressBadge addr={sale.from} />
    </Td>
    <Td>
      <AddressBadge addr={sale.to} />
    </Td>
    <Td>
      <Platform source={sale.fillSource} addr={token.contract} nftId={token.tokenId} />
    </Td>
    <Td>
      <Link isExternal href={'https://etherscan.io/tx/' + sale.txHash}>{when}</Link>
    </Td>
  </Tr>
}

const ImageFallback = () => {
  return <Flex justify="center" align="center" boxSize="14" rounded="lg" bg={useColorModeValue("blackAlpha.50","whiteAlpha.100")} >?</Flex>
}

const EthLogo = ({orderSide}) => {
  return <Box display="inline" ml="0.5">
    <Icon 
      mb="-0.5" 
      color={orderSide === "ask" ? null : "#f72585"} 
      as={FaEthereum} 
    />
  </Box>
}