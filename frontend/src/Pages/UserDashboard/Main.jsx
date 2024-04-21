import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Main() {
  const [info, setBook] = useState([])
  async function getData(id) {
    const url = `http://localhost/backend/api/get_user_info.php?id=${id}`
    let { data } = await axios.get(url)
    setBook(data.data[0])
  }
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))[0]
    getData(userId)
  }, [])
  return (
    <>
      <section id='main_user'>
        <div className="container mt-5 px-3">
          <h3 className='dashboard-title py-1 mb-5'> المعلومات الاساسية </h3>
          <h6 className='info'>الاسم </h6>
          <p > {info.name}</p>
          <h6 className='info'>العنوان   </h6>
          <p > {info.address}</p>
          <h6 className='info'>رقم  الهاتف   </h6>
          <p > {info.phone}</p>
          <h6 className='info'>الايميل  </h6>
          <p > {info.email}  </p>
        </div>
      </section>
    </>
  )
}
