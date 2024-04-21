import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
export default function AddAds() {
  const adminCode = JSON.parse(localStorage.getItem("user"))[0]
  const [spin, setSpin] = useState(false)
  const [ads, setfinfo] = useState({
    name: "",
    address: "",
    info: "",
    add_by: adminCode
  });
  // Get Hospital Function
  function getAdsInfo(e) {
    let user = { ...ads };
    user[e.target.name] = e.target.value;
    setfinfo(user);
  }
  //  Send Data To Database
  async function saveData() {
    setSpin(true)
    let { data } = await axios.post(
      "http://localhost/backend/api/add_ads.php",
      ads
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
      setSpin(false)
      Swal.fire({
        title: "فـــشــل",
        text: data.message,
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  }
  //  Submit Form Function
  function onSubmit(e) {
    e.preventDefault();
    saveData();
  }
  return (
    <>
      <section id="addAds">
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <form className="w-100" onSubmit={onSubmit}>
            <fieldset className="scheduler-border">
              <legend className="scheduler-border">
                أضـــافــــة أعــــــلان
              </legend>
              <div className="form-group my-2 my-lg-1">
                <label htmlFor="name" className="p-2 p-lg-1">
                  اسم المستشفى
                </label>
                <input
                  type="text"
                  className="form-control py-3 py-lg-1 "
                  id="name"
                  aria-describedby="nameHelp"
                  placeholder="أدخل أسم المستشفى "
                  name="name"
                  onChange={getAdsInfo}
                />
              </div>
              <div className="form-group my-2 my-lg-1">
                <label htmlFor="address" className="p-2 p-lg-1">
                  العنوان
                </label>
                <input
                  type="text"
                  className="form-control py-3 py-lg-1 "
                  id="address"
                  aria-describedby="addressHelp"
                  placeholder="أدخل عنوان المستشفى  "
                  name="address"
                  onChange={getAdsInfo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="info" className="p-2 p-lg-1">
                  الـوصف
                </label>
                <textarea
                  className="form-control my-2 my-lg-1"
                  id="info"
                  rows="3"
                  name="info"
                  placeholder="أدخل محتوى الاعلان  "
                  onChange={getAdsInfo}
                ></textarea>
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
