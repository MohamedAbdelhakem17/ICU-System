import axios from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
export default function Analysis({ users }) {
    const docName = useRef();
    const title = useRef();
    const analysis = useRef();
    let hospital_id = localStorage.getItem("user");
    hospital_id = JSON.parse(hospital_id)[0];
    const [id, setId] = useState(0);
    function getSelectedValue() {
        const selectElement = document.getElementById("user_id");
        const selectedValue = selectElement.value;
        setId(selectedValue);
    }
    function getData() {
        let formData = new FormData();
        formData.append(`id`, id);
        formData.append(`docName`, docName.current.value);
        formData.append(`title`, title.current.value);
        formData.append(`hospital_id`, hospital_id);
        formData.append(`analysis`, analysis.current.files[0]);
        return formData;
    }
    const [spin, setSpin] = useState(false)
    // Send Data To Database
    async function sendData(e) {
        e.preventDefault();
        setSpin(true)
        let formData = getData();
        let url = `http://localhost/backend/api/add_analysis.php`;
        let { data } = await axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        if (data.status) {
            Swal.fire({
                title: "نــجـــح ",
                text: data.message,
                icon: "success",
                confirmButtonText: "موافق",
            });
            setSpin(false)

        } else {
            Swal.fire({
                title: "فـــشــل",
                text: "خطأ فى الادخال",
                icon: "error",
                confirmButtonText: "موافق",
            });
            setSpin(false)
            console.log(data)
            console.log(id)

        }
    }


    return (
        <>
            <form className="w-100" onSubmit={sendData}>
                <fieldset className="scheduler-border">
                    <legend className="scheduler-border">أضافة الـتـحـالـيـل</legend>
                    <select className="form-select mt-4" id="user_id" onChange={getSelectedValue}>
                        <option defaultValue>أختار أسم المريض</option>
                        {
                            users.map((user, key) => (
                                <option key={key} value={user.id}>{user.name}</option>
                            ))
                        }
                    </select>
                    <div className="form-group my-2">
                        <label htmlFor="docName" className="p-2 h6">
                            أســـم الــطــبــيــب
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="docName"
                            name="docName"
                            placeholder=" أدخل أسم الطبيب "
                            ref={docName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title" className="p-2 h6">
                            التحليل
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder=" أدخل أسم التحليل "
                            ref={title}
                        />
                    </div>
                    <div className="form-group mt-4">
                        <label htmlFor="analysis" className="p-2 h6">
                            الـتـحـلـيـل
                        </label>
                        <input
                            type="file"
                            className="form-control-file border border-2 border-primary p-2 rounded w-100"
                            id="analysis"
                            name="analysis"
                            ref={analysis}
                        />
                    </div>

                    {(spin) ? <button className="btn py-2 px-4 btn-primary"><i className="fa-solid fa-spinner  fa-spin"></i></button> :
                        <button type="submit" className="btn btn-primary my-4 custom-btn">
                            أضــافــة
                        </button>
                    }
                </fieldset>
            </form>
        </>
    );
}
