import React from 'react'
import Layout from '../components/Layout'

function events() {
    return (
        <Layout>events</Layout>
    )
}

export default events

export async function getServerSideProps(ctx) {
    const { req, res } = ctx;
    const token = req.cookies.authToken;
    const user = JSON.parse(req.cookies.user)
    console.log(user)
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
                destination: "/",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}