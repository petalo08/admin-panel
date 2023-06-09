import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { useRouter } from "next/router";
import { Box, Stack, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { MdEventBusy, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import { FaUserCircle, FaDigitalTachograph } from 'react-icons/fa';
import { RiUserLine } from 'react-icons/ri';
import { FaPhotoVideo } from 'react-icons/fa';
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { AiOutlineDollarCircle } from 'react-icons/ai';
import { withCookies } from "react-cookie";

const sidebarItems = [
  {
    name: "Home",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Team Members",
    href: "/teammembers",
    icon: BsPeople,
  },
  {
    name: 'Events',
    href: '/events',
    icon: MdEventBusy,
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: TiContacts,
  },
  {
    name: "Awards & Media",
    href: "/awards",
    icon: FaPhotoVideo,
  },
  {
    name: "Commercials",
    href: "/commercials",
    icon: FaMoneyBillAlt,
  },
  {
    name: "Gallery",
    href: "/gallery",
    icon: FaRegImages,
  },
  {
    name: "SEO",
    href: "/seo",
    icon: FaDigitalTachograph,
  },
  {
    name: "Admin",
    href: "/admin",
    icon: FaUserCircle,
  },
  
  {
    name: "Payments",
    href: "/payments",
    icon: AiOutlineDollarCircle,
  },
];

const Sidebar = (props) => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  // Get user role from authentication
  // const user = JSON.parse(req.cookies.user);
  const user = {
    role: "superadmin"
  }
  
  const userRole = user ? user.role : null;

  //Filter sidebar items based on user role
  const filteredSidebarItems = sidebarItems.filter((item) => {
    if (userRole === "superadmin") {
      return true; // Show all items for superadmin
    } else if (userRole === "admin") {
      return item.name !== "Admin"; // Exclude "Admin" item for admin role
    } 
    return true;
  });

  return (
    <div className="sidebar__wrapper">
      <button className="collapsed__btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <Box
        position="sticky"
        top="0"
        left="0"
        w={isCollapsed ? "max-content" : ["max-content", "max-content", "15vw"]}
        h="100%"
        as="aside"
        className="sidebar"
        data-collapse={isCollapsed}
        sx={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
          },
        }}
      >
        <Stack
          bg={"#fff"}
          position={"sticky"}
          top={"0"}
          zIndex={"2"}
          mb={8}
          py={2}
          rounded={"md"}
          borderBottom={isCollapsed ? "none" : "1px solid #e5e5e5"}
          textAlign={"center"}
        >
          <Text>
            {isCollapsed ? "OP" : "Orchid Petal"}
          </Text>
        </Stack>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""
                    }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Box>
    </div>
  );
};

export default withCookies(Sidebar)


