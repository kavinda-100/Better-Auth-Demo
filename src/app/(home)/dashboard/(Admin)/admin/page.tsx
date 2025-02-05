import React from "react";
import UserTable from "./UserTable";
import { getSession } from "../../../../../server/session";

const AdminDashboardPage = async () => {
  const session = await getSession();
  return (
    <section
      className={
        "flex h-[calc(100vh-60px)] flex-col items-center justify-center"
      }
    >
      <h1 className={"text-4xl font-bold"}>Admin Dashboard</h1>
      <p className={"mt-4 text-lg"}>
        This is the admin dashboard page. You can manage users here.
      </p>
      <UserTable sessionId={session?.user?.id ?? ""} />
    </section>
  );
};
export default AdminDashboardPage;
