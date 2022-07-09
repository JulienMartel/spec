import { useColorMode, IconButton, Box } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const ChangeColorMode = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return <Box>
    <IconButton
      onClick={toggleColorMode} 
      aria-label='Search database' 
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />} 
    />
  </Box>
}

export default ChangeColorMode