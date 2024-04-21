import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
export default function AddIcu() {
  const [spin, setSpin] = useState(false)
  const selectFile = useRef();
  const number_of_beds = useRef();
  const specialization = useRef();
  const info = useRef();
  const price = useRef();
  const hospitalID = JSON.parse(localStorage.getItem("user"))[0]
  // Gat Data
  function getData() {
    let formData = new FormData();
    var imgs = selectFile.current.files;
    formData.append(`specialization`, specialization.current.value);
    formData.append(`price`, price.current.value);
    formData.append(`info`, info.current.value);
    formData.append(`number_of_beds`, number_of_beds.current.value);
    formData.append(`hospital_id`, hospitalID);
    for (let i = 0; i < imgs.length; i++) {
      formData.append(`img[]`, imgs[i]);
    }
    return formData;
  }
  // Send Data To Database
  async function upload(e) {
    e.preventDefault();
    setSpin(true)
    let formData = getData()
    let url = `http://localhost/backend/api/add-icu.php`;
    let { data } = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
        text: "أدخل البيانات كاملة",
        icon: "error",
        confirmButtonText: "موافق",
      });
      setSpin(false)
    }
  }
  return (
    <>
      <section id="add_icu">
        <div className="container d-flex justify-content-center align-items-center pt-5 pb-2">
          <form
            encType="multipart/form-data"
            onSubmit={upload}
            className="w-100"
          >
            <fieldset className="scheduler-border">
              <legend className="scheduler-border">
                أضـــافــــة الــعــنــايــة
              </legend>
              <div className="form-group my-1">
                <label htmlFor="specialization" className="p-1 ">
                  تــخــصــص الــعــنــايــة
                </label>
                <input
                  type="text"
                  className="form-control py-2 "
                  id="specialization"
                  aria-describedby="nameHelp"
                  placeholder="أدخل تــخــصــص الــعــنــايــة "
                  name="specialization"
                  ref={specialization}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="number_of_beds" className="p-1 ">
                  عدد الأَسِرَّة
                </label>
                <input
                  type="number"
                  className="form-control py-2 "
                  id="number_of_beds"
                  aria-describedby="emailHelp"
                  placeholder="أدخل عدد الأَسِرَّة "
                  name="number_of_beds"
                  ref={number_of_beds}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="price" className="p-1 ">
                  الــســعــر
                </label>
                <input
                  type="number"
                  className="form-control py-2 "
                  id="price"
                  aria-describedby="emailHelp"
                  placeholder="أدخل الــســعــر "
                  name="price"
                  ref={price}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="info" className="p-1 ">
                  وصـــف الــعــنــايــة
                </label>
                <textarea
                  className="form-control"
                  id="info"
                  name="info"
                  rows="3"
                  ref={info}
                ></textarea>
              </div>
              <div className="form-group my-1">
                <label htmlFor="img" className="p-1 ">
                  أضـــافــــة صــــور{" "}
                </label>
                <input
                  type="file"
                  ref={selectFile}
                  multiple
                  className="form-control my-2 "
                />
              </div>
              {(spin) ? <button className="btn py-2 px-4 btn-primary"><i className="fa-solid fa-spinner  fa-spin"></i></button> :
                <button type="submit" className="btn btn-primary my-2 custom-btn">
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
