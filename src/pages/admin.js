import React from "react";
import AdminUsersTable from "../components/pages/admin/AdminUsersTable";
import BaseLayout from "../layout/BaseLayout";
import { getAllAdminUsers } from "../api/users";

function admin(props) {
  console.log(props);
  const { adminUsers } = props
  return (
    <BaseLayout>
      <AdminUsersTable data={adminUsers} />
    </BaseLayout>
  );
}

export default admin

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
    const res = await getAllAdminUsers();
    // const seo = await getSeoByPageName("teammembers")
    if (res.status == 200) {
      console.log(res.data);
      return {
        props: {
          adminUsers: res.data.data,
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        adminUsers: [],
      },
    };
  }
}
