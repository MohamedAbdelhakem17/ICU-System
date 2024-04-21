import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function PendingHospital() {
  // Get Hospital Function
  const [hospital, sethospital] = useState([]);
  async function getHospital() {
    let { data } = await axios(
      "http://localhost/backend/api/get-hospital-count.php"
    );
    sethospital(data.data);
  }
  useEffect(() => {
    getHospital();
  }, []);

  // Delete Hospital 
  async function deleteHospital(id) {
    await axios.get(`http://localhost/backend/api/delete-hospital.php?id=${id}`)
    getHospital();
  }
  // Alert Function
  async function deleteAlert(e) {
    let id = e.target.id
    Swal.fire({
      title: 'هــل أنــت مــتــأكد ؟',
      text: " سـيـتم حـذف الـمـسـتـشـفـى نـهـائـى ولـن يـتـم الـرجـوع",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33 ',
      cancelButtonText: 'الــــغـــــاء',
      confirmButtonText: 'أحـــــــــذف'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'تـــم الـــحـــذف!',
          'تم حذف ملفك.',
          'success'
        )
        deleteHospital(id)
      }
    })
  }
  return (
    <>
      <section id="view-hospital">
        <div className="container pt-5 mt-5" >
          <h2 className="dashboard-title">الـمـسـتـشـفـيات الموجودة بالنظام </h2>
          <div className="row py-2 mt-5 g-4 justify-content-around ">
            {hospital.map((icu, key) => (
              <div className="col-lg-4 col-md-6 col-12" key={key}>
                <div className="w-100 p-3 text-center shadow rounded-2 border border-primary ">
                  <i className="fa-solid fa-hospital icon"></i>
                  <h5 className="py-3">{icu.name}</h5>
                  <div className="d-flex justify-content-between w-100">
                    <button className="btn btn-outline-danger py-2 px-4 col-5 m-auto" id={icu.id} onClick={deleteAlert}> حـــذف </button>
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
