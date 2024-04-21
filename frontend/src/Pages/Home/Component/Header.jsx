import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-scroll';
export default function Header({ userData }) {
    // Navigt To Register
    let navigateTo = useNavigate();
    function goToRegister() {
        navigateTo("/register");
    }
    // Navigt To ICU
    function goToIcu() {
        navigateTo("/icu");
    }
    return (
        <>
            <section className="vh-100 d-flex justify-content-center align-items-center text-center" id="header">
                <div className="container">
                    <h1 className="title" data-aos="zoom-in" data-aos-duration="1000">
                        أحجز غرف العناية المركزة  من <br /> <span>ICU Booking</span>
                    </h1>
                    {userData !== null ? ""
                        : <div className="d-flex justify-content-evenly mx-auto my-2 link">
                            <Link className="btn btn-primary py-2 px-5 " to="login" smooth={true} duration={300} data-aos="fade-down-left" data-aos-duration="1150"> تسجيل الدخول </Link>
                            <button className="btn btn-primary py-2 px-5 " onClick={goToRegister} data-aos="fade-down-right" data-aos-duration="1150">
                                عــمــل حــســاب
                            </button>
                        </div>
                    }
                    <button className="btn btn-outline-primary py-2 px-5 w-25 my-2" onClick={goToIcu} data-aos="fade-down" data-aos-duration="1150">
                        تصفح
                    </button>
                </div>
            </section></>
    )
}
