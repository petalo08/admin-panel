import React from "react";
import AdminUsersTable from "../components/pages/admin/AdminUsersTable";
import BaseLayout from "../layout/BaseLayout";
import AdminDetails from "../components/pages/admin/AdminDetails";

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
