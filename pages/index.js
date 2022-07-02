import { useEffect, useState } from 'react';
import Web3 from 'web3'
import { Logo } from '../components/Logo'

import abi from './../abi.json'
import erc721abi from './../IERC721abi.json'
import { request, gql } from 'graphql-request'
import { 
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from '@chakra-ui/react'


const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/777900eade6e4665ad8095d6b3365eac"))
const web3ws = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/777900eade6e4665ad8095d6b3365eac"))
const seaport = new web3ws.eth.Contract(abi, "0x00000000006c3852cbEf3e08E8dF289169EdE581")



const getInfo = async (contractAddr, nftId) => {
  if (contractAddr === "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85") {
    return { contractName: "ENS", tokenURI: null }
  }

  const nftContract = new web3.eth.Contract(erc721abi, contractAddr)

  const contractNamePromise = nftContract.methods.name().call().catch(err => {console.warn(contractAddr); throw err}) // fix up
  const tokenURIPromise = nftContract.methods.tokenURI(nftId).call().catch(err => {console.warn(contractAddr); throw err}) // fix up

  const [contractName, tokenURI] = await Promise.all([contractNamePromise, tokenURIPromise])

  return { contractName, tokenURI }
}

const getFullTokenName = async (contractName, nftId, contractAddr) => {
  if (contractAddr === "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85") { // ens
    // https://docs.ens.domains/dapp-developer-guide/ens-as-nft#deriving-ens-name-from-tokenid
    const labelHash = web3.utils.numberToHex(nftId)

    const url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
    const GET_LABEL_NAME = gql`
    query{
      domains(first:1, where:{labelhash:"${labelHash}"}){
        labelName
      }
    }`

    try {
      const data = await request(url, GET_LABEL_NAME)
      return data.domains[0].labelName + ".eth"
    } catch (err) {
      console.warn(err)
    }
  }

  return `${contractName} #${nftId}` // normal
}

const hexColorFromAddr = (addr) => {
  return "#" + addr.substring(2, 8)
}


export default function Home() {
  const [data, setData] = useState([])

  const OrderFulfilled = async event => {
    // console.log(event)

    const order = event.returnValues
    const txId = event.transactionHash

    // filtering out 0 eth sales cause that glitch
    if (!order.offer.length && !order.consideration.length) return 

    const buyer = order.recipient
    const seller = order.offerer

    const contractAddr = order.offer[0].token
    const nftId = order.offer[0].identifier

    const purchasePriceWei = order.consideration 
      .reduce((prev, curr) => prev + Number(curr.amount), 0)

    const purchasePriceEth = web3.utils.fromWei(purchasePriceWei.toString())

    //find the contract name and tokenuri
    const { contractName, tokenURI } = await getInfo(contractAddr, nftId)

    //get token metadata
    if (contractName !== "ENS") {
      const result = await fetch(`/api/metadata?tokenURI=${encodeURI(tokenURI)}`)
      const metadata = await result.json()
      console.log(metadata)
      
      // IM HERE, finish this and then refactor everything
      
    }
    const fullTokenName = await getFullTokenName(contractName, nftId, contractAddr)

    setData(data => [{ buyer, seller, nftId, contractAddr, purchasePriceEth, txId, contractName, fullTokenName }, ...data])
  }

  useEffect(() => {
    const getPastEvents = async () => {
      const currentBlockNumber = await web3.eth.getBlockNumber()
      let options = {
        // filter: {
        //     value: [],
        // },
        fromBlock: currentBlockNumber - 1
      }
      
      const result = await seaport.getPastEvents("OrderFulfilled", options)
      console.log(result)
      
      //HERE IS WHERE I NEED TO DIGEST THE EVENTS
      // digestEvents(result)
    }
    getPastEvents()
    // .events.OrderFulfilled(options)
    //   .on('data', event => OrderFulfilled(event))
    //   .on('changed', changed => console.log("changed:", changed)) // TODO
    //   .on('error', err => {throw err})
    //   .on('connected', str => console.log("connected:", str))
  }, [])

  return <Container maxW="container.xl" display="flex" flexDir="column" justifyContent="center">
    <Box display="flex" justifyContent="center" alignItems="center" >
      <Logo />
      <Heading py="16" size="2xl" >
        hydrant
      </Heading>
    </Box>

    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            <Th>Buyer</Th>
            <Th>Seller</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((item, index) => 
              <Tr key={index}
                transition="background-color 0.2s"
                _hover={{ backgroundColor: '#2D3748' }}
              >
                <Td><a href={'https://etherscan.io/tx/' + item.txId} target="_blank">
                  {item.fullTokenName}
                </a></Td>
                <Td isNumeric>{item.purchasePriceEth} ETH</Td>
                <Td mixBlendMode="exclusion" filter="sepia(0.5)" color={hexColorFromAddr(item.buyer)}>{item.buyer.slice(0,9)}...</Td>
                <Td mixBlendMode="exclusion" filter="sepia(0.5)" color={hexColorFromAddr(item.seller)}>{item.seller.slice(0,9)}...</Td>
              </Tr>
            )
          }
        </Tbody>
      </Table>
    </TableContainer>

  </Container>
}

const digestEvents = (events) => {

}