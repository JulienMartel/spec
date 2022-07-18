import { digestDstorageLink } from "../../utils"


export default async function handler(req, res) {
  const { uri } = req.query

  const metadata = await getTokenMetadata(decodeURI(uri))

  res.json(metadata)
}

const getTokenMetadata = async uri => {
  const link = digestDstorageLink(uri)
  
  try {
    const result = await fetch(link)
    const metadata = await result.json()

    console.log(metadata)
  
    const { image, name } = metadata
  
    return { image, name }  
    
  } catch (e) {
    console.log("failed to fetch metadata: " + link)
    // console.warn(e)
    return ({image: null, name: null})
  }

}