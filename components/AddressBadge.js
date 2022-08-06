import { 
  Text,
  Badge,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'
import { useEnsName } from 'wagmi'

export const AddressBadge = ({addr}) => {
  const { data, isError, isLoading } = useEnsName({
    address: addr,
  })

  if (isLoading) return <MyBadge addr={addr}/>
  if (isError) return <MyBadge addr={addr}/>
  return <MyBadge name={data} addr={addr}/>
  
  
}

const MyBadge = ({name, addr}) => {
  const hex = hexColorFromAddr(addr)

  return <Tooltip label={<Text fontSize="xs">{name || addr}</Text>}>
    <Badge 
      bg={hex + "39"}
    >
      {name || addr.slice(2,9) + "..."}
    </Badge>
  </Tooltip>
}

const hexColorFromAddr = (addr) => {
  return "#" + addr.substring(2, 8)
}