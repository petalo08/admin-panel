import React from 'react'
import BaseLayout from '../layout/BaseLayout';

function commercials() {
  return (
    <BaseLayout>commercials</BaseLayout>
  )
}

export default commercials

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.authToken;
  const user = JSON.parse(req.cookies.user)
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  if (user.role == "user") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}