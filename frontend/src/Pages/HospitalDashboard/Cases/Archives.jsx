import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Archives() {
  const [archives, setArchives] = useState([])
  const [query, setQuery] = useState("")
  useEffect(() => {
    const hospitalID = JSON.parse(localStorage.getItem("user"))[0]
    getData(hospitalID)
  }, [])

  async function getData(id) {
    const url = `http://localhost/backend/api/get_archives.php?id=${id}`
    let data = await axios.get(url)
    setArchives((data.data.data))
  }

  return (
    <>
      <section id="archives">
        <div className="container ">
          <div className="col-7 mx-auto text-center py-3">
            <input type="search" className="form-control" id="search" placeholder="بحث فـى الحجوزات" onInput={e => setQuery(e.target.value)} />
          </div>
          <table className="table table-striped border border-2">
            <thead>
              <tr className="text-center">
                <th scope="col">كود الحجز</th>
                <th scope="col">أسم المريض</th>
                <th scope="col">تخصص العناية</th>
                <th scope="col"> طريقة الدفع</th>
                <th scope="col">وقت الدخول</th>
                <th scope="col">وقت الخروج</th>
                <th scope="col"> مدة الحجز</th>
                <th scope="col">المبلغ </th>
                <th scope="col"> أجمالى المبلغ</th>
              </tr>
            </thead>
            <tbody>
              {
                archives.filter(book => book.name.includes(query)).map((book, key) => (
                  <tr key={key} className="text-center">
                    <td>{book.code}</td>
                    <td>{book.name}</td>
                    <td>{book.specialization}</td>
                    <td>{book.pay_way}</td>
                    <td>{book.enter_time}</td>
                    <td>{book.exit_time}</td>
                    <td>{(book.bookday === "0") ? 1 : book.bookday} يـــوم</td>
                    <td>{book.price} جنية </td>
                    <td> {(book.bookday === "0") ? book.price : book.price * book.bookday} جنية </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
