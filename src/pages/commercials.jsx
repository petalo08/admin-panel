import React from 'react'
import Layout from "../components/Layout"
function commercials() {
  return (
    <Layout>commercials</Layout>
  )
}

export default commercials

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.authToken;
  const user = req.cookies.user 
  
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // if(user.role == "user")
  // {
    
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
}