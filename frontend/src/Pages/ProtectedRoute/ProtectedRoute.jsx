import React from "react";
// import Home from "../Home/Home";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import HospitalDashboard from "../HospitalDashboard/HospitalDashboard";
import { Navigate } from "react-router-dom";
import UserDashboard from "../UserDashboard/UserDashboard";

export default function ProtectedRoute({ userData , logOut }) {

  if (userData !== null) {
    // return children;
    if (userData[2] === "admin") {
      return <AdminDashboard logOut={logOut}/>;
    } else if (userData[2] === "hospital") {
      return <HospitalDashboard logOut={logOut}/>;
    } else if (userData[2] === "user") {
      return <UserDashboard logOut={logOut}/>;
    }
  } else {
    return <  Navigate to="/" />;
  }
}
