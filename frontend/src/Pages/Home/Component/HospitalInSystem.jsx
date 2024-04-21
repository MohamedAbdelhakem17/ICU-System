import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import axios from "axios";
export default function HospitalInSystem() {
    const [hospital, sethospital] = useState([]);
    // Get Hospital Function
    async function getHospital() {
        let { data } = await axios(
            "http://localhost/backend/api/get-hospital-count.php"
        );
        sethospital(data.data);
    }
    useEffect(() => {
        getHospital();
    }, [hospital]);
    return (
        <>
            <section className="py-5" id="hospital">
                <div className="container">
                    <div className="title">
                        <h2 className="special-title" data-aos="zoom-in" data-aos-duration="1000">الـمـسـتـشـفيات المتاحة</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1150">  شــــــــــــــركــــــائــــــنــــــــا  </h3>
                    </div>
                    <div className="row py-2 gy-3 justify-content-center mt-3">
                        {hospital.map((icu, key) => (
                            <div className="col-lg-3 col-md-5 col-12" key={key}>
                                <Link to={`/hosoInfo/${icu.id}`} className="go-hosp">
                                    <div data-aos="fade-up" data-aos-offset="120" data-aos-duration="1000" data-aos-delay="50"
                                        className="inner p-3 text-center shadow rounded-2 border border-primary">
                                        <i className="fa-solid fa-hospital icon"></i>
                                        <h5 className="py-3">{icu.name}</h5>
                                        <p> {icu.address}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
