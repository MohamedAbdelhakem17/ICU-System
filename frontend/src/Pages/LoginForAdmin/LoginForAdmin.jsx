import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginForAdmin({ saveUserData }) {
  let navigateTo = useNavigate();
  const [error, setError] = useState("");
  const [admin, setfinfo] = useState({
    email: "",
    password: "",
  });
  // Get admin Function
  function getAdminInfo(e) {
    let user = { ...admin };
    user[e.target.name] = e.target.value;
    setfinfo(user);
  }
  // Valid Data Function
  function valid() {
    var email = document.myForm.email.value;
    var pass = document.myForm.password.value;
    if (email.length === 0 && pass.length === 0) {
      setError("يجب أدخال البريد الالكترونى والرقم السرى");
    } else {
      saveData();
    }
  }
  //  Post Data
  async function saveData() {
    let { data } = await axios.post(
      "http://localhost/backend/api/login_admin.php",
      admin
    );
    if (data.status) {
      let info = data.data;
      let name = info["name"].split(" ").splice(0, 1).toString();
      let user = [info.id, name, info.role];
      localStorage.setItem("user", JSON.stringify(user));
      saveUserData();
      navigateTo("/admin");
    } else {
      var email = document.myForm.email.value;
      var pass = document.myForm.password.value;
      if (email.length !== 0 || pass.length !== 0) {
        setError(data.message);
      }
    }
  }
  //  Submit Form Function
  function onSubmit(e) {
    e.preventDefault();
    valid();
  }
  return (
    <>
      <section id="log_in" >
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <form className="w-100" onSubmit={onSubmit} name="myForm">
            <fieldset className="scheduler-border">
              <legend className="scheduler-border"> تسجيل دخول المسؤل</legend>
              <div className="form-group my-4">
                <label htmlFor="email" className="p-2">البريد الالكترونى</label>
                <input
                  type="email"
                  className="form-control py-3 "
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="أدخل البريد الالكترونى "
                  name="email"
                  onChange={getAdminInfo}
                />
              </div>
              <div className="form-group my-4">
                <label htmlFor="password" className="p-2">
                  الرقم السرى
                </label>
                <input
                  type="password"
                  className="form-control py-3"
                  id="password"
                  placeholder="أدخل الرقم السرى "
                  name="password"
                  onChange={getAdminInfo}
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
