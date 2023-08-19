import { useFormik } from "formik";
import Base from "../base/base";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export let mentorValidation = yup.object({
    mentor_name:yup.string().required("mentor name cannot be empty"),
    mentor_id:yup.string().required("mentor id cannot be empty"),
    email:yup.string().required("email cannot be empty"),
    student:yup.string().optional("enter assigned students name")
})

function AddMentor({mentorData, setMentorData}){
    let navigate = useNavigate();
    let [students, setStudents] = useState("");
    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            mentor_name:"",
            mentor_id:"",
            email:"",
            student:""
        },
        validationSchema:mentorValidation,
        onSubmit:(obj)=>{
            
            console.log(obj);
            // let res = students;
            // console.log(res.join(" "))
            // let val = document.querySelector(".assigned-students").value;
            // console.log(val);
            let mentorObj = {
                mentor_name:obj.mentor_name,
                mentor_id: +obj.mentor_id,
                mentor_email:obj.email,
                student:obj.student
            }
            console.log(mentorObj);
            updateMentorToDb(mentorObj);
            
        }
    })

    async function updateMentorToDb(obj){
        let result = await fetch("https://school-hbtw.onrender.com/add-mentor", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        setMentorData([...mentorData, output.out]);
        navigate("/mentors");
    }

    return (
        <div className="add-mentor-div">
            <Base
            title={"Fill below details to create new mentor"}>
                <form onSubmit={handleSubmit}>
                    <div className="stud">
                    <h5>CREATE A MENTOR</h5>
                    <div className="mentor-form">
                        <input type="text" placeholder="enter mentor name" name="mentor_name"
                        value={values.mentor_name}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                        {touched.mentor_name && errors.mentor_name ? <div style={{color:"crimson", fontSize:12+"px"}}>name cannot be empty</div>:""}
                        <input type="text" placeholder="enter mentor id" name="mentor_id"
                        value={values.mentor_id}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                        {touched.mentor_id && errors.mentor_id ? <div style={{color:"crimson", fontSize:12+"px"}}>id cannot be empty</div>:""}
                        <input type="text" placeholder="enter mentor email id" name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                        {touched.email && errors.email ? <div style={{color:"crimson", fontSize:12+"px"}}>email cannot be empty</div>:""}
                        <input type="text" placeholder="enter assigned students by space separated" name="student" className="assigned-students"
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                    </div>
                    <div className="mentor-create stud-btn-div">
                        <button type="submit" className="add-stud-btn mentor-btn">Create</button>
                    </div>
                    </div>
                </form>

            </Base>
        </div>
    )
}
export default AddMentor;