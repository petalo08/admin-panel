import React from 'react'
import ProfileDetails from "../components/profile/ProfileDetails";
import BaseLayout from "../layout/BaseLayout";
import {getCurrentUser} from "../api/auth"
const profile = (props) => {

const  {
  userData
  } = props

  return (
    <BaseLayout>
    <div>
      <ProfileDetails data = {userData}  />
    </div>
    </BaseLayout>
  )
}

export default profile

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
    const user = JSON.parse(req.cookies.user)
    if (user.role === "user") {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }

    try {
        // calling the API
        let body = {
            token : token
        }
        const res = await getCurrentUser(body)
        if (res.status === 200) {
          console.log(res.data.data)
            return {

            props: {
              userData: res.data.data
            }
          }
        }
      }
      catch (err) {
        console.log(err)
        return {
          props: {
            userData: null
          }
        }
       }
    return {
      props: {},
    };
  }





