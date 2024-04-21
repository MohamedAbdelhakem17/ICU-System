import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ userData }) {
  function openNav() {
    let open = document.getElementsByClassName("open")[0]
    let close = document.getElementsByClassName("close")[0]
    let wrapper = document.getElementsByClassName("wrapper")[0]
    let navitem = document.querySelectorAll(".navitem")
    open.classList.toggle("active")
    close.classList.toggle("active")
    wrapper.classList.toggle("active")
    navitem.forEach(a => a.addEventListener("click", function () {
      close.classList.remove("active")
      wrapper.classList.remove("active")
      open.classList.add("active")
    }))
  }

  return (
    <>
      <nav id="navbar" className="navbar position-fixed top-0 end-0 w-100 ">
        <div className="container d-flex flex-row-reverse justify-content-between align-items-center py-1 position-relative" >
          <div className="logo d-flex flex-row-reverse justify-content-between align-items-center">
            {
              userData ? <>
                <Link
                  className="link d-flex flex-row-reverse align-items-center"
                  to={
                    userData[2] === "admin"
                      ? "/admin"
                      : userData[2] === "user"
                        ? "/user"
                        : userData[2] === "hospital"
                          ? "/hospital"
                          : " "
                  }
                >
                  <h3 className="user-text">مرحبا {userData[1]}</h3>
                  <i className="fa-solid fa-user-gear user-icon"></i>
                </Link>
              </>
                : <Link to="" >
                  <i className="fa-solid fa-bed-pulse"></i>
                  <span className="px-1 fw-bolder">ICU</span>
                </Link>
            }
          </div>
          <i className="fa-solid fa-bars fa-2x navbtn text-white active open" onClick={openNav} ></i>
          <i className="fa-solid fa-xmark fa-2x text-white navbtn close" onClick={openNav} ></i>
          <div className="wrapper d-md-flex justify-content-between align-items-center text-white">
            <div className="d-flex align-items-center navitem">
              <NavLink to="" className={({ isActive }) =>
                isActive ? "active link" : "link"
              }>
                <i className="fa-solid fa-home"></i>
                <span>الرئيسية</span>
              </NavLink>
            </div>
            <div className="d-flex align-items-center navitem">
              <NavLink to="icu" className={({ isActive }) =>
                isActive ? "active link" : "link"
              }>
                <i className="fa-solid fa-hospital"></i>
                <span>العنايات المركزة</span>
              </NavLink>
            </div>
            <div className="d-flex align-items-center navitem">
              <NavLink to="ads" className={({ isActive }) =>
                isActive ? "active link" : "link"
              }>
                <i className="fa-solid fa-newspaper"></i>
                <span>ماهو جديد .!</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
