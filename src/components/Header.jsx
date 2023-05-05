import { useRouter } from "next/router";
import { FiHome, FiLogOut } from "react-icons/fi";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // logout logic
  };

  return (
    <header className="bg-sky-100 ">
      <div className="container mx-auto flex justify-between items-center px-4 py-2 md:pl-40 lg:pl-52 xl:pl-60 ">
        <div className="flex items-center">
        <h1>Logo</h1>
         
        </div>
        <div className="flex items-center">
        <button className="  px-3 py-3 rounded-md cursor-pointer hover:bg-yellow-100">
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
          {/* <button
            className="text-black px-3 py-2 rounded-md hover:bg-yellow-100"
            onClick={handleLogout}
          >
            Logout
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
