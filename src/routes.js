import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdOutlineBuild,
  MdHome,
  MdLock,
  MdQrCode2,
  MdOutlineEmojiEvents
} from "react-icons/md";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Users from "views/admin/Users";
import Event from "views/admin/event";
import Codes from "views/admin/codes";
import Config from "views/config";

const routes = [
  {
    name: "User",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Users,
    secondary: true,
  },
  {
    name: "Event",
    layout: "/admin",
    path: "/event",
    icon: (
      <Icon
        as={MdOutlineEmojiEvents}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Event,
    secondary: true,
  },
  {
    name: "Codes",
    layout: "/admin",
    icon: <Icon as={MdQrCode2} width='20px' height='20px' color='inherit' />,
    path: "/codes",
    component: Codes,
    secondary: true,

  },
  {
    name: "Config",
    layout: "/admin",
    path: "/config",
    icon: <Icon as={MdOutlineBuild} width='20px' height='20px' color='inherit' />,
    component: Config,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
];

export default routes;
