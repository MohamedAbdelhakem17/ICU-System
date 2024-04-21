import React from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar({ logOut }) {
  return (
    <>
      <div className="sidebar">
        <ul className=" py-2" >
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to=""
            >
              <i className="fa-regular fa-hospital"></i>
              <h6>أضافة عناية مركزة </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="icuviwe"
            >
              <i className="fa-solid fa-house-medical"></i>
              <h6 >العنايات المضافة  </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="addreh"
            >
              <i className="fa-solid fa-file-signature"></i>
              <h6>أضافة سجل ألكترونى  </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="viwepatients"
            >
              <i className="fa-solid fa-user-injured"></i>
              <h6>عرض  المرضى </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="booking"
            >
              <i className="fa-solid fa-bookmark"></i>
              <h6 >الحجوزات  </h6>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => (isActive ? "active item" : "item")}
              to="archives"
            >
              <i className="fa-solid fa-folder-open"></i>
              <h6 > الارشيف </h6>
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
