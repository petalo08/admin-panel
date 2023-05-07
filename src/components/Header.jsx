import { useRouter } from "next/router";
import { FiHome, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import { signout } from "../api/auth";

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
    <header className="bg-slate-500 container mx-auto 
    flex justify-between
     items-center px-5 py-2">
      <div className="flex items-center">
        <h3>Logo</h3>
      </div>
      <div className="flex items-center">
        <button className="px-3 py-3 rounded-md cursor-pointer hover:bg-yellow-100">
          <FiHome
            className="text-black  "
            size={24}
            onClick={() => router.push("/")}
          />
        </button>
        <button
          className="text-black px-3 py-2 rounded-md mr-2 hover:bg-yellow-100"
          onClick={handleLogout}
        >
          <FiLogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
