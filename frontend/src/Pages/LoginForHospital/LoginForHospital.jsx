import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function LoginForHospital({ saveUserData }) {
  const [error, setError] = useState("");
  let navigateTo = useNavigate();
  const [hospital, setfinfo] = useState({
    email: "",
    password: "",
  });
  // Get Hospital info Function
  function getHospitalInfo(e) {
    let user = { ...hospital };
    user[e.target.name] = e.target.value;
    setfinfo(user);
  }
  //  Post Data
  async function saveData() {
    let { data } = await axios.post(
      "http://localhost/backend/api/login_hospital.php",
      hospital
    );
    if (data.status) {
      let info = data.data;
      let name = info["name"];
      let user = [info.id, name, info.role];
      localStorage.setItem("user", JSON.stringify(user));
      saveUserData();
      navigateTo("/hospital");
    } else {
        setError(data.message);
    }
  }
  //  Submit Form Function
  function onSubmit(e) {
    e.preventDefault();
    saveData();
  }
  return (
    <>
      <section id="log_in" >
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <form  className="w-100" onSubmit={onSubmit}>
            <fieldset className="scheduler-border">
              <legend className="scheduler-border"> تسجيل دخول المستشفى</legend>
              <div className="form-group my-4">
                <label htmlFor="email" className="p-2">
                  البريد الالكترونى{" "}
                </label>
                <input
                  type="email"
                  className="form-control py-3 "
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="أدخل البريد الالكترونى "
                  name="email"
                  onChange={getHospitalInfo}
                />
              </div>
              <div className="form-group my-4">
                <label htmlFor="password" className="p-2">
                  الرقم السرى{" "}
                </label>
                <input
                  type="password"
                  className="form-control py-3"
                  id="password"
                  placeholder="أدخل الرقم السرى "
                  name="password"
                  onChange={getHospitalInfo}
                />
              </div>
              <button type="submit" className="btn btn-primary my-4 custom-btn">
                تسجيل دخول
              </button>
              {error ? (
                <small className="alert alert-danger p-2 d-block text-center my-2">
                  {error}
                </small>
              ) : (
                " "
              )}
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
