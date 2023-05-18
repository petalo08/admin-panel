import React from 'react'
import BaseLayout from '../layout/BaseLayout'
import ContactsTable from '../components/pages/contacts/ContactsTable'
import { getAllContacts } from '../api/contact'
function Contacts(props) {
  const { contacts } = props
  return (
    <BaseLayout>
      <ContactsTable data={contacts} />
    </BaseLayout>
  )
}

export default Contacts

//implementing server side rendering
export async function getServerSideProps(ctx) {
  const { req, res } = ctx
  // Authentication Logic
  const token = req.cookies.authToken
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  // Authorization Logic
  // const user = JSON.parse(req.cookies.user)
  // if (user.role !== "admin") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   }
  // }

  // Data Fecthing Logic
  try {
    // calling the API
    const res = await getAllContacts()
    if (res.status === 200) {
      return {
        props: {
          contacts: res.data.data
        }
      }
    }
  }
  catch (err) {
    console.log(err)
    return {
      props: {
        contacts: []
      }
    }
   }
  return {}
}