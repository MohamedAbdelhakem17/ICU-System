import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";

export default function MasterLayout({ userData }) {
  const [loading, setLodaing] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLodaing(false);
    }, 1750);
  }, []);
  return (
    <>
      {loading ? (
        <RingLoader
          color="#09c"
          size={200}
          cssOverride={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50% , -50%)",
          }}
        />
      ) : (
        <div className="d-flex flex-column">
          {userData !== null ? ((userData[2] === "hospital") ? <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiar px-5 py-0 d-flex justify-content-center ">
            <div>
            <Link
              className="link h1 m-2 py-2 d-block"
              to="/"
            >
              الرئيسية
            </Link>
            </div>
          </nav> : <Navbar userData={userData}></Navbar>
          ) : (
            <Navbar userData={userData}></Navbar>
          )}
          <Outlet></Outlet>
        </div>
      )}
    </>
  );
}
