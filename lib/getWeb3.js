import Web3 from 'web3'

let web3
export const getWeb3 = () => {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/777900eade6e4665ad8095d6b3365eac"))
  }

  return web3
}