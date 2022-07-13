let ethPrice

setInterval(async () => {
  ethPrice = await getEthPrice()
}, 1000 * 60)

export default async function handler(_, res) {
  if (ethPrice) {
    return res.json({ ethPrice })
  } else { // on startup ?
    const ethPrice = await getEthPrice()
    res.json({ ethPrice })
  }
}

const getEthPrice = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
  const { ethereum } = await response.json()
  ethPrice = ethereum.usd
  return ethPrice
}