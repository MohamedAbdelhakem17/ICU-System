import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function AdminDashboard({ logOut }) {
  return (
    <>
      <section className="d-flex page justify-content-between">
          <Sidebar logOut={logOut}></Sidebar>
          <Outlet></Outlet>
      </section>
    </>
  );
}
