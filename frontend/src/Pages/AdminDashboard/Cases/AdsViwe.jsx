import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdsViwe() {
  const [ads, setads] = useState([]);
  // Get Hospital Function
  async function getAds() {
    let { data } = await axios("http://localhost/backend/api/get-ads-info.php");
    setads(data.data);
  }
  useEffect(() => {
    getAds();
  }, []);
  // Delete ADS
      async function deleteAds(id) {
        await axios.get(`http://localhost/backend/api/delete-advertisement.php?id=${id}`)
        getAds();
      }
  // Alert Functions
  async function deleteAlert(e) {
    let id = e.target.id;
    Swal.fire({
      title: "هــل أنــت مــتــأكد ؟",
      text: " سـيـتم حـذف الاعـــلان نـهـائـى ولـن يـتـم الـرجـوع",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33 ",
      cancelButtonText: "الــــغـــــاء",
      confirmButtonText: "أحـــــــــذف",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("تـــم الـــحـــذف!", "تم حذف ملفك.", "success");
        deleteAds(id);
      }
    });
  }
  // Navigate To Edit
  let navigateTo = useNavigate();
  function goToEdit(e) {
    let id = e.target.id;
    navigateTo(`/admin/adsedit/${id}`);
  }
  return (
    <>
      <section id="adsViwe">
        <div className="container mt-5 pt-5">
          <h2 className="dashboard-title">الاعــلانــات الـمـضـافة</h2>
          <div className="row mt-5 gy-3 justify-content-center">
            {ads.map((icu, key) => (
              <div className="col-md-6 my-2 col-12 " key={key}>
                <div className="ineer rounded-2 border border-primary shadow align-items-center">
                  <div className=" p-3  align-items-start ads text">
                    <h5 className="py-3">
                      أســم الـمـسـتـشـفـى :{icu.hosoital_name}
                    </h5>
                    <p className=" h6 py-1">
                      <span className="h5">الـعـنـوان : </span>
                      {icu.address}
                    </p>
                    <p className="py-1 w-100  text-center h4 text-primary"> الاعـــــــــــــــــــــــــــــــــــــــــــــــــلان</p>
                    <p className=" h6 py-1 w-100 ads text">
                      {icu.info}
                    </p>
                    <button
                      className="btn btn-outline-danger col-5 py-2 px-3 mx-2"
                      id={icu.id}
                      onClick={deleteAlert}
                    >
                      حــــــذف
                    </button>
                    <button
                      className="btn btn-outline-primary col-5 py-2 px-3 mx-2"
                      id={icu.id}
                      onClick={goToEdit}
                    >
                      تـعـديـل
                    </button>
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
