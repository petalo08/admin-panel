import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiContacts } from "react-icons/ti";
import { FiMail } from "react-icons/fi";
import {
  MdEventBusy,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { FaUserCircle, FaDigitalTachograph } from "react-icons/fa";
import { RiUserLine } from "react-icons/ri";
import { FaPhotoVideo } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { AiOutlineDollarCircle } from "react-icons/ai";
import BaseLayout from "../layout/BaseLayout";

const SidebarCard = ({ name, href, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={href}
      className={`flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="text-4xl mb-2" />
      <span className="text-base">{name}</span>
    </a>
  );
};

const SidebarCards = () => {
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
      name: "Events",
      href: "/events",
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

  return (
    <BaseLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sidebarItems.map((item, index) => (
          <SidebarCard key={index} {...item} />
        ))}
      </div>
    </BaseLayout>
  );
};

export default SidebarCards;

// export async function getServerSideProps(ctx) {
//   const { req, res } = ctx;
//   const token = req.cookies.authToken;
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   const user = JSON.parse(req.cookies.user);
//   if (user.role === "user") {
//     return {
//       redirect: {
//         destination: `/`,
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }
