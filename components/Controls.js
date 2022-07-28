import { 
  useColorModeValue,
  Tooltip,
  Box,
  IconButton,
  HStack,
  Icon,
  Button
} from '@chakra-ui/react'
import { RepeatIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { FilterDrawer } from './FilterDrawer'


export const Controls = ({getSales, loading, isInitialLoad, setCollectionFilters, collectionFilters, setContinuation}) => {
  return <Box 
    rounded="lg" 
    py={4} 
    bg={useColorModeValue("white", "#020202")} 
    pos="sticky" 
    top="0" 
    zIndex={10}
  >
    <HStack>
      <Button
        colorScheme="purple"
        variant="outline"
        rightIcon={<ArrowUpIcon />}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
          });
        }}
        aria-label='Back to top' 
      >
        top
      </Button>

      <Button
        colorScheme="purple"
        variant="outline"
        rightIcon={<RepeatIcon />}
        onClick={() => {
          setContinuation()
          getSales({isRefresh: true})
        }}
        aria-label='Refresh' 
        isLoading={loading && !isInitialLoad}
        disabled={isInitialLoad}
      >
        refresh
      </Button>

      <FilterDrawer {...{setCollectionFilters, collectionFilters, setContinuation}} />
    </HStack>
  </Box>
}