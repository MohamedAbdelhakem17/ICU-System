import { Link } from "react-router-dom";
import React from 'react'

export default function HospitalWellcome({ userData }) {
  return (
    <>
      <section className='w-100'>
        <div className=" d-flex flex-column justify-content-center align-items-center h-container">
          <h3 className="text-center h-name">  <span>مرحبا</span> {userData[1]}</h3>
          <Link
            className="navbar-link h-icon"
            to="/hospital"
          >
            <i className="fa-solid fa-user-gear"></i>
            <h3>الذهاب الى لوحة التحكم</h3>
          </Link>
        </div>
      </section>
    </>
  )
}
