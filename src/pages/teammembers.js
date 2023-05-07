import React, { useState } from 'react'

import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";

import BaseLayout from "../layout/BaseLayout"
import Modal from '../components/Modal';
import { getAllTeamMembers } from '../api/teamMember';
import TeamTable from '../components/pages/teamMembers/TeamTable';
import { Button, Stack } from '@chakra-ui/react';
function TeamMembers(props) {
  const {
    teamMembers
  } = props
  console.log(teamMembers)

  const [showMyModal, setShowMyModal] = useState(false);
  const handekOnClose = () => setShowMyModal(false);



  const data = [
    { sNo: 1, name: "John", serviceName: "Service 1", date: "b-101" },
    { sNo: 2, name: "Mary", serviceName: "Service 2", date: "b-101" },
    { sNo: 3, name: "Bob", serviceName: "Service 3", date: "b-101" },
    { sNo: 4, name: "Alice", serviceName: "Service 4", date: "b-101" },
    { sNo: 5, name: "Jane", serviceName: "Service 5", date: "b-101" },
  ];



  // const handleDeleteClick = (row) => {
  //   setData(data.filter((r) => r.sNo !== row.sNo));
  // };

  const handleEditClick = (row) => {
    // implement your edit functionality here
    console.log("Edit row: ", row);
  };

  return (
    <BaseLayout>
      <Stack align='flex-end'>
        <Button onClick={() => setShowMyModal(true)}>
          Add a member
        </Button>
      </Stack>
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-20 py-3">
        <div className="flex flex-row justify-between gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full md:w-96 outline-1 bg-green-200 text-black focus:outline-black rounded-md tracking-wide"
          />
          <div className="bg-red-400 p-4 rounded-full cursor-pointer">
            <FaSearch className="text-white" />
          </div>
        </div>
        <div className='px-2 '>
        </div>
      </div>
      <TeamTable data={teamMembers} />
      <div className="flex flex-col md:pl-40 lg:pl-52 xl:pl-60 h-full">
        <Modal onClose={handekOnClose} visible={showMyModal} />
      </div>
    </BaseLayout >


  )
}

export default TeamMembers

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.authToken;
  const user = JSON.parse(req.cookies.user)
  console.log(user)
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // if (user.role == "user") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   }
  // }
  try {
    const res = await getAllTeamMembers()
    if (res.status == 200) {
      return {
        props: {
          teamMembers: res.data.data
        },
      };
    }
  }
  catch (err) {
    return {
      props: {
        teamMembers: []
      },
    };
  }
}