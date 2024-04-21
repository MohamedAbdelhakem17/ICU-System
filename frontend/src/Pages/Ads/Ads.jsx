import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import adsImg from "./5149654.jpg";

export default function Ads() {
  const [ads, setAds] = useState([]);
  // Get ADS Function
  async function getAds() {
    let { data } = await axios("http://localhost/backend/api/get-ads-info.php");
    setAds(data.data);
  }
  useEffect(() => {
    getAds();
  }, []);
  return (
    <>
      <section id="ads">
        <div className="container mt-4">
          <div className="row pt-5  g-3 justify-content-center">
            {ads.map((icu, key) => (
              <div className="col-lg-6 col-12 " key={key} >
                <div className="rounded-2 position-relative border border-primary shadow align-items-center h-100">
                  <div>
                  <div className=" p-2 align-items-start ads">
                    <h5 className="py-3">أســم الـمـسـتـشـفـى :{icu.hosoital_name}</h5>
                    <p className=" h6 py-1 w-100"> <span className="h5">الـعـنـوان : </span> {icu.address}</p>
                    <p className="py-1 w-100  text-center h4 text-primary"> الاعـــــــــــــــــــــــــــــــــــــــــــــــــلان</p>
                    <p className=" h6 py-1 w-100 text"> {icu.info}</p>
                  </div>
                </div>
                  <img src={adsImg} alt={icu.hospital_name}  />
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
