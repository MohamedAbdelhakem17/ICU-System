import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
export default function Rays({ users }) {
  const docName = useRef();
  const title = useRef();
  const ray = useRef();
  let hospital_id = localStorage.getItem("user");
  hospital_id = JSON.parse(hospital_id)[0];
  // Gat Data
  function getData() {
    let formData = new FormData();
    formData.append(`id`, id);
    formData.append(`docName`, docName.current.value);
    formData.append(`title`, title.current.value);
    formData.append(`hospital_id`, hospital_id);
    formData.append(`ray`, ray.current.files[0]);
    return formData;
  }
  // Send Data To Database
  const [spin, setSpin] = useState(false)
  async function sendData(e) {
    e.preventDefault();
    setSpin(true)
    let formData = getData();
    let url = `http://localhost/backend/api/add_rays.php`;
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
  const [id, setId] = useState("");
  function getSelectedValue() {
    const selectElement = document.getElementById("user_id");
    let id = selectElement.options[selectElement.selectedIndex].value;
    setId(id);
  }
  return (
    <>
      <form className="w-100" onSubmit={sendData} encType="multipart/form-data">
        <fieldset className="scheduler-border">
          <legend className="scheduler-border">أضافة ألاشعة</legend>
          <select className="form-select mt-4" id="user_id" onChange={getSelectedValue}>
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
              الاشــعــة
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder=" أدخل أسم الاشعة  "
              ref={title}
            />
          </div>
          <div className="form-group mt-4 ">
            <label htmlFor="rays" className="p-2 h6">
              الاشــعــة
            </label>
            <input
              type="file"
              className="form-control-file border border-2 border-primary p-2 rounded w-100"
              id="rays"
              name="ray"
              ref={ray}
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
