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

// https://stackoverflow.com/questions/2685911/is-there-a-way-to-round-numbers-into-a-reader-friendly-format-e-g-1-1k
export const abbrNum = (number, decPlaces=0) => {

  if (number < 1000 && number > 100) {
    number = number?.toFixed(0)
  }
  if (number < 100 && number > 1) {
    number = number?.toFixed(2)
  }
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10,decPlaces);

  // Enumerate number abbreviations
  var abbrev = [ "k", "m", "b", "t" ];

  // Go through the array backwards, so we do the largest first
  for (var i=abbrev.length-1; i>=0; i--) {

    // Convert array index to "1000", "1000000", etc
    var size = Math.pow(10,(i+1)*3);

    // If the number is bigger or equal do the abbreviation
    if(size <= number) {
        // Here, we multiply by decPlaces, round, and then divide by decPlaces.
        // This gives us nice rounding to a particular decimal place.
        number = Math.round(number*decPlaces/size)/decPlaces;

        // Handle special case where we round up to the next abbreviation
        if((number == 1000) && (i < abbrev.length - 1)) {
          number = 1;
          i++;
        }

        // Add the letter for the abbreviation
        number += abbrev[i];

        // We are done... stop
        break;
    }
  }

  return number;
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