import React from "react";
import { getAllNormalUsers } from "../api/users";
import NormalUsersTable from "../components/pages/users/NormalUsersTable";
import BaseLayout from "../layout/BaseLayout";

function users(props) {
  const { normalUsers } = props
  return (
    <BaseLayout>
      <NormalUsersTable data={normalUsers} />
    </BaseLayout>
  )
}

export default users;

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
    const res = await getAllNormalUsers()
    // const seo = await getSeoByPageName("teammembers")
    if (res.status == 200) {
      console.log(res.data);
      return {
        props: {
          normalUsers: res.data.data,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        normalUsers: [],
      },
    };
  }
}
