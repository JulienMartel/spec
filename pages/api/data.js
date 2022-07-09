import abi from './../../abi.json'
import erc721abi from './../../IERC721abi.json'
import { getEnsNameFromId } from '../../lib/ens-utils'
import { getWeb3 } from '../../lib/getWeb3'

const web3 = getWeb3()
const seaport = new web3.eth.Contract(abi, "0x00000000006c3852cbEf3e08E8dF289169EdE581") // seaport

export default async function handler(req, res) {  
  const { blocks } = req.query

  const { digestedResult, blockTimestamps } = await getPastEvents(blocks)

  res.json({ digestedResult, blockTimestamps })
}


const getPastEvents = async (blocks=3) => {
  const currentBlockNumber = await web3.eth.getBlockNumber()

  let options = { fromBlock: currentBlockNumber - blocks }
  
  const result = await seaport.getPastEvents("OrderFulfilled", options)
  
  return digestEvents(result)
}


const digestEvents = async events => {

  //get timestamps for each block
  const blockTimestamps = {}
  const uniqueBlocks = [...new Set(events.map(e => e.blockNumber))]

  uniqueBlocks.forEach(async blockNumber => {
    const block = await web3.eth.getBlock(blockNumber)
    blockTimestamps[blockNumber] = block.timestamp
  })
  
  //get other data for each event
  const digestedResult = await Promise.all(events.map(
    event => digestEvent(event, blockTimestamps)
  ))
  return { 
    digestedResult: digestedResult.filter(x => x !== null), 
    blockTimestamps 
  }
}

const digestEvent = async (event) => {
  const { returnValues, transactionHash, blockNumber, transactionIndex } = event

  // filtering out 0 eth sales cause that glitch
  const { returnValues: { offer, consideration} } = event
  if (!offer.length && !consideration.length) return null

  //find out who initiated transaction (if its an accepted bid)
  const isAcceptedOffer = offer.findIndex(x => x.itemType === '1') !== -1

  const whereNftIs = isAcceptedOffer ? "consideration" : "offer"
  const wherePaymentIs = isAcceptedOffer ? "offer" : "consideration"

  // if (returnValues[whereNftIs][0] === undefined) {
  //   console.log("weird glitch under")
  //   console.log(transactionHash, returnValues)
  // }

  const contractAddr = returnValues[whereNftIs][0].token

  // if (contractAddr === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2") { //weth
  //   console.log("----------------weth------------------")
  //   console.log(returnValues)
  //   console.log("----------------weth------------------")

  // }

  const nftId = returnValues[whereNftIs][0].identifier

  const { contractName, contractType, tokenName } = await getInfo(contractAddr, nftId)

  if (contractType === null && contractName === null) {
    return null
  }

  const { recipient, offerer } = returnValues

  return {
    buyer: isAcceptedOffer ?  offerer : recipient,
    seller: isAcceptedOffer ? recipient : offerer,
    nftId,
    contractAddr,
    purchasePriceEth: web3.utils.fromWei(returnValues[wherePaymentIs] 
      .reduce((prev, curr) => prev + Number(curr.amount), 0).toString()),
    tx: transactionHash,
    contractName,
    blockNumber,
    txIndex: transactionIndex,
    paymentToken: returnValues[wherePaymentIs][0]?.token,
    tokenName,
    contractType,
    orderHash: returnValues.orderHash,
  }
}

const getInfo = async (contractAddr, nftId) => {
  if (contractAddr === "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85") { // ENS
    const tokenName = await getEnsNameFromId(nftId)
    return { contractName: "ENS", contractType: "ENS", tokenName }
  }
  try {
    const nftContract = new web3.eth.Contract(erc721abi, contractAddr)
  
    const namePromise = nftContract.methods.name().call()
    const erc721Promise = nftContract.methods.supportsInterface(contractTypes.ERC721).call()
    const erc1155Promise = nftContract.methods.supportsInterface(contractTypes.ERC1155).call()
  
    const [contractName, erc721, erc1155] = await Promise.all([namePromise, erc721Promise, erc1155Promise])
  
    const contractType = erc721 ? "ERC721" : erc1155 ? "ERC1155" : null
  
    return { contractName, contractType }

  } catch (e) {
    console.log("error: maybe proxy: " + contractAddr)
    // console.warn(e)
    return { contractName: null, contractType: null }
  }
}

const contractTypes = {
  ERC721: "0x5b5e139f",
  ERC1155: "0xd9b67a26"
}
