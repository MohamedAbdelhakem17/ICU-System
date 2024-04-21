import React from 'react'
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


export default function HospitalDashboard({logOut}) {
  return (
    <>
    <section className="d-flex page justify-content-between">
        <Sidebar logOut={logOut}></Sidebar>
        <Outlet></Outlet>
    </section>
  </>
  )
}
