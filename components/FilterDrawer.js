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
  useColorModeValue
} from '@chakra-ui/react'
import { FaFilter } from 'react-icons/fa'
import { useEffect, useRef, useState } from 'react'


export const FilterDrawer = ({setCollectionFilters, collectionFilters}) => {
  const btnRef = useRef()
  const [collections, setCollections] = useState(collectionFilters)
  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => setCollections([]),
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
            <Box w="full">
              <Input colorScheme="purple" disabled placeholder='Search for collection or paste contract address' />
              <Text as="i" color="gray">COMING SOON</Text>
            </Box>

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

const featured = [
  {
    "collectionId": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "name": "Bored Ape Yacht Club",
    "contract": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "image": "https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s120"
  },
  {
    "collectionId": "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42",
    "name": "Forgotten Runes Wizards Cult",
    "contract": "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42",
    "image": "https://lh3.googleusercontent.com/rfEd3YcRfS8Hk8YcZjD20Vrqu8XTazvnzklVN9pUcROrwhoLO8RbP0yiBQuemgGPpWMgEDGU7qO164x42GRn60Xv6aeFbdZkttzBjx8=s120"
  },
  {
    "collectionId": "0x1a92f7381b9f03921564a437210bb9396471050c",
    "name": "Cool Cats NFT",
    "contract": "0x1a92f7381b9f03921564a437210bb9396471050c",
    "image": "https://lh3.googleusercontent.com/LIov33kogXOK4XZd2ESj29sqm_Hww5JSdO7AFn5wjt8xgnJJ0UpNV9yITqxra3s_LMEW1AnnrgOVB_hDpjJRA1uF4skI5Sdi_9rULi8=s120"
  },
  {
    "collectionId": "0x86c10d10eca1fca9daf87a279abccabe0063f247",
    "name": "Cool Pets NFT",
    "contract": "0x86c10d10eca1fca9daf87a279abccabe0063f247",
    "image": "https://lh3.googleusercontent.com/dNMaqYrBRTBWeTQOJsKg0IedkMSS_SB37x1ivbcydSWur1Pv3_sETgQYQdeCgp8Iv4gTT60xz8pnWkfAJF7HwHibOfB94wT5l2WJ2Q=s120"
  },
  {
    "collectionId": "0x1d20a51f088492a0f1c57f047a9e30c9ab5c07ea",
    "name": "Wassies by Wassies",
    "contract": "0x1d20a51f088492a0f1c57f047a9e30c9ab5c07ea",
    "image": "https://lh3.googleusercontent.com/ju6vDR0sbEvqT0bAb4QPEzYMzpReEllDZ5MlICtxqJu76G5UrZ0cT-w6X3Mzf9e8KXZXJGNIyXGDRAoL-qlaApiJsj27ZdbOY5VvCA=s120"
  },
  {
    "collectionId": "0x9fdb31f8ce3cb8400c7ccb2299492f2a498330a4",
    "name": "The Colors (thecolors.art)",
    "contract": "0x9fdb31f8ce3cb8400c7ccb2299492f2a498330a4",
    "image": "https://lh3.googleusercontent.com/5h5aZjA2Uw9FkTDMIHUqP8ev0xf1OZDIIyxB_iOc1KIac2-0mIvrZyzcyRdLc0AjXs09_HLeDexttgBNsvrcZ4r6bKDV-A4Gt-VLBg=s120"
  },
  {
    "collectionId": "0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd",
    "name": "tubby cats",
    "contract": "0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd",
    "image": "https://lh3.googleusercontent.com/TyPJi06xkDXOWeK4wYBCIskRcSJpmtVfVcJbuxNXDVsC39IC_Ls5taMlxpZPYMoUtlPH7YkQ4my1nwUGDIB5C01r97TPlYhkolk-TA=s120"
  },
  {
    "collectionId": "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6",
    "name": "CrypToadz by GREMPLIN",
    "contract": "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6",
    "image": "https://lh3.googleusercontent.com/iofetZEyiEIGcNyJKpbOafb_efJyeo7QOYnTog8qcQJhqoBU-Vu9l3lXidZhXOAdu6dj4fzWW6BZDU5vLseC-K03rMMu-_j2LvwcbHo=s120"
  },
  {
    "collectionId": "0x23581767a106ae21c074b2276d25e5c3e136a68b",
    "name": "Moonbirds",
    "contract": "0x23581767a106ae21c074b2276d25e5c3e136a68b",
    "image": "https://lh3.googleusercontent.com/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75=s120"
  },
]