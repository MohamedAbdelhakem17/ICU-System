import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserBook() {
  const [book, setBook] = useState([])
  async function getData(id) {
    const url = `http://localhost/backend/api/user_booking.php?id=${id}`
    let { data } = await axios.get(url)
    setBook(data.data)
  }
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))[0]
    getData(userId)
  }, [])
  return (
    <>
    <section id='UserBook'>
      <div className="container mt-5 px-3">
        <h3 className='dashboard-title py-1 mb-5'> مــعــلــومــات الـــحــجــز</h3>
        {book.map ((info , key ) => (
          <div key={key}>
            <h6 className='title'>أسم المستشفى  </h6>
            <Link to={`/hosoInfo/${info.id}`}>
            <p className='info'> {info.name}</p>
            </Link>
            <h6 className='title'>عنوان المستشفى  </h6>
            <p className='info'> {info.address}</p>
            <h6 className='title'>تخصص العناية المحجوزة  </h6>
            <p className='info'> {info.specialization}</p>
            <h6 className='title'>السعر  </h6>
            <p className='info'> {info.price} جنية </p>
            <h6 className='title'>طريقة الدفع  </h6>
            <p className='info'> {info.pay_way}</p>
            <h6 className='title'>تاريخ الدخول  </h6>
            <p className='info'> {info.enter_time}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}
