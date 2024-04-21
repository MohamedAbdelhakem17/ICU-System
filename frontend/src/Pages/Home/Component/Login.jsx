import { useNavigate } from "react-router-dom";
import React from 'react'

export default function Login() {
    // Navigt To Login
    let navigateTo = useNavigate();
    function goToAdminLogin() {
        navigateTo("/loginforadmin");
    }
    function goTouserLogin() {
        navigateTo("/loginforuser");
    }
    function goToHospital() {
        navigateTo("/loginforhospital");
    }
    return (
        <>
            <section className="py-3" id="login">
                <div className="container">
                    <div className="title"  >
                        <h2 className="special-title" data-aos="zoom-in" data-aos-duration="1000">تسجيل الدخول</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1150"> مرحبا بك  </h3>
                    </div>
                    <div className="row login-select mt-5 g-3">
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="ineer" onClick={goToHospital} data-aos="fade-left" data-aos-offset="120" data-aos-duration="1000" data-aos-delay="50">
                                <div className="icon">
                                    <i className="fa-solid fa-hospital"></i>
                                </div>
                                <div className="text">
                                    <h3>المستشفى</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="ineer" onClick={goTouserLogin} data-aos="fade-up" data-aos-offset="120" data-aos-duration="1000" data-aos-delay="50">
                                <div className="icon">
                                    <i className="fa-solid fa-hospital-user"></i>
                                </div>
                                <div className="text">
                                    <h3>المريض</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="ineer" onClick={goToAdminLogin} data-aos="fade-rigth" data-aos-offset="120" data-aos-duration="1000" data-aos-delay="50">
                                <div className="icon">
                                    <i className="fa-solid fa-user-tie"></i>
                                </div>
                                <div className="text">
                                    <h3>المسؤل</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
