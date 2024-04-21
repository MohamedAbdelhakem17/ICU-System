import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
export default function UserDashboard({logOut}) {
  return (
    <>
    <section className="d-flex page">
        <Sidebar logOut={logOut}></Sidebar>
        <Outlet></Outlet>
    </section>
    </>
  );
}
