import React from 'react'
import BaseLayout from '../layout/BaseLayout'
import { getAllSeo } from '../api/seo';
import PageCards from '../components/pages/seo/PageCards';
import AddSeoPage from '../components/pages/seo/AddSeoCard';

function seo(props) {
  console.log(props)
  const { seo } = props
  return (
    <BaseLayout>
      <AddSeoPage />
      <PageCards data={seo} />
    </BaseLayout>
  )
}

export default seo

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
  // if (user.role === "admin") {
  //   return {
  //     redirect: {
  //       destination: `/`,
  //       permanent: false,
  //     },
  //   };
  // }
  try {
    const res = await getAllSeo()
    if (res.status === 200) {
      return {
        props: {
          seo: res.data.data
        },
      };
    }
  }
  catch (err) {
    return {
      props: {
        seo: []
      },
    };
  }
}