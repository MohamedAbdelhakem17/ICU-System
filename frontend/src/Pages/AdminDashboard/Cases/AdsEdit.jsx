import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function AdsEdit() {
  let navigateTo = useNavigate();
  // Get Ads ID
  let { id } = useParams();
  // Set Data
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({
    name: "",
    address: "",
    info: "",
  });
  const [spin, setSpin] = useState(false)
  // Get New Data
  function getAdsInfo(e) {
    let ads = { ...info };
    ads[e.target.name] = e.target.value;
    setInfo(ads);
    setData([]);
  }
  // Get Old Data
  async function getInfo(id) {
    const url = `http://localhost/backend/api/get_ads_info.php?id=${id}`;
    let { data } = await axios.get(url);
    setData(data.data[0]);
    setInfo({
      name: data.data[0]["hosoital_name"],
      address: data.data[0]["address"],
      info: data.data[0]["info"],
    });
  }
  useEffect(() => {
    getInfo(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Update Ads
  async function update(id) {
    setSpin(true)
    const url = `http://localhost/backend/api/update_advertisement.php?id=${id}`;
    let { data } = await axios.post(url, info);
    if (data.status) {
      Swal.fire({
        position: 'centre-center',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        title: "نــجـــح ",
        text: data.message,
      });
      setTimeout(() => {
        navigateTo("/admin/adsviwe")
      }, 1700);
      setSpin(false)
    } else {
      Swal.fire({
        title: "فـــشــل",
        text: data.message,
        icon: "error",
        confirmButtonText: "موافق",
      });
      setSpin(false)

    }
  }
  function onSubmit(e) {
    e.preventDefault();
    update(id);
  }
  return (
    <>
      <div className="px-3 vh-100 w-100 pt-5 mt-4 add-ads">
        <div className="container h-100  d-flex justify-content-center align-items-center">
          <form dir="rtl" className="w-100" onSubmit={onSubmit}>
            <fieldset className="scheduler-border">
              <legend className="scheduler-border">تعديل الأعــــــلان</legend>
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
                  value={data.hosoital_name}
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
                  value={data.address}
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
                  value={data.info}
                  onChange={getAdsInfo}
                ></textarea>
              </div>
              {(spin) ? <button className="btn py-2 px-4 btn-primary"><i className="fa-solid fa-spinner  fa-spin"></i></button> :
                <button type="submit" className="btn btn-primary my-4 custom-btn">
                  تــــعــــديــــــل
                </button>
              }
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
