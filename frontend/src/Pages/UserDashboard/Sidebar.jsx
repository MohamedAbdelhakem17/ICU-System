import React from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar({ logOut }) {
  return (
    <>
      <div className="sidebar">
        <ul className=" py-5 ">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to=""
            >
              <i className="fa-solid fa-user"></i>
              <h6>البيانات الاساسية </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="showeerh"
            >
              <i className="fa-solid fa-receipt"></i>
              <h6> السجل الالكترونى </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="userbook"
            >
              <i className="fa-solid fa-bookmark"></i>
              <h6> بيانات الحجز </h6>
            </NavLink>
          </li>
          <li className="nav-item item logout" onClick={logOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <h6>تسجيل خروج</h6>
          </li>
        </ul>
      </div>
    </>
  );
}
