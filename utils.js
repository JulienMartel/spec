// https://github.com/reservoirprotocol/marketplace/blob/main/lib/optmizeImage.ts
export const optimizeImage = (imageHref, width) => {
  if (!imageHref) return ''

  let url = new URL(imageHref)
  // Optimize google images
  if (url.host === 'lh3.googleusercontent.com') {
    if (imageHref.includes('=s') || imageHref.includes('=w')) {
      let newImage = imageHref.split('=')
      return `${newImage[0]}=w${width}`
    }
    return `${imageHref}=w${width}`
  }
  return imageHref
}

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