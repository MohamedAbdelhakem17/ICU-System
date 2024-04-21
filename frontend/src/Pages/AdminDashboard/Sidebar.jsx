import React from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar({ logOut }) {
  return (
    <>
      <div className="sidebar">
        <ul className=" py-5 px-0 " >
          <li className="nav-item mb-4 ">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to=""
            >
              <i className="fa-regular fa-hospital"></i>
              <h6>أضافة مستشفى</h6>
            </NavLink>
          </li>
          <li className="nav-item mb-4">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="addads"
            >
              <i className="fa-solid fa-rectangle-ad"></i>
              <h6>أضافة أعلان</h6>
            </NavLink>
          </li>
          <li className="nav-item mb-4">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="hosprequest"
            >
              <i className="fa-solid fa-spinner"></i>
              <h6 >المستشفيات </h6>
            </NavLink>
          </li>
          <li className="nav-item mb-4">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="adsviwe"
            >
              <i className="fa-solid fa-rectangle-ad"></i>
              <h6 >الاعــلانــات  </h6>
            </NavLink>
          </li>
          <li className="nav-item item logout" onClick={logOut}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <h6> تسجيل الخروج</h6>
          </li>
        </ul>
      </div>
    </>
  );
}
