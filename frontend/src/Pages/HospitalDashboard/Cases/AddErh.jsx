import React, { useEffect, useState } from "react";
import Rays from "./ERh/Rays";
import Analysis from "./ERh/Analysis";
import Medicine from "./ERh/Medicine";
import HealthStatus from "./ERh/HealthStatus";
import axios from "axios";

export default function AddErh() {
  const [user, setUser] = useState([]);
  async function getUser(id) {
    const url = `http://localhost/backend/api/getUserBooking.php?id=${id}`
    let { data } = await axios.get(url)
    setUser(data.data)
  }
  useEffect(() => {
    const hospitalID = JSON.parse(localStorage.getItem("user"))[0]
    getUser(hospitalID)
  }, [])


  return (
    <>
      <section id="adderh">
        <div className="container p-4">
          <div className="row g-3 justify-content-center">
            <div className="col-lg-6 col-12 px-3 my-4">
              <div className="w-100">
                <Rays users={user} />
              </div>
            </div>
            <div className="col-lg-6 col-12 px-3 my-4">
              <div className="w-100">
                <Analysis users={user} />
              </div>
            </div>
            <div className="col-lg-6 col-12 px-3 my-4">
              <div className="w-100">
                <Medicine users={user} />
              </div>
            </div>
            <div className="col-lg-6 col-12 px-3 my-4">
              <div className="w-100">
                <HealthStatus users={user} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
