import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Booking() {
  const icuData = JSON.parse(sessionStorage.getItem("icu"));
  const [payWay, setPay] = useState("cash");
  function getSelectedValue() {
    const selectElement = document.getElementById("pay_way");
    let pay = selectElement.options[selectElement.selectedIndex].value;
    setPay(pay);
  }
  const info = {
    user_id: JSON.parse(localStorage.getItem("user"))[0],
    pay_way: payWay,
    price: icuData.price,
    hospital_id: icuData.hospital_id,
    icu_id: icuData.icu_code,
  };
  async function sendData() {
    const url = "http://localhost/backend/api/payment.php";
    let { data } = await axios.post(url, info);
    if (data.status) {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center-center",
        icon: "info",
        title: "تم الحجز مسبقا",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  let navigateTo = useNavigate();
  function onSubmit(e) {
    e.preventDefault();
    sendData();
    setTimeout(() => {
      navigateTo("/user/userbook");
    }, 1600);
  }
  return (
    <>
      <section id="book">
        <div className="container vh-100 d-flex justify-content-center align-items-center mt-5 w-100">
          <form className="w-100" name="myForm" onSubmit={onSubmit}>
            <fieldset className="scheduler-border">
              <legend className="scheduler-border"> الدفع وتأكيد الحجز </legend>
              <div className="form-group my-1">
                <label htmlFor="user_name" className="py-1">
                  أسم المستخدم
                </label>
                <input
                  disabled
                  type="user_name"
                  className="form-control py-2"
                  id="user_name"
                  value={JSON.parse(localStorage.getItem("user"))[1]}
                  name="user_name"
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="hospital_name" className="py-1">
                  أسم المستشفى
                </label>
                <input
                  disabled
                  type="hospital_name"
                  className="form-control py-2"
                  id="hospital_name"
                  value={icuData.hospitalName}
                  name="hospital_name"
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="icu_specialization" className="py-1">
                  تــخــصــص الــعــنــايــة
                </label>
                <input
                  disabled
                  type="icu_specialization"
                  className="form-control py-2"
                  id="icu_specialization"
                  value={icuData.specialization}
                  name="icu_specialization"
                />
              </div>
              <div className="form-group my-1">
                <label htmlFor="price" className="py-1">
                  سعر اليوم الواحد
                </label>
                <input
                  disabled
                  type="number"
                  className="form-control py-2"
                  id="price"
                  value={icuData.price}
                  name="price"
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="pay_way" className="py-1">
                  طريقة الدفع
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="pay_way"
                  onChange={getSelectedValue}
                >
                  <option value="cash" selected>Cash</option>
                  <option value="visa" >Visa</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary my-4 custom-btn">
                تأكيد الحجز
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
