import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function ICU() {
  const imgDir = "http://localhost/backend/upload/icuImg/"
  const [icu, setIcu] = useState([]);
  const [query, setQuery] = useState("")
  // Get ADS Function
  async function getIcu() {
    let { data } = await axios("http://localhost/backend/api/get-icu-count.php");
    setIcu(data.data);
  }
  useEffect(() => {
    getIcu();
  }, [icu]);
  return (
    <>
      <section className="py-3" id="icu">
        <div className="container mt-5 py-3">
          <div className="col-11 mx-auto text-center pt-2">
            <input type="search" className="form-control" id="search" placeholder="بحث عن عناية مركزة" onInput={e => setQuery(e.target.value)} />
          </div>
          <div className="row pt-5 g-4 justify-content-center">
            {icu.filter(oneIcu => oneIcu.specialization.includes(query)).map((oneIcu, key) => (
              <div className=" col-lg-6 col-12  px-4" key={key} >
                <div className="row rounded-2 border border-primary shadow h-100" >
                  <div className="col-6 p-0 text-center h-100">
                    <div className=" text h-100 px-2 d-flex justify-content-around flex-column">
                      <h5 className="py-3">{oneIcu.hospitalName}</h5>
                      <p className=" h6 py-1"> <span className="h5">تـخـصـص الـعـنـايـة :</span>  {oneIcu.specialization}</p>
                      <Link to={`/icuinfo/${oneIcu.icu_code}`}>
                        <button className="btn btn-primary py-2 px-5 fw-bold col-12 text-center  my-2 text-light">تــصــفــح </button>
                      </Link>
                    </div>
                  </div>
                  <div className="col-6 p-0 m-0 img">
                    <img src={`${imgDir}${oneIcu.img_name.split("|", 2)[1]}`} alt={icu.hospital_name} className="w-100 h-100" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

