import { useFormik } from "formik";
import Base from "../base/base";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { mentorValidation } from "./addMentor";

function EditMentor({mentorData, setMentorData}){

    let navigate = useNavigate();
    let [studentArr, setStudentArr] = useState("");
    let {id} = useParams();
    id = +id;
    let mentor = mentorData.find((val)=>val.mentor_id==id);
    let studentsList = mentor.student.map((val)=>{
        return val.studentName;
    })
    let resultedStud = studentsList.join(" ");
    // console.log(studentsList);
    // setStudentArr(studentsList.join(" "));
    console.log(resultedStud);
    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            mentor_name:mentor.mentor_name,
            mentor_id:mentor.mentor_id,
            email:mentor.mentor_email,
            student:resultedStud
        },
        validationSchema:mentorValidation,
        onSubmit:(obj)=>{
            console.log(obj);
            EditMentor(obj);
        }
    })

    async function EditMentor(obj){
        let ind = mentorData.findIndex((val)=>val.mentor_id===id);
        // console.log(ind)

        let afterUpdate = await fetch(`https://school-hbtw.onrender.com/update-mentor`, {
            method:"PUT",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let result = await afterUpdate.json();
        obj.student = obj.student.split(" ");
        console.log(obj)
        let a  = obj.student.map((val)=>{
            return {studentName:val};
        })
        obj.student = a;
        console.log(obj)
        console.log(a)
        let finalObj = {
            mentor_id:obj.mentor_id,
            mentor_name:obj.mentor_name,
            mentor_email:obj.email,
            student:a
        }
        // console.log(obj)
        // console.log(mentorData)
        mentorData[ind]= finalObj;
        setMentorData([...mentorData]);
        navigate("/mentors")
    }
    return (
        <div className="edit-mentor-div">
            <Base
            title={"Fill below details to update mentor"}>
                <form onSubmit={handleSubmit}>
                    <div className="stud">
                    <h5>EDIT A MENTOR</h5>
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
                        value={values.student}
                        onChange={handleChange}
                        onBlur={handleBlur}/>
                    </div>
                    <div className="mentor-create stud-btn-div">
                        <button type="submit" className="add-stud-btn mentor-btn">Update</button>
                    </div>
                    </div>
                </form>

            </Base>
        </div>
    )
}
export default EditMentor;