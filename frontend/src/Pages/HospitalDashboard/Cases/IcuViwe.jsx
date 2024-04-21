import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function IcuViwe() {
    const hospitalID = JSON.parse(localStorage.getItem("user"))[0]

    // Get Icu Info
    const [icu, setIcu] = useState([])
    async function getIcu(id) {
        const url = `http://localhost/backend/api/get-icu-count-forHospital.php?id=${id}`
        let { data } = await axios.get(url)
        setIcu(data.data)
    }
    useEffect(() => {
        getIcu(hospitalID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // Delete Icu 
    async function deleteIcu(id) {
        await axios.get(`http://localhost/backend/api/delete-icu.php?id=${id}`)
        getIcu(hospitalID);
    }
    // Alert Function
    async function deleteAlert(e) {
        let id = e.target.id;
        Swal.fire({
            title: "هــل أنــت مــتــأكد ؟",
            text: " سـيـتم حـذف العناية نـهـائـى ولـن يـتـم الـرجـوع",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33 ",
            cancelButtonText: "الــــغـــــاء",
            confirmButtonText: "أحـــــــــذف",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("تـــم الـــحـــذف!", "تم حذف ملفك.", "success");
                deleteIcu(id);
            }
        });
    }
    return (
        <>
            <section id='icuviwe' className='py-3'>
                <div className="container pt-2">
                    <h2 className='dashboard-title mb-2 t-icu-viwe'>العنايات المضافة </h2>
                    <div className="row pt-3 mt-3 g-3">
                        {icu.map((info, key) => (
                            <div className="col-lg-4 col-md-6 col-12" key={key}>
                                <div className='text-center border border-2 rounded rounded-2 border-primary py-4 px-2 shadow'>
                                    <h3>{info.specialization}</h3>
                                    <button className='btn btn-danger px-4 py-2 my-2' id={info.icu_code} onClick={deleteAlert} > حذف العناية </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
