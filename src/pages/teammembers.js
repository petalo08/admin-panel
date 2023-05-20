import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import BaseLayout from "../layout/BaseLayout";
import Modal from "../components/Modal";
import { getAllTeamMembers } from "../api/teamMember";
import TeamTable from "../components/pages/teamMembers/TeamTable";
import { Button, Stack } from "@chakra-ui/react";
import { getSeoByPageName } from "../api/seo";
function TeamMembers(props) {
  const { teamMembers } = props;

  const [showMyModal, setShowMyModal] = useState(false);
  const handekOnClose = () => setShowMyModal(false);

  // const handleDeleteClick = (row) => {
  //   setData(data.filter((r) => r.sNo !== row.sNo));
  // };

  const handleEditClick = (row) => {
    // implement your edit functionality here
    console.log("Edit row: ", row);
  };

  return (
    <BaseLayout>
      <Stack
        direction="row"
        justify={"flex-end"}
        align={"center"}
        position={"sticky"}
        top={0}
        bg={"white"}
        px={4}
        py={2}
        rounded={"md"}
        zIndex={2}
        shadow={"md"}
      >
        <Button onClick={() => setShowMyModal(true)}>Add a member</Button>
      </Stack>
      <TeamTable data={teamMembers} />
      <div className="flex flex-col md:pl-40 lg:pl-52 xl:pl-60 h-full">
        <Modal onClose={handekOnClose} visible={showMyModal} />
      </div>
    </BaseLayout>
  );
}

export default TeamMembers;

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.authToken;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = JSON.parse(req.cookies.user);
  if (user.role == "user") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  try {
    const res = await getAllTeamMembers();
    // const seo = await getSeoByPageName("teammembers")
    if (res.status == 200) {
      return {
        props: {
          teamMembers: res.data.data,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        teamMembers: [],
      },
    };
  }
}
