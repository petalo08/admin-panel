import React from "react";
import AdminUsersTable from "../components/pages/admin/AdminUsersTable";
import BaseLayout from "../layout/BaseLayout";
import AdminDetails from "../components/profile/ProfileDetails";

function admin() {
  return (
    <BaseLayout>
      <div>
        <AdminDetails />
        <AdminUsersTable />
      </div>
    </BaseLayout>
  );
}

export default admin;
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
