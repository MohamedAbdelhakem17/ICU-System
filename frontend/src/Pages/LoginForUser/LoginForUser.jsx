import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LoginForAdmin({ saveUserData }) {
  let navigateTo = useNavigate();
  const [error, setError] = useState("");
  // Get user Function
  const [user, setfinfo] = useState({
    email: "",
    password: "",
  });
  function getUserData(e) {
    let info = { ...user };
    info[e.target.name] = e.target.value;
    setfinfo(info);
  }
  // Valid Data Function
  function valid() {
    var email = document.myForm.email.value;
    var pass = document.myForm.password.value;
    if (email.length === 0 && pass.length === 0) {
      setError("يجب أدخال البريد الالكترونى والرقم السرى");
    }
  }
  //  Post Data
  async function saveData() {
    let { data } = await axios.post(
      "http://localhost/backend/api/login_user.php",
      user
    );
    if (data.status) {
      let info = data.data;
      let name = info["name"];
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
    saveData();
    valid();
  }
  // Navigt To Register
  function goToRegister() {
    navigateTo("/register");
  }
  return (
    <>
      <section id="log_in">
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <form className=" w-100" name="myForm" onSubmit={onSubmit}>
            <fieldset className="scheduler-border">
              <legend className="scheduler-border"> تسجيل دخول المستخدم</legend>
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
                  onChange={getUserData}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="p-2">
                  الرقم السرى{" "}
                </label>
                <input
                  type="password"
                  className="form-control py-3"
                  id="password"
                  placeholder="أدخل الرقم السرى "
                  name="password"
                  onChange={getUserData}
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
              <small className="text-center d-block py-3">
                هل لديك حساب الالكترونى ؟{" "}
                <span className="fw-bolder " onClick={goToRegister}>
                  أنشئ حساب
                </span>
              </small>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
