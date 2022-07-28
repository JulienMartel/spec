import { Box, Icon } from "@chakra-ui/react"
import { FaEthereum } from "react-icons/fa"

export const EthLogo = ({orderSide="ask", ...rest}) => {
  return <Box display="inline" {...rest}>
    <Icon 
      mb="-0.5" 
      color={orderSide === "ask" ? null : "#f72585"} 
      as={FaEthereum} 
    />
  </Box>
}