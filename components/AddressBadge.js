import { 
  Text,
  Badge,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'

export const AddressBadge = ({addr}) => {
  const hex = hexColorFromAddr(addr)
  return <Tooltip label={<Text fontSize="xs">{addr}</Text>}>
    <Badge 
      bg={hex + "39"}
    >
      {addr.slice(2,9)}...
    </Badge>
  </Tooltip>
}

const hexColorFromAddr = (addr) => {
  return "#" + addr.substring(2, 8)
}