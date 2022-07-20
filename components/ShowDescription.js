import { 
  Box, 
  Text,
} from "@chakra-ui/react";
import { marked } from 'marked';
import { useState } from "react";

export const ShowDescription = ({desc}) => {
  const [show, setShow] = useState(false)

  if (!desc) return null

  return <>
    <Box
      maxW="70%"
      mt="8"
      maxH={show ? "unset" : "6"}
      dangerouslySetInnerHTML={{__html: marked(desc)}} 
      sx={{"a": {color: "blue.500"}, "p": {marginBottom: "1rem"}}}
      overflow="hidden"
      textOverflow="ellipsis"
    />
    <Text 
      display="inline"
      mt="2" 
      onClick={() => setShow(!show)} 
      cursor="pointer"
      fontSize="smaller"
      fontWeight="medium"
    >
      see {show ? "less" : "more"}
    </Text>
  </>
}