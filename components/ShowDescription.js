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
      sx={{"a": {color: "blue.500"}, "p": {marginBottom: "1rem", "&:last-child": {marginBottom: "0"}}}}
      overflow="hidden"
      textOverflow="ellipsis"
      overflowWrap="break-word"
    />
    <Text 
      display="inline"
      onClick={() => setShow(!show)} 
      cursor="pointer"
      fontSize="smaller"
      fontWeight="medium"
    >
      see {show ? "less" : "more"}
    </Text>
  </>
}