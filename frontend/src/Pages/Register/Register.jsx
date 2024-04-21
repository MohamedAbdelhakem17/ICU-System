import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function Register() {
  let navigateTo = useNavigate();
  const [error, setError] = useState();
  // Get User Data 
  const [users, setUsers] = useState({
    name: " ",
    address: " ",
    email: " ",
    password: " ",
    age: " ",
    phone: " ",
  })
  function getUserdata(e) {
    let user = { ...users }
    user[e.target.name] = e.target.value;
    setUsers(user)
  }
  // Valid Data Function
  function valid() {
    var email = document.myForm.email.value;
    var name = document.myForm.name.value;
    var address = document.myForm.address.value;
    var password = document.myForm.password.value;
    var age = document.myForm.age.value;
    var phone = document.myForm.phone.value;
    if (email.length === 0 && name.length === 0 && address.length === 0 && password.length === 0  && age.length === 0  && phone.length === 0) {
      setError("يجب أدخال جميع الحقول");
    } else {
      saveData();
    }
  }
  // Send Data To Database
  async function saveData() {
    let url = "http://localhost/backend/api/register.php"
    let { data } =await axios.post(url, users)
    console.log(data.status)
    if (data.status) {
       Swal.fire({
        position: 'center-start',
        icon: 'success',
        title: 'تم عمل حساب ',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        navigateTo("/loginforuser");
      }, 2000);
      
    } else {
      setError(data.error[0])
      console.log(data.error)
    }
  }
  //  Submit Form Function
  function onSubmit(e) {
    e.preventDefault();
    valid();
  }
  function goToLogin() {
    navigateTo("/loginforuser");
  }
  return (
    <>
      <section id="register">
        <div className="container vh-100 d-flex justify-content-center align-items-center py-2 mt-3">
          <form  className="w-100 h-75" onSubmit={onSubmit} name="myForm">
            <fieldset className="scheduler-border">
              <legend className="scheduler-border">أنشاء حـسـاب جـديـد</legend>
              <div className="form-group my-1">
                <label htmlFor="name" className="p-2 h6">
                  ألاســـم
                </label>
                <input
                  type="text"
                  className="form-control py-3 "
                  id="name"
                  aria-describedby="nameHelp"
                  placeholder="أدخل الاسم  "
                  name="name"
                  onChange={getUserdata}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="address" className="p-2 h6">
                  الـعنـوان
                </label>
                <input
                  type="text"
                  className="form-control py-3 "
                  id="address"
                  aria-describedby="nameHelp"
                  placeholder="أدخل العنوان  "
                  name="address"
                  onChange={getUserdata}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="email" className="p-2 h6">
                  البريد الالكترونى
                </label>
                <input
                  type="email"
                  className="form-control py-3 "
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="أدخل البريد الالكترونى "
                  name="email"
                  onChange={getUserdata}
                />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="password" className="p-2 h6">
                  الرقم السرى
                </label>
                <input
                  type="password"
                  className="form-control py-3"
                  id="password"
                  placeholder="أدخل الرقم السرى "
                  name="password"
                  onChange={getUserdata}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="age" className="p-2 h6">
                  العمر
                </label>
                <input
                  type="number"
                  className="form-control py-3 "
                  id="age"
                  aria-describedby="ageHelp"
                  placeholder="أدخل العمـر  "
                  name="age"
                  onChange={getUserdata}
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="phone" className="p-2 h6">
                  رقم الهاتف
                </label>
                <input
                  type="text"
                  className="form-control py-3 "
                  id="phone"
                  aria-describedby="phoneHelp"
                  placeholder="أدخل رقم الهاتف  "
                  name="phone"
                  onChange={getUserdata}
                />
              </div>
              <button type="submit" className="btn btn-primary my-1 custom-btn">
                أنشئ حساب
              </button>
              <small className="text-center d-block py-2">
                هل لديك حساب الالكترونى ؟{" "}
                <span className="fw-bolder " onClick={goToLogin}>
                  تسجيل الدخول
                </span>
              </small>
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
