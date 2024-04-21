import axios from "axios";
import React from "react";
import user from "./5856.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
export default function IcuInfo() {
  // Get Genral Data
  let { id } = useParams();
  let navigateTo = useNavigate();
  const imgDir = "http://localhost/backend/upload/icuImg/";
  // Get ICU Function
  const [icu, setIcu] = useState([]);
  const [img, setimg] = useState([]);
  async function getICU() {
    let { data } = await axios.get(
      `http://localhost/backend/api/get-icu-info.php?id=${id}`
    );
    setIcu(data.data[0]);
    setimg(
      JSON.stringify(data.data[0].img_name).replaceAll('"', "").split("|")
    );
  }
  // IMg Function
  function chImg(e) {
    let bigImg = document.getElementById("main_img");
    let smIMg = e.target;
    bigImg.src = smIMg.src;
    smIMg.classList.toggle("active");
  }
  // Save Data In session storage And Go To Book
  function getData(icu) {
    if (localStorage.getItem("user") !== null) {
      sessionStorage.setItem("icu", JSON.stringify(icu));
      navigateTo("/book");
    } else {
      Swal.fire({
        position: "center-center",
        icon: "info",
        title: "يجب تسجيل الدخول أولا",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigateTo("/loginforuser");
      }, 1600);
    }
  }
  // ICU Rate
  let userId;
  if (localStorage.getItem("user") !== null) {
    userId = JSON.parse(localStorage.getItem("user"))[0];
  }
  const star = Array(5).fill(0);
  const [rate, sertRate] = useState(0);
  const [commentinfo, setComment] = useState("");
  const [rateHover, sertRateHover] = useState(undefined);
  const [spin, setSpin] = useState(false);
  const [error, seterror] = useState("");
  const color = {
    rat: "#09c",
    grey: "#a9a9a9",
  };
  function getComment(e) {
    setComment(e.target.value);
  }
  // Save Rate In Database
  async function sendRate() {
    if (localStorage.getItem("user") !== null) {
      let info = {
        comment: commentinfo,
        icu_rate: rate,
        icu_id: id,
        user_id: userId,
      };
      setSpin(true);
      const url =
        "http://localhost/backend/api/add-icu-rate.php";
      let { data } = await axios.post(url, info);
      if (data.status) {
        setSpin(false);
        const myModalEl = document.getElementById("rate");
        const modal_backdrop =
          document.getElementsByClassName("modal-backdrop");
        myModalEl.style.display = "none";
        modal_backdrop[0].classList.remove("show");
        modal_backdrop[0].classList.remove("fade");
        modal_backdrop[0].classList.remove("modal-backdrop");
        document.body.style.overflow = "auto";
      } else {
        setSpin(false);
        seterror(data.error);
      }
    } else {
      Swal.fire({
        position: "center-center",
        icon: "info",
        title: "يجب تسجيل الدخول أولا",
        showConfirmButton: false,
        timer: 1500,
      });
      const myModalEl = document.getElementById("rate");
      const modal_backdrop = document.getElementsByClassName("modal-backdrop");
      myModalEl.style.display = "none";
      modal_backdrop[0].classList.remove("show");
      modal_backdrop[0].classList.remove("fade");
      modal_backdrop[0].classList.remove("modal-backdrop");
      document.body.style.overflow = "auto";
      setTimeout(() => {
        navigateTo("/loginforuser");
      }, 1600);
    }
  }
  // Get Comment
  const [comment, setComments] = useState([]);
  async function getComments() {
    const url = `http://localhost/backend/api/get-icuRate.php?id=${id}`;
    let { data } = await axios.get(url);
    setComments(data.data);
  }
  useEffect(() => {
    getICU();
    getComments();
  }, [comment]);
  return (
    <>
      <section className="vh-100 mt-5 py-5 icuinfo">
        {/* Icu Info */}
        <div className="container-fluid px-3">
          <div className="row flex-md-row flex-sm-column-reverse">
            <div className="col-md-7 col-12 pb-3">
              <div className="px-2">
                <div className="my-1 px-1">
                  <p className="pinfo"> أســم الـمــســتــشــفــى </p>
                  <Link to={`/hosoInfo/${icu.id}`}>
                    <h5>{icu.hospitalName}</h5>
                  </Link>
                </div>
                <div className="my-1 px-1 align-items-center">
                  <p className="pinfo">الــعــنــوان </p>
                  <h5>{icu.hospitalAddress}</h5>
                </div>
                <div className="my-1 px-1">
                  <p className="pinfo">تــخــصــص الــعــنــايــة </p>
                  <h5>{icu.specialization}</h5>
                </div>
                <div className="my-1 px-1">
                  <p className="pinfo">عـــــــدد الأَسِـــــــــــــرَّة </p>
                  <h5>
                    {icu.number_of_beds === "0" ? (
                      <span type="button" className="text-danger fw-boldr">
                        {" "}
                        لا يوجد سرائر متاحة{" "}
                      </span>
                    ) : (
                      icu.number_of_beds
                    )}
                  </h5>
                </div>
                <div className="my-1 px-1">
                  <p className="pinfo"> الــــســـــــعـــــــر </p>
                  <h5>{icu.price} جــــــنـــــــيـــــة </h5>
                </div>
                <div className=" my-1 px-1">
                  <p className="pinfo">
                    تــــــــجــــــهـــــيــــزات
                    الـــــــــعـــــــنــــــــايـــــــة{" "}
                  </p>
                  <h5>{icu.info}</h5>
                </div>
              </div>
              {icu.number_of_beds !== "0" ? (
                <button
                  onClick={() => {
                    getData(icu);
                  }}
                  className="btn btn-primary py-2 px-4 my-4 fw-bold  mx-2 col-4 text-center "
                >
                  {" "}
                  حــــــــــــــجــــــــــز
                </button>
              ) : (
                <button
                  type="button"
                  className="btn mx-2  col-4 btn-danger"
                  disabled
                >
                  غير متوافر
                </button>
              )}
              <button
                className="btn btn-outline-primary py-2 px-4 my-4 fw-bold  col-4 text-center "
                data-bs-toggle="modal"
                data-bs-target="#rate"
              >
                {" "}
                تــــــقـــــيــــــم{" "}
              </button>
              <div
                className="modal fade top-50 translate-middle-y"
                id="rate"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header flex-row-reverse">
                      <h2 className="modal-title fs-5" id="staticBackdropLabel">
                        تــــــقـــــيــــــم الــعــنــايــة الــــمـــركــــزة
                      </h2>
                      <button
                        type="button"
                        className="btn-close ms-auto"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body text-center">
                      {star.map((_, index) => (
                        <i
                          className="fa-solid fa-star fa-2x mx-1 my-2"
                          key={index}
                          onClick={() => sertRate(index + 1)}
                          onMouseOver={() => sertRateHover(index + 1)}
                          style={{
                            color:
                              (rate || rateHover) > index
                                ? color.rat
                                : color.grey,
                          }}
                          onMouseLeave={() => sertRateHover(undefined)}
                        ></i>
                      ))}
                      <div class="my-3 w-75 mx-auto">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label h3"
                        >
                          {" "}
                          أكـــتــــب تــعــلـيــق{" "}
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="5"
                          onChange={getComment}
                        ></textarea>
                      </div>
                      {error ? (
                        <small className="alert alert-danger p-2">
                          {" "}
                          {error}{" "}
                        </small>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn py-2 px-4 btn-danger"
                        data-bs-dismiss="modal"
                      >
                        أغلاق
                      </button>
                      {spin ? (
                        <button className="btn py-2 px-4 btn-primary">
                          <i className="fa-solid fa-spinner  fa-spin"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn py-2 px-4 btn-primary"
                          onClick={sendRate}
                        >
                          أرســــــــــال
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5 col-12">
              <div className="row ">
                <div className="col-10 ">
                  <img
                    src={`${imgDir}${img[0]}`}
                    alt={icu.hospital_name}
                    className="w-100  my-2 big-img"
                    id="main_img"
                  />
                </div>
                <div className="col-2">
                  {img.map((imgs, key) => (
                    <img
                      src={`${imgDir}${imgs}`}
                      alt={icu.hospital_name}
                      className="w-100 my-2 sm-img"
                      key={key}
                      onClick={chImg}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* comment */}
        <div className="container py-3">
          <h3 className="dashboard-title">
            الـــــتــــــعــــــلـــــيــــقـــــات
          </h3>
          <div className="row pt-5 g-3">
            {comment.map((com, key) => (
              <div className="col-12" key={key}>
                <div className="com row">
                  <div className="img col-1 ">
                    <img src={user} alt={com.name} className="usercomment" />
                  </div>
                  <div className="commentText col-md-10 col-9 mx-auto py-1 ">
                    <h4>{com.name}</h4>
                    <p>{com.comment}</p>
                    <p>
                      {com.rate === "1" ? (
                        <i className="fa-solid fa-star fa-1x text-primary"></i>
                      ) : com.rate === "2" ? (
                        <>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                        </>
                      ) : com.rate === "3" ? (
                        <>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                        </>
                      ) : com.rate === "4" ? (
                        <>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                        </>
                      ) : com.rate === "5" ? (
                        <>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                          <i className="fa-solid fa-star fa-1x text-primary"></i>
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                    <div>
                      <h6> الساعة {com.addTime}</h6>
                      <h6>التاريخ {com.addDate}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
