/* eslint-disable jsx-a11y/iframe-has-title */
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./HospitalInfo.css";
import Aos from "aos";
import icuImg from "./icu.jpg";
export default function HospitalInfo() {
  let { id } = useParams();
  // Get Hospital Function
  const [hospital, sethospital] = useState("");
  const [icus, seticu] = useState([]);
  const [location, setlocation] = useState([]);
  async function getHospital() {
    let { data } = await axios(
      `http://localhost/backend/api/get-hospital-info.php?id=${id}`
    );
    sethospital(data.data["0"]);
    seticu(data.data["icu"]);
  }
  async function getlocation() {
    let { data } = await axios.get(
      `https://www.mapquestapi.com/geocoding/v1/batch?key=LVx0ofRcC1O7muCEyMU7Tt9tH0NvQH92&location=${encodeURI(hospital.address)}`
    );
    setlocation(data["results"][0]["locations"][0]["latLng"]);
  }
  useEffect(() => {
    getHospital();
    getlocation()
  }, [icus , hospital]);
  Aos.init();
  return (
    <>
      <section className="hosp-info vh-100">
        <div className="name h-50">
          <div className="bg-black bg-opacity-75 w-100 h-100 d-flex align-items-center justify-content-center p-3 flex-column ">
            <h2 data-aos="zoom-in" data-aos-duration="1500" className="text-center">
              { hospital.name}
            </h2>
            <p data-aos="fade-down" data-aos-duration="1500">
              { hospital.address}
            </p>
          </div>
        </div>
        <div className="container-fluid px-4 pt-5">
          <div className="row py-4 g-4 justify-content-center ">
            {icus.map((icu, key) => (
              <div
                className="col-lg-4 col-md-6  col-12"
                key={key}
                data-aos="fade-left"
                data-aos-duration="500"
                data-aos-delay="500"
              >
                <div className="text-center shadow rounded-2  d-flex align-items-center justify-content-center">
                  <div className="text col-5">
                    <h3> الـتـخـصـص <span className="py-3 h5 d-block">{icu.specialization}</span></h3>
                    <h3>
                      عـدد الأَسِرَّة
                      <span className="py-3 h5 d-block">{icu.number_of_beds}</span>
                    </h3>
                    <Link to={`/icuinfo/${icu.icu_code}`}>
                      <button className="btn btn-primary px-5 py-2"> تـــصـــفــح</button>
                    </Link>
                  </div>
                  <div className="img col-7">
                    <img
                      src={icuImg}
                      alt={icu.specialization}
                      className="w-100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {
          (location.length === 0) ? " " : <iframe src={`https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es;z=8&output=embed`} width="100%" height="300px" />
        }
      </section>
    </>
  );
}
