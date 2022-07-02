import Web3 from 'web3'
import erc721abi from '../../IERC721abi.json'


// let options = {
//   // filter: {
//   //     value: ['1000', '1337']    //Only get events where transfer value was 1000 or 1337
//   // },
//   fromBlock: "15035476",                  //Number || "earliest" || "pending" || "latest"
//   toBlock: "latest"
// };



export default async function handler(req, res)  {
  //get the contract address from the request
  const { tokenURI } = req.query

  const result = await fetch(tokenURI)
  const json = await result.json()

  res.status(200).json({ json })

}
