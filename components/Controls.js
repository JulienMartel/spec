import { 
  useColorModeValue,
  Tooltip,
  Box,
  IconButton,
  Stack,
} from '@chakra-ui/react'
import { RepeatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { FilterDrawer } from './FilterDrawer'


export const Controls = ({getSales, loading, isInitialLoad, setCollectionFilters, collectionFilters, setContinuation}) => {
  return <Stack 
    zIndex="99" 
    position="fixed" 
    p={3} 
    m={3} 
    bottom={0} 
    right={0} 
    w="min" 
    bg={useColorModeValue("#f7f7f7", "#0f0f0f")} 
    rounded="lg" 
  >
    <Tooltip placement='left' label="back to top">
      <Box>
        <IconButton
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth' // for smoothly scrolling
            });
          }}
          aria-label='Back to top' 
          icon={<ArrowUpIcon />}
          size="lg"
        />
      </Box>
    </Tooltip>
    <Tooltip placement='left' label="refresh">
      <Box>
        <IconButton
          onClick={() => {
            setContinuation()
            getSales()
          }}
          aria-label='Refresh' 
          icon={<RepeatIcon />}
          size="lg"
          isLoading={loading && !isInitialLoad}
          disabled={isInitialLoad}
        />
      </Box>
    </Tooltip>
    <Tooltip placement='left' label="filter">
      <Box>
        <FilterDrawer {...{setCollectionFilters, collectionFilters, setContinuation}} />
      </Box>
    </Tooltip>
  </Stack>
}