import React, { useEffect } from "react";
import { RouterProvider, Navigate, createHashRouter } from "react-router-dom";
import { useState } from "react";
import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import Icu from "../Icu/Icu";
import Ads from "../Ads/Ads";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoginForUser from "../LoginForUser/LoginForUser";
import LoginForHospital from "../LoginForHospital/LoginForHospital";
import LoginForAdmin from "../LoginForAdmin/LoginForAdmin";
import Register from "../Register/Register";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AddAds from "../AdminDashboard/Cases/AddAds";
import AdsEdit from "../AdminDashboard/Cases/AdsEdit";
import PendingHospital from "../AdminDashboard/Cases/PendingHospital";
import AddHospital from "../AdminDashboard/Cases/AddHospital";
import AdsViwe from "../AdminDashboard/Cases/AdsViwe";
import UserDashboard from "../UserDashboard/UserDashboard";
import ShoweERH from "../UserDashboard/Cases/ShoweERH";
import HospitalInfo from "../HospitalInfo/HospitalInfo";
import HospitalDashboard from "../HospitalDashboard/HospitalDashboard";
import AddIcu from "../HospitalDashboard/Cases/AddIcu";
import AddErh from "../HospitalDashboard/Cases/AddErh";
import IcuInfo from "../IcuInfo/IcuInfo";
import Book from "../Booking/Booking";
import Booking from "../HospitalDashboard/Cases/Booking";
import ViwePatients from "../HospitalDashboard/Cases/ViwePatients";
import UserBook from "../UserDashboard/Cases/UserBook";
import Main from "../UserDashboard/Main";
import Archives from "../HospitalDashboard/Cases/Archives";
import IcuViwe from "../HospitalDashboard/Cases/IcuViwe";
export default function App() {
  // save User Data 
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      saveUserData();
    }
  }, [])

  const [userData, setUserData] = useState(null)
  function saveUserData() {
    let data = localStorage.getItem("user")
    let user = JSON.parse(data)
    setUserData(user)
  }
  // Log Out Function 
  function logOut() {
    localStorage.removeItem("user")
    setUserData(null)
    return <Navigate to="/" />
  }
  let routes = createHashRouter([
    {
      path: "",
      element: <MasterLayout userData={userData} />,
      children: [
        { index: true, element: <Home userData={userData} /> },
        { path: "icu", element: <Icu /> },
        { path: "ads", element: <Ads /> },
        { path: "loginforadmin", element: <LoginForAdmin saveUserData={saveUserData} /> },
        { path: "loginforhospital", element: <LoginForHospital saveUserData={saveUserData} /> },
        { path: "loginforuser", element: <LoginForUser saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "hosoInfo/:id", element: <HospitalInfo /> },
        { path: "icuinfo/:id", element: <IcuInfo /> },
        { path: "book", element: <Book /> },
        {
          path: "admin", element: <ProtectedRoute userData={userData} logOut={logOut}> <AdminDashboard /> </ProtectedRoute>, children: [
            { path: "addads", element: <AddAds /> },
            { path: "hosprequest", element: <PendingHospital /> },
            { index: true, element: <AddHospital /> },
            { path: "adsviwe", element: <AdsViwe /> },
            { path: "adsedit/:id", element: <AdsEdit /> },
          ]
        },
        {
          path: "user", element: <ProtectedRoute userData={userData} logOut={logOut}> <UserDashboard /> </ProtectedRoute>, children: [
            { index: true, element: <Main /> },
            { path: "userbook", element: <UserBook /> },
            { path: "showeerh", element: <ShoweERH /> },
          ]
        },
        {
          path: "hospital", element: <ProtectedRoute userData={userData} logOut={logOut}> <HospitalDashboard /> </ProtectedRoute>, children: [
            { index: true, element: <AddIcu /> },
            { path: "addreh", element: <AddErh /> },
            { path: "booking", element: <Booking /> },
            { path: "archives", element: <Archives /> },
            { path: "viwepatients", element: <ViwePatients /> },
            { path: "icuviwe", element: <IcuViwe /> },
          ]
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
