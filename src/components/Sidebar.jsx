import { Disclosure } from '@headlessui/react'
import React, {useState} from 'react'
import {GiHamburgerMenu} from "react-icons/gi"
import {GiArrowDunk} from "react-icons/gi"
import { FaHome, FaUser, FaEnvelope, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';





function Sidebar() {
    const [showContacts, setShowContacts] = useState(false);
    const [activePage, setActivePage] = useState('Home')
    const toggleContacts = () => {
        setShowContacts(!showContacts);
      };

      const sidebarItems = [
        { id: 1, icon:null, name: 'Team Members', link: '/teammembers' },
        { id: 2, icon:null, name: 'Gallery', link: '/gallery' },
        { id: 3, icon:null, name: 'HeroSection', link: '/hero' },
        { id: 4, icon:null, name: 'Payments', link: '/payments' },
        
        {
            id: 5,
            name: 'Contacts',
            link: '/contacts',
            icon: showContacts ? <FaAngleUp /> : <FaAngleDown />,
            subItems: [
              { id: 4, name: 'Email', link: '/contacts/email' },
              { id: 5, name: 'Phone', link: '/contacts/phone' },
            ],
          },
          { id: 6, icon:null, name: 'Admin', link: '/admin' },
          { id: 7, icon:null, name: 'Users', link: '/nearby' },
          { id: 8, icon:null, name: 'Awards & Media', link: '/prime' },
          { id: 9, icon:null, name: 'Commercials', link: '/commercials' },
      ];

      const router = useRouter();

      const handleSetActivePage = (page) => {
        setActivePage(page);
        };
      

  return (
    <div>
       <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 left-40 inline-flex items center peer justify-center rounded-md p-2 text-gray-900 hover:text-white hover:bg-gray-900  ">
          <GiHamburgerMenu className="block md:hidden f-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className="p-6 sm:w-1/3 md:w-1/5  h-screen bg-lime-200 z-20 fixed top-0 -left-full md:left-0  peer-focus:left-0 peer:transition ease-out delay-150 duration-200 ">
        <button
              
              className="  rounded-full hover:text-red-500 border border-gray-500 hover:border-red-500 text-gray-500 absolute top-1 right-1 md:hidden"
            >
              <AiOutlineClose />
            </button>
          <div className="flex flex-col justify-start items-center">
            <h1 className="text-base text-center cursor-pointer font bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              My dashboard
              
              </h1>
            <div className="my-6">
              <ul>
                {sidebarItems.map(item => (
                  <li key={item.id} className="">
                    <Link href={item.link} className={`hover:bg-gray-900 rounded-md ease-in block px-4 py-2 text-gray-800 hover:text-white flex justify-between items-center  ${router.pathname === item.link ? 'bg-gray-100 text-gray-900' : ''}`}
  onClick={() => { 
    handleSetActivePage(item.link);  item.subItems && toggleContacts() }}>
                      
                      
                      
                      
                      <span>{item.name}</span>
                      {item.icon}
                    </Link>
      {item.subItems && showContacts && (
        <ul className="pl-6">
          {item.subItems.map((subItem) => (
            <li key={subItem.id} className="hover:bg-blue-500">
              <Link href={subItem.link}
                 className="block px-4 py-2 text-gray-800 hover:text-white">{subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ul>


            
         </div>
        </div>
        </div>

        </Disclosure>
    </div>

  )
}

export default Sidebar