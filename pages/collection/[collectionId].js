import { 
  Box
} from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { Container } from "../../components/Container";

const Collection = () => {
  const router = useRouter()
  const { collectionId } = router.query

  return <Container>
    {collectionId}
  </Container>
}

export default Collection;