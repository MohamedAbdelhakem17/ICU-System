import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Booking() {
  const hospitalID = JSON.parse(localStorage.getItem("user"))[0]
  const [booking, setBooking] = useState([])
  const [query, setQuery] = useState("")
  async function getData() {
    const url = `http://localhost/backend/api/get_booking.php?id=${hospitalID}`
    let data = await axios.get(url)
    setBooking((data.data.data))
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //  user Leave Function 
  async function userLeave(hospital_id, icu_id, code) {
    let info = {
      id_hospital: hospital_id,
      id_icu: icu_id,
      id_booking: code
    }
    const url = `https://icuuu.000webhostapp.com/backend/api/user_leave.php`
    let { data } = await axios.post(url, info)
    if (data.status) {
      Swal.fire({
        position: 'center-center',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
    setTimeout(() => {
      getData()
    }, 1600);
  }
  return (
    <>
      <section id="booking">
        <div className="container">
          <div className="col-7 mx-auto text-center py-3">
            <input type="search" className="form-control" id="search" placeholder="بحث فـى الحجوزات" onInput={e => setQuery(e.target.value)} />
          </div>
          <table className="table table-striped border border-2">
            <thead>
              <tr className="text-center">
                <th scope="col">الكود</th>
                <th scope="col">أسم المريض</th>
                <th scope="col">تخصص العناية</th>
                <th scope="col"> طريقة الدفع</th>
                <th scope="col">المبلغ </th>
                <th scope="col">وقت الدخول</th>
                <th scope="col">وقت الخروج</th>
                <th scope="col"> تسجيل الخروج</th>
              </tr>
            </thead>
            <tbody>
              {
                booking.filter(book => book.name.includes(query)).map((book, key) => (
                  <tr key={key} className="text-center">
                    <td>{book.code}</td>
                    <td>{book.name}</td>
                    <td>{book.specialization}</td>
                    <td>{book.pay_way}</td>
                    <td>{book.price}</td>
                    <td>{book.enter_time}</td>
                    <td>{book.exit_time}</td>
                    <td>
                      {
                        book.exit_time === null ? <button className="btn btn-danger py-1 px-4 mx-auto d-block" onClick={() => userLeave(hospitalID, book.icu_code, book.code)}>
                          تسجيل الخروج
                        </button> : "خرج "
                      }
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
