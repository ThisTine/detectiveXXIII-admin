// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useContext } from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import { MdNotificationsNone, MdInfoOutline } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import { userContext } from "layouts/admin/context/UserContextProvider";
export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const {user:{name},logout} = useContext(userContext)
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p='10px'
      borderRadius='30px'
      boxShadow={shadow}>
      <Flex
        display={secondary ? "flex" : "none"}
        borderRadius='30px'
        ms='auto'
        p='6px'
        align='center'
        me='6px'>
      </Flex>
      <SidebarResponsive routes={routes} />



      <Button
        variant='no-hover'
        bg='transparent'
        p='0px'
        minW='unset'
        minH='unset'
        h='18px'
        w='max-content'
        onClick={toggleColorMode}>
        <Icon
          me='10px'
          h='18px'
          w='18px'
          color={navbarIcon}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p='0px'>
          <Avatar
            _hover={{ cursor: "pointer" }}
            color='white'
            name={name}
            bg='#11047A'
            size='sm'
            w='40px'
            h='40px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'>
          <Flex w='100%' mb='0px'>
            <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}>
              👋&nbsp; Hey, {name}
            </Text>
          </Flex>
          <Flex flexDirection='column' p='10px'>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color='red.400'
              borderRadius='8px'
              px='14px' onClick={logout} >
              <Text fontSize='sm' >Log out</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
