import { 
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
  Input,
  useDisclosure,
  IconButton,
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Avatar,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
  useColorModeValue,
  Portal,
  useOutsideClick,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react'
import { FaFilter } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'
import featured from './../featured.json'


export const FilterDrawer = ({setCollectionFilters, collectionFilters, setContinuation}) => {
  const btnRef = useRef()
  const [collections, setCollections] = useState(collectionFilters)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      setContinuation()
      setCollections([])
    },
    onOpen: () => setCollections(collectionFilters),
  })

  const handleClick = () => {
    setCollectionFilters(collections)
    onClose()
  }

  const clearFilters = () => {
    setCollectionFilters([])
    onClose()
  }

  const addToFilter = info => {
    if (collections.length >= 5) {
      return toast({
        title: "You can only filter 5 collections at once",
        status: "warning",
        duration: 5000,
        isClosable: true
      })
    }

    setCollections(c => {
      // if the collection is not already in the list of filters, add it
      if (c.findIndex(c => c.name === info.name) === -1) {
        return [...c, info]
      } else {
        return c
      }
    })
  }


  return <>
    <IconButton
      onClick={onOpen}
      aria-label='Filter' 
      icon={<FaFilter />}
      size="lg"
      ref={btnRef}
      colorScheme={collectionFilters.length > 0 ? "purple" : null}
    />

    <Drawer
      isOpen={isOpen}
      size="md"
      placement='left'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg={useColorModeValue("#f7f7f7","#0f0f0f")}>
        <DrawerCloseButton />
        <DrawerHeader>filter by collection</DrawerHeader>

        <DrawerBody>
          <VStack align="flex-start" spacing="6">
            <SearchBar {...{addToFilter}} />

            <Box 
              w="full"
              minH="20"
              p="4"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.100")}
              rounded="md"
              border="2px dashed"
              borderColor={useColorModeValue("blackAlpha.300", "#3f3f3f")}
            >
              {collections.map(({collectionId, name}) => 
                <Tag
                  key={collectionId}
                  m="1"
                  borderRadius='full'
                  // variant='solid'
                  colorScheme='purple'
                >
                  <TagLabel>{name}</TagLabel>
                  <TagCloseButton onClick={() => {
                    setCollections(c => c.filter(c2 => c2.collectionId !== collectionId))
                  }} />
                </Tag>
              )}
            </Box>

            <VStack w="full" align="flex-start">
              <Heading size="md">
                featured
              </Heading>
              
              <FeaturedCollections {...{addToFilter}} />

            </VStack>

          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={clearFilters}>
            clear filters
          </Button>
          <Button onClick={handleClick} colorScheme='purple'>apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
}

const SearchBar = ({addToFilter}) => {
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [debounceTimeout, setDebounceTimeout] = useState(null)
  useEffect(() => {
    if (search.length >= 3) {
      clearTimeout(debounceTimeout) // debounce the search
      setDebounceTimeout(setTimeout(() => {
        getResults(search)
      }, 500))
    }
  }, [search])

  const getResults = async search => {
    setLoading(true)
    const response = await fetch(`https://api.reservoir.tools/search/collections/v1?name=${search}&limit=10`)
    const {collections} = await response.json()
    setResults(collections)
    console.log(collections)
    setLoading(false)
  }

  return <Box position="relative" w="full">
    <Input
      value={search}
      onChange={e => setSearch(e.target.value)}
      colorScheme="purple" 
      placeholder='Search for collection or paste contract address' 
    />
    {search.length > 0 && <SearchResults {...{search, results, loading, addToFilter, setSearch, setResults}} />}
  </Box>
}

const SearchResults = ({search, results, loading, addToFilter, setSearch, setResults}) => {
  const ref = useRef()
  const [showResults, setShowResults] = useState(true)

  useEffect(() => {
    setShowResults(true)
  }, [search])

  useOutsideClick({
    ref: ref,
    handler: () => setShowResults(false),
  })

  if (!showResults) return null
  
  return <Box 
    ref={ref} 
    w="full" 
    pos="absolute" 
    zIndex="99" 
    bg={useColorModeValue("white", "black")}
    shadow={useColorModeValue("lg", "dark-lg")}
    // border="1px solid"
    // borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
  >
    { loading ?
      <Flex justify="center" w="full">
        <Spinner size="lg" my="16" /> 
      </Flex>
      : 
       (
        results.length === 0 && search.length >= 3 ? 
          <Text p="4">No results found</Text>
          :
          <Box>
            {results.map(c =>
              <Flex 
                key={c.collectionId}
                align="center"
                justify={"space-between"}
                _hover={{cursor: "pointer", bg: useColorModeValue("blackAlpha.50", "whiteAlpha.50")}}
                transition="background-color 0.2s"
                p={3}
                border="2px solid"
                borderBottom="none"
                borderColor={useColorModeValue("blackAlpha.200", "whiteAlpha.300")}
                _last={{borderBottomStyle: "solid", borderBottomWidth: "2px"}}
                onClick={() => {
                  addToFilter(c)
                  setSearch("")
                  setResults([])
                }}
              >
                <Flex align="center">
                  <Avatar size="sm" src={c.image} mr="4" />
                  <Text>{c.name}</Text>
                </Flex>

                <Text color="gray.400">
                  {c.contract.substring(0,8)}...
                </Text>
              </Flex>
            )
            }
          </Box>
       )
    }
  </Box>
}

const FeaturedCollections = ({addToFilter}) => {
  return <>
    {featured.map(info => <Button 
      key={info.collectionId}
      variant="ghost"
      w="full"
      p={3}
      border="1px solid"
      borderColor="whiteAlpha.100"
      justifyContent="flex-start"
      height="fit-content"
      onClick={() => addToFilter(info)}
    >
      <Avatar size="sm" src={info.image} mr="4" />
      <Text>{info.name}</Text>
    </Button>)}
  </>
}
