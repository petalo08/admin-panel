import React from 'react'
import AdminUsersTable from '../components/pages/admin/AdminUsersTable'
import BaseLayout from '../layout/BaseLayout'

function admin() {
    return (
        <BaseLayout>
            <div></div>
            <AdminUsersTable />
        </BaseLayout>
    )
}

export default admin