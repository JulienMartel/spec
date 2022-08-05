// https://chakra-templates.dev/navigation/sidebar

import React from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tag,
  Heading,
  Show,
  Button,
  Stack,
  DrawerFooter,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { MdDynamicFeed, MdLeaderboard } from 'react-icons/md';
import { AiFillEye } from 'react-icons/ai';
import { BsBriefcaseFill } from 'react-icons/bs';
import NextLink from 'next/link';
import ChangeColorMode from './ChangeColorMode';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import { Socials } from '../pages';


const linkItems = [
  { name: 'Sale feed', icon: MdDynamicFeed, href: '/sales' },
  { name: 'Top', icon: MdLeaderboard, href: '/top' },
  { name: 'Watchlists', icon: AiFillEye, href: '/watchlists' },
  { name: 'Portfolio', icon: BsBriefcaseFill, href: '/portfolio' },
  // { name: 'Become Pro', icon: AiFillEye, href: '/watchlists' },
  // { name: 'Settings', icon: FiSettings, href: '/settings' },
];

export const SidebarWithHeader = ({children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'blackAlpha.700')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>

      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', '#020202')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>

      <Flex flexDir="column" justify="space-between" w="full" h="full">

        <Box w="full" h="full">
          <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
            <Logo />
            <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
          </Flex>

          {linkItems.map((link) => (
          <NavItem key={link.name} href={link.href} icon={link.icon}>
            {link.name}
          </NavItem>
          ))}
        </Box>

        <Socials m="8" />
      </Flex>

    </Box>
  );
};

const Logo = () => {
  return <Flex align="flex-end" h="min" >
    <NextLink href="/" passHref>
      <Link _hover={{textDecoration: "none"}} >
        <Heading size="xl" mr={3} >
          ◌ spec
        </Heading>
      </Link>
    </NextLink>

    <Tag size="sm" colorScheme='purple'>alpha</Tag>
  </Flex>
}

const NavItem = ({ href, icon, children, ...rest }) => {
  const { pathname } = useRouter()

  return <NextLink href={href} passHref>
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        transition="outline-color 0.2s ease-in-out"
        outline="1px solid"
        outlineColor="transparent"
        _hover={{
          outlineColor: useColorModeValue("purple.500", "purple.200")
          // color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            color={pathname === href ? useColorModeValue("purple.500", "purple.200") : null}
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  </NextLink>
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'blackAlpha.700')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '3' }}>
        <Button colorScheme="purple" variant="link" >
          unlock premium
        </Button>
        
        <ChangeColorMode />

        <IconButton
          // size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        
        <Box>
          <ConnectButton 
            label='connect'
            showBalance={false}
            accountStatus="address"
          />
        </Box>
          

      </HStack>
    </Flex>
  );
};