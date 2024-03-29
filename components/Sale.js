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
  Skeleton,
} from '@chakra-ui/react'
import { FaEthereum } from 'react-icons/fa'
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime'
import { AddressBadge } from './AddressBadge'
import { Platform } from './Platform'
import NextLink from 'next/link'
import { useAppContext } from '../context/state'
import { useEffect, useState } from 'react'
import { optimizeImage } from '../utils'

import { useContractRead, useContractReads } from 'wagmi'
import { digestDstorageLink } from '../utils'
import { EthLogo } from './EthLogo'


dayjs.extend(relativeTime)

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const GetContractName = ({addr}) => {
  
  if (!addr) {
    return <Text as="i">unknown collection</Text>
  }

  const { data, isError, isLoading } = useContractRead({
    addressOrName: addr,
    contractInterface: ABIs.name,
    functionName: 'name',
  })
  
  if (isError) {
    return <Text as="i">unknown collection</Text>
  }
  
  if (isLoading) {
    return <Skeleton>the collection name</Skeleton>
  }
  
  console.log(data)
  return data
}

const contractTypes = {
  ERC721: "0x5b5e139f",
  ERC1155: "0xd9b67a26"
}

const ABIs = {
  name : ["function name() view returns (string)"],
  ERC721 : ["function tokenURI(uint256 _tokenId) external view returns (string)",],
  ERC1155 : ["function uri(uint256 _id) external view returns (string)"],
  ERC165 : ["function supportsInterface(bytes4 interfaceID) view returns (bool)"]
}

const useGetContractType = ({token}) => {
  if (token.name && token.image) return {}

  const [contractType, setContractType] = useState()

  const contract = {
    addressOrName: token.contract,
    contractInterface: ABIs.ERC165,
    functionName: 'supportsInterface',
  }

  const { data, isError, isLoading, error } = useContractReads({
    contracts: [
      {
        ...contract,
        args: [contractTypes.ERC721],
      },
      {
        ...contract,
        args: [contractTypes.ERC1155],
      },
    ]

  })


  useEffect(() => {
    if (data) {
      const [isErc721, isErc1155] = data
      if (isErc721) {
        setContractType("ERC721")
      } else if (isErc1155) {
        setContractType("ERC1155")
      } else {
        console.warn("Unknown contract type: " + token.contract)
      }
    }
  }, [data])


  return { contractType }
}

const ImageAndName = ({token, amount}) => {
  const [name, setName] = useState(token.name)
  const [image, setImage] = useState(token.image)

  const { contractType } = useGetContractType({token})

  return <Flex>
    { contractType && 
        <GetMetadata 
          contract={token.contract} 
          tokenId={token.tokenId} 
          contractName={token.collection.name}
          quantity={Number(amount)}
          {...{contractType, setImage, setName, image, name}} 
        />
    }

    <DisplayImage image={image} />

    <Box ml="2">
      <NextLink href={'/collection/' + token.contract} passHref>
        <Link w="min-content" >
          <Heading mb="1" size="xs">
            {token.collection.name || <GetContractName addr={token.contract}/>}
          </Heading>
        </Link>
      </NextLink>

      <DisplayTokenName name={name} />
    </Box>
  </Flex>
}

const DisplayImage = ({image}) => {

  if (image) {
    return <Image boxSize="14" src={optimizeImage(image, 64)} fallback={<ImageFallback />} rounded="md" />
  } else {
    return <Skeleton boxSize="14" rounded="md" />
  }
}

const DisplayTokenName = ({name}) => {
  if (name) {
    return <Text textOverflow="ellipsis" maxW="60" overflow="hidden">{name}</Text>
  }
  return <Skeleton>token namey</Skeleton>
}

const GetMetadata = ({contract, tokenId, setImage, setName, contractType, contractName, image, name, quantity}) => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: contract,
    contractInterface: ABIs[contractType],
    functionName: contractType === "ERC1155" ? 'uri' : 'tokenURI', // TODO
    args: [tokenId],
  })


  useEffect(() => {
    if (data) {
      const getMetadata = async () => {
        const res = await fetch("/api/metadata?uri=" + encodeURI(data), {timeout: 4000}) // do a trytcatch here
        const {name: newName, image: newImage} = await res.json()

        name || image && console.log(name, image)

        let quantityDislpay = quantity === 1 ? "" : ` (x${quantity})`

        if (!name) {
          newName ? setName(newName + quantityDislpay) : setName(contractName + " #" + tokenId + quantityDislpay)
        }
        if (!image) {
          newImage ? setImage(digestDstorageLink(newImage)) : setImage("")
        }
      }
      getMetadata()
    }
  }, [data])

  return <></>

}

export const Sale = ({sale}) => {
  const { token, amount } = sale

  if (!token) {
    return null
  }
  if (token.contract === "0x495f947276749ce646f68ac8c248420045cb7b5e") { // OpenSea Shared Storefront
    return null
  }

  const { ethPrice } = useAppContext()

  return <Tr
    transition="background-color 0.2s"
    _hover={{ backgroundColor: useColorModeValue('blackAlpha.50', 'whiteAlpha.100') }}
  >

    <Td>
      <ImageAndName {...{token, amount}} />
    </Td>
    <Td isNumeric w="min-content">
      <Box>
        <EthLogo orderSide={sale.orderSide} />
        <Text ml="1" fontWeight="medium" display="inline" >
          {sale.price}
        </Text>
      </Box>
      <Skeleton isLoaded={ethPrice}>
        <Text fontWeight="medium" fontSize="smaller" color={useColorModeValue("blackAlpha.700", "whiteAlpha.600")}>
          {formatter.format(sale.price * ethPrice)}
        </Text>
      </Skeleton>

    </Td>
    <Td>
      <AddressBadge addr={sale.from} />
    </Td>
    <Td>
      <AddressBadge addr={sale.to} />
    </Td>
    <Td>
      <Platform source={sale.fillSource || sale.orderSource} addr={token.contract} nftId={token.tokenId} />
    </Td>
    <Td>
      <Link isExternal href={'https://etherscan.io/tx/' + sale.txHash}>
        {dayjs.unix(sale.timestamp).fromNow()}
      </Link>
    </Td>
  </Tr>
}

const ImageFallback = () => {
  return <Flex justify="center" align="center" boxSize="14" rounded="lg" bg={useColorModeValue("blackAlpha.50","whiteAlpha.100")} >?</Flex>
}