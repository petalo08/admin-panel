import { useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
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
    name: "Users",
    href: "/users",
    icon: RiUserLine,
  },
  {
    name: "Payments",
    href: "/payments",
    icon: AiOutlineDollarCircle,
  },
];

const Sidebar = (props) => {
  console.log(props);
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  // Get user role from authentication
  // const user = JSON.parse(req.cookies.user);
  // let { user } = props.cookies.cookies
  // user = JSON.parse(user);
  // const userRole = user ? user.role : null;

  // Filter sidebar items based on user role
  // const filteredSidebarItems = sidebarItems.filter((item) => {
  //   if (userRole === "superadmin") {
  //     return true; // Show all items for superadmin
  //   } else if (userRole === "admin") {
  //     return item.name !== "Admin"; // Exclude "Admin" item for admin role
  //   } else if (userRole === "user") {
  //     return !["Admin", "Users", "Payments"].includes(item.name); // Exclude "Admin", "Users", and "Payments" items for user role
  //   }
  //   return true;
  // });

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
        <Box
          as="div"
          w={"100%"}
          mb={12}
          pb={6}
          borderBottom={isCollapsed ? "none" : "1px solid #e5e5e5"}
          textAlign={"center"}
        >
          {isCollapsed ? "OP" : "Orchid Petal"}
        </Box>
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


