import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
export default function Medicine({ users }) {
  const docName = useRef();
  const title = useRef();
  const medicine = useRef();
  let hospital_id = localStorage.getItem("user");
  hospital_id = JSON.parse(hospital_id)[0];
  // Gat Data
  function getData() {
    let formData = new FormData();
    formData.append(`id`, selectedValue);
    formData.append(`docName`, docName.current.value);
    formData.append(`title`, title.current.value);
    formData.append(`hospital_id`, hospital_id);
    formData.append(`medicine`, medicine.current.files[0]);
    return formData;
  }
  // Send Data To Database
  const [spin, setSpin] = useState(false)
  async function sendData(e) {
    e.preventDefault();
    setSpin(true)
    let formData = getData();
    let url = `http://localhost/backend/api/add_medicine.php`;
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
        text: "خطأ فى الادخال",
        icon: "error",
        confirmButtonText: "موافق",
      });
      setSpin(false)
    }
  }
  const selectRef = useRef();
  const [selectedValue, setSelectedValue] = useState("");
  function handleSelectChange() {
    const value = selectRef.current.value;
    setSelectedValue(value);
  }
  return (
    <>
      <form className="w-100" onSubmit={sendData} encType="multipart/form-data">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border">أضافة الادوية </legend>
          <select className="form-select mt-4" id="user_id" onChange={handleSelectChange} ref={selectRef}>
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
              ref={docName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title" className="p-2 h6">
              الدواء
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder=" أدخل غرض الدواء  "
              ref={title}
            />
          </div>
          <div className="form-group mt-4 ">
            <label htmlFor="medicine" className="p-2 h6">
              الادوية
            </label>
            <input
              type="file"
              className="form-control-file border border-2 border-primary p-2 rounded w-100"
              id="medicine"
              name="medicine"
              ref={medicine}
            />
          </div>
          {(spin) ? <button className="btn py-2 px-4 btn-primary"><i className="fa-solid fa-spinner  fa-spin"></i></button> :
            <button type="submit" className="btn btn-primary my-4 custom-btn">
              أضــافــة
            </button>
          }
        </fieldset>
      </form>
    </>
  );
}
