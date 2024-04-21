import React from "react";
import Aos from "aos";
import HospitalWellcome from "./Component/HospitalWellcome";
import Header from "./Component/Header";
import IcuDesc from "./Component/IcuDesc";
import Toprate from "./Component/Toprate";
import Login from "./Component/Login";
import HospitalInSystem from "./Component/HospitalInSystem";
export default function Home({ userData }) {

  Aos.init();
  return (
    <>
      {/* ========================= Start Header */}
      {(userData !== null && userData[2] === "hospital") ? <HospitalWellcome userData={userData} />
        : <Header userData={userData} />
      }
      {/* ========================= End Header */}

      {/* ========================= Start Definition  */}
      {(userData !== null && userData[2] === "hospital") ? "" : <IcuDesc />}
      {/* ========================= End Definition */}

      {/* ========================= Start Most Rated  */}
      {(userData !== null && userData[2] === "hospital") ? "" : <Toprate />}

      {/* ========================= End Most Rated */}
      {/* ========================= Start Log in  */}
      {userData !== null ? " " : <Login />}
      {/* ========================= End Log in  */}

      {/* ========================= Start Total hospital  */}
      {(userData !== null && userData[2] === "hospital") ? "" : <HospitalInSystem />}
      {/* ========================= End Total hospital  */}
    </>
  );
}
