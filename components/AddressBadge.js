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
      filter={`brightness(${useColorModeValue("80%", "150%")})`} 
      color={hex} bg={hex + "33"}
    >
      {addr.slice(2,9)}...
    </Badge>
  </Tooltip>
}

const hexColorFromAddr = (addr) => {
  return "#" + addr.substring(2, 8)
}