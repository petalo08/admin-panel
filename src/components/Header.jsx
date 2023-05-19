import { useRouter } from "next/router";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { signout } from "../api/auth";
import { RiProfileLine } from "react-icons/ri";

const Header = () => {
  const router = useRouter()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie, removeCookie] = useCookies(["authToken"])


  const handleLogout = async () => {
    try {
      setLoading(true)
      const token = cookie.authToken;
      let body = {
        token: token,
      };
      const res = await signout(body);
      if (res.data.status) {
        toast({
          title: "Logout",
          description: res.data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        })
        removeCookie("authToken", {
          path: "/",
          sameSite: true,
        })
        setLoading(false)
        router.push("/login")
      }
    } catch (err) {
      console.error(err)
      setLoading(false)
      return toast({
        title: "Error while logging out",
        description: err.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <header
      className="container mx-auto px-5 py-2 bg-[#e9fffb]
    flex justify-end items-center h-[5vh]">
      <div className="flex items-center gap-5">
        <button className=" p-1 rounded-md cursor-pointer hover:bg-yellow-100">
          <FiHome
            size={20}
            onClick={() => router.push("/")}
          />
        </button>
        <button
          className="p-1 rounded-md cursor-pointer hover:bg-yellow-100"
          onClick={() => router.push("/profile")}
        >
          <RiProfileLine size={20} />
        </button>
        <button
          className="p-1 rounded-md cursor-pointer hover:bg-yellow-100"
          onClick={handleLogout}>
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
