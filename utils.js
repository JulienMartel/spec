const getTokenMetadata = async (tokenURI, contractAddr, nftId) => {
  const protocol = tokenURI.split(":")[0]
  let link
  switch (protocol) {
    case "ipfs":
      link = `https://ipfs.io/ipfs/${tokenURI.split("://")[1]}`;
      break;
    case "ar":
      link = `http://arweave.net/${tokenURI.split("://")[1]}`
      break;
    case "https":
      link = tokenURI;
      break;
    case "data":
      return { image: tokenURI, tokenName: null }
    default:
      link = tokenURI;
      break;
  }

  try {
    const result = await fetch(link)
    const metadata = await result.json()
  
    const { image, name } = metadata
  
    return { image, tokenName: name }  
    
  } catch (e) {
    console.log("failed to fetch metadata: " + contractAddr)
    // console.warn(e)
    return ({image: null, tokenName: null})
  }

}

///////////////////////////////////////////////////////////////////////////////

const getUri = (contractAddr, contractType, nftId) => {
  if (contractAddr == '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85') { //ens
    return null
  }
  try {
    switch (contractType) {
      case "ERC721":
        const erc721Contract = new web3.eth.Contract(erc721abi, contractAddr)
        return erc721Contract.methods.tokenURI(nftId).call()
      case "ERC1155":
        const erc1155Contract = new web3.eth.Contract(erc1155abi, contractAddr)
  
        return erc1155Contract.methods.uri(nftId).call()
      default:
        console.log("Unknown contract type: " + contractAddr)
        return null
    }
  } catch (e) {
    console.log("error while getting uri: " + contractAddr)
    // console.warn(e)
    return null
  }
}

///////////////////////////////////////////////////////////////////////////////

/*
{
  address
  blockHash
  blockNumber
  logIndex
  removed
  transactionHash
  transactionIndex
  id
  returnValues {
    orderHash
    offerer
    zone
    recipient
    offer [{
      itemType
      token
      identifier
      amount
    }]
    consieration [{
      itemType (0=eth,1=ERC20,2=ERC721,3=ERC1155)
    }]

  }
  event
  signature

}


*/

///////////////////////////////////////////////////////////////////////////////

