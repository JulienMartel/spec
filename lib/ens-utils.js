import { gql, request } from 'graphql-request'
import { getWeb3 } from './../lib/getWeb3'

const web3 = getWeb3()

export const getEnsNameFromId = async nftId => {
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
    console.log("ens error")
    console.warn(err)
    return null
  }
}