import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Toprate() {
    const imgDir = "http://localhost/backend/upload/icuImg/"
    const [icu, setIcu] = useState([])
    async function getData() {
        const url = `http://localhost/backend/api/get-icu-toprate.php`
        let { data } = await axios.get(url)
        setIcu(data.data)
    }
    useEffect(() => {
        getData()
    }, [icu])
    return (
        <>
            <section className="py-3" id="topRate">
                <div className="container">
                    <div className="title"  >
                        <h2 className="special-title" data-aos="zoom-in" data-aos-duration="1000">ألاعلى تقييماً</h2>
                        <h3 data-aos="fade-up" data-aos-duration="1150"> نوصى به  </h3>
                    </div>
                    <div className="row g-0 mt-4 justify-content-center">
                        {icu.map((icu, key) => (
                            <div className="col-lg-4 col-md-6 col-12" key={key} data-aos="fade-up" data-aos-duration="1000">
                                <div className="p-3">
                                    <div className="pic rounded text-white">
                                        <img src={`${imgDir}${icu.img_name.split("|", 2)[1]}`} alt={icu.specialization} />
                                        <div className="info">
                                            <h3>تخصص العناية</h3>
                                            <h4>{icu.specialization}</h4>
                                            <p>
                                                {(icu.avg_rating) === "1" ? <i className="fa-solid fa-star fa-1x text-primary"></i>
                                                    : (icu.avg_rating) === "2" ? <><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i></>
                                                        : (icu.avg_rating) === "3" ? <><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i></>
                                                            : (icu.avg_rating) === "4" ? <><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i></>
                                                                : (icu.avg_rating) === "5" ? <><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i><i className="fa-solid fa-star fa-1x text-primary"></i></> : ""
                                                }
                                            </p>
                                            <p>{icu.price} جنية </p>
                                            <Link className="btn btn-outline-primary py-2 px-5 col-5  text-light" to={`/icuinfo/${icu.icu_code}`}>
                                                تــصــفــح
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

