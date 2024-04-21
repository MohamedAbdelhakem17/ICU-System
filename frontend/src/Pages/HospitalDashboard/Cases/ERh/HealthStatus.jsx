import axios from "axios";
import React, { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
export default function HealthStatus({ users }) {
  // Get HOspital ID
  const hospitalID = JSON.parse(localStorage.getItem("user"))[0]
  // Get input Data
  const selectRef = useRef();
  const [selectedValue, setSelectedValue] = useState("");
  function handleSelectChange() {
    const value = selectRef.current.value;
    setSelectedValue(value);
  }
  const docName = useRef();
  const health_status = useRef();
  function getData() {
    let formData = new FormData();
    formData.append(`id`, selectedValue);
    formData.append(`docName`, docName.current.value);
    formData.append(`health_status`, health_status.current.value);
    formData.append(`hospital_id`, hospitalID);
    return formData;
  }
  // send Data To API 
  async function sendData() {
    let formData = getData();
    let url = `http://localhost/backend/api/add_erh.php`;
    let { data } = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(data)
    if (data.status) {
      Swal.fire({
        title: "نــجـــح ",
        text: data.message,
        icon: "success",
        confirmButtonText: "موافق",
      });
    } else {
      Swal.fire({
        title: "فـــشــل",
        text: data.message,//"خطأ فى الادخال",
        icon: "error",
        confirmButtonText: "موافق",
      });
    }
  }
  // Submit Form
  function onSubmit(e) {
    e.preventDefault();
    sendData()
  }
  return (
    <>
      <form className="w-100" onSubmit={onSubmit}>
        <fieldset className="scheduler-border">
          <legend className="scheduler-border">أضافة التشخيص</legend>
          <select className="form-select mt-4" id="user_id" ref={selectRef} onChange={handleSelectChange} name="user_id">
            <option defaultValue>أختار أسم المريض</option>
            {
              users.map((user, key) => (
                <option key={key} value={user.id}>{user.name}</option>
              ))
            }
          </select>
          <div className="form-group my-2">
            <label htmlFor="docName" className="p-2 h6">
              أســـم الــطــبــيــب
            </label>
            <input
              type="text"
              className="form-control"
              id="docName"
              name="docName"
              placeholder=" أدخل أسم الطبيب "
              onChange={getData}
              ref={docName}
            />
          </div>
          <div className="form-group my-2 my-lg-1">
            <label htmlFor="info" className="p-2 p-lg-1">
              حالة المريض
            </label>
            <textarea
              className="form-control"
              id="info"
              name="health_status"
              rows="3"
              onChange={getData}
              ref={health_status}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary my-4 custom-btn">
            أضــافــة
          </button>
        </fieldset>
      </form>
    </>
  );
}
