import React from 'react'
// import "./showeErh.css"
import pdf from "./pdf.png"
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export default function ShoweERH() {
    const raysDir = "http://localhost/backend/upload/rays/";
    const medicineDir =
        "http://localhost/backend/upload/medicine/";
    const analysisDir =
        "http://localhost/backend/upload/analysis/";
    const [erh, setErh] = useState([]);
    const [rays, setRays] = useState([]);
    const [medicine, setMedicine] = useState([]);
    const [analysis, setAnalysis] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user"))[0]

    async function getData(id) {
        const url = `http://localhost/backend/api/get_erh.php?id=${id}`
        let { data } = await axios.get(url);
        setErh(data.data.ehr)
        setRays(data.data.rays)
        setMedicine(data.data.medicine)
        setAnalysis(data.data.analysis)
    }
    useEffect(() => {
        getData(userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <section id='showeErh'>
                <div className="container mt-5 py-3 px-4">
                    <h3 className='text-center mt-2 h1'>الحالة الصحية </h3>
                    <div className="row g-1">
                        {erh.map((data, key) => (
                            <div className="col-12  p-2" key={key}>
                                <h5>الحالة : {data.health_status}</h5>
                                <h5 > المستشفى التى أجر بها الفحص : {data.hospitalName}</h5>
                                <h5>الدكتور المسؤل عن  الحالة  :{data.doctor} </h5>
                                <h5>تاريخ الاضافة  :{data.add_at} </h5>
                            </div>
                        ))}
                    </div>
                    <hr className='text-primary' />
                    <h3 className='text-center mt-2 h1'>الاشــــعـــــــة</h3>
                    <div className="row g-1">
                        {rays.map((data, key) => (
                            <div className="col-lg-4 col-md-6 col-12 shadow pdf-box p-2" key={key}>
                                <a href={`${raysDir}${data.rays}`} download={data.title}>
                                    <i className="fa-solid fa-download text-primary"></i>
                                </a>
                                <img src={pdf} className='col-4 mx-auto d-block' alt={data.tilte} />
                                <h4 className="text-center ">  {data.tilte}  </h4>
                                <h3 className="py-1"><span>الدكتور : </span> {data.doctor}</h3>
                                <h6 className="py-1"><span>المستشفى : </span> {data.hospitalName}</h6>
                                <div className="d-flex align-items-center justify-content-between px-4 py-2">
                                    <span className="h6">{data.add_at}</span>
                                    <span className="h6">{(data.size / (1024 * 1024)).toFixed(2)}MB</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className='text-primary' />
                    <h3 className='text-center mt-2 h1'>الادوية </h3>
                    <div className="row g-1">
                        {medicine.map((data, key) => (
                            <div className="col-lg-4 col-md-6 col-12 shadow pdf-box p-2" key={key}>
                                <a href={`${medicineDir}${data.medicine}`} download={data.title}>
                                    <i className="fa-solid fa-download text-primary"></i>
                                </a>
                                <img src={pdf} className='col-4 mx-auto d-block' alt={data.title} />
                                <h4 className="text-center ">  {data.title}  </h4>
                                <h3 className="py-1"><span>الدكتور : </span> {data.doctor}</h3>
                                <h6 className="py-1"><span>المستشفى : </span> {data.hospitalName}</h6>
                                <div className="d-flex align-items-center justify-content-between px-4 py-2">
                                    <span className="h6">{data.add_at}</span>
                                    <span className="h6">{(data.size / (1024 * 1024)).toFixed(2)}MB</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr className='text-primary' />
                    <h3 className='text-center mt-2 h1'>التحاليل </h3>
                    <div className="row g-1">
                        {analysis.map((data, key) => (
                            <div className="col-lg-4 col-md-6 col-12 shadow pdf-box p-2" key={key}>
                                <a href={`${analysisDir}${data.analysis}`} download={data.title}>
                                    <i className="fa-solid fa-download text-primary"></i>
                                </a>
                                <img src={pdf} className='col-4 mx-auto d-block' alt={data.title} />
                                <h4 className="text-center ">  {data.title}  </h4>
                                <h3 className="py-1"><span>الدكتور : </span> {data.doctor}</h3>
                                <h6 className="py-1"><span>المستشفى : </span> {data.hospitalName}</h6>
                                <div className="d-flex align-items-center justify-content-between px-4 py-2">
                                    <span className="h6">{data.add_at}</span>
                                    <span className="h6">{(data.size / (1024 * 1024)).toFixed(2)}MB</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
