import { 
  useColorModeValue,
  Tooltip,
  Box,
  Img,
} from '@chakra-ui/react'

export const Platform = ({source}) => {
  let src

  switch (source) {
    case "OpenSea":
      src = '/os.png'
      break;
    case "gem":
      src = '/gem.png'
      break;
    case "LooksRare":
      src = '/looksrare-dark.png'
      break; 
    case 'X2Y2':
      src = '/x2y2.png'
      break;
    case 'Foundation':
      src = useColorModeValue('/foundation-light.png', '/foundation-dark.png')
      break;
    case 'genie':
      src = '/genie.png'
      break;
  }

  return <Tooltip label={source} >
    <Box boxSize="5" rounded="full">
      {src ? <Img src={src}/> : source}
    </Box>
  </Tooltip>
}