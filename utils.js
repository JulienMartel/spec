export const digestDstorageLink = uri => {
  const protocol = uri.split(":")[0]
  let link
  switch (protocol) {
    case "ipfs":
      link = `https://ipfs.io/ipfs/${uri.split("://")[1]}`;
      break;
    case "ar":
      link = `http://arweave.net/${uri.split("://")[1]}`
      break;
    case "https":
      link = uri;
      break;
    case "data":
      link = uri;
    default:
      link = uri;
      break;
  }

  return link
}

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