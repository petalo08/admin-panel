import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";

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
      <Stack p={2} m={2} align='flex-end' pos='sticky' top={0}>
        <Button onClick={() => setShowMyModal(true)}>
          Add a member
        </Button>
      </Stack>
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
  console.log(user)
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = JSON.parse(req.cookies.user)
  if (user.role == "user") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
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