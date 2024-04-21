import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function AddHospital() {
  const adminCode = JSON.parse(localStorage.getItem("user"))[0]
  const [spin, setSpin] = useState(false)
  const [hospital, setfinfo] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    add_by: adminCode
  });
  // Get Hospital Function
  function getHospitalInfo(e) {
    let user = { ...hospital };
    user[e.target.name] = e.target.value;
    setfinfo(user);
  }
  //  Send Data To Database
  async function saveData() {
    setSpin(true)
    let { data } = await axios.post(
      "http://localhost/backend/api/add_hospital.php",
      hospital
    );
    if (data.status) {
      Swal.fire({
        title: "نــجـــح ",
        text: data.message,
        icon: "success",
        confirmButtonText: "موافق",
      });
    setSpin(false)
    } else {
      Swal.fire({
        title: "فـــشــل",
        text: data.message,
        icon: "error",
        confirmButtonText: "موافق",
      });
    setSpin(false)

    }
  }
  //  Submit Form Function
  function onSubmit(e) {
    e.preventDefault();
    saveData();
  }
  return (
    <>
      <section id="add-hospital">
        <div className="container h-100  d-flex justify-content-center align-items-center">
          <form className="w-100" onSubmit={onSubmit}>
            <fieldset className="scheduler-border">
              <legend className="scheduler-border">
                أضـــافــــة مــســتــشــفــى
              </legend>
              <div className="form-group my-2 my-lg-1">
                <label htmlFor="name" className="p-2 p-lg-1">
                  اسم المستشفى
                </label>
                <input
                  type="text"
                  className="form-control py-2 "
                  id="name"
                  aria-describedby="nameHelp"
                  placeholder="أدخل أسم المستشفى "
                  name="name"
                  onChange={getHospitalInfo}
                />
              </div>
              <div className="form-group my-2 my-lg-1">
                <label htmlFor="email" className="p-2 p-lg-1">
                  البريد الالكترونى
                </label>
                <input
                  type="email"
                  className="form-control py-2 "
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="أدخل البريد الالكترونى "
                  name="email"
                  onChange={getHospitalInfo}
                />
              </div>
              <div className="form-group my-2 my-lg-1">
                <label htmlFor="password" className="p-2 p-lg-1">
                  الرقم السرى
                </label>
                <input
                  type="password"
                  className="form-control py-2"
                  id="password"
                  placeholder="أدخل الرقم السرى "
                  name="password"
                  onChange={getHospitalInfo}
                />
              </div>
              <div className="form-group my-2 my-lg-1">
                <label htmlFor="address" className="p-2 p-lg-1">
                  العنوان
                </label>
                <input
                  type="text"
                  className="form-control py-2 "
                  id="addre"
                  aria-describedby="addressHelp"
                  placeholder="أدخل عنوان المستشفى  "
                  name="address"
                  onChange={getHospitalInfo}
                />
              </div>

              {(spin) ? <button className="btn py-2 px-4 btn-primary"><i className="fa-solid fa-spinner  fa-spin"></i></button> :
              <button type="submit" className="btn btn-primary my-4 custom-btn">
              أضـــافــــة
            </button>
              }
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
