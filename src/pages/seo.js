import React from 'react'
import BaseLayout from '../layout/BaseLayout'
import { getAllSeo } from '../api/seo';
import PageCards from '../components/pages/seo/PageCards';

function seo(props) {
  console.log(props)
  return (
    <BaseLayout>
      <PageCards data={props?.seo} />
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
  if (user.role === "user") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  try {
    const res = await getAllSeo()
    if (res.status === 200) {
      return {
        props: {
          seo: res.data
        },
      };
    }
  }
  catch (err) {
    console.log(err)
    return {
      props: {
        seo: []
      },
    };
  }
}