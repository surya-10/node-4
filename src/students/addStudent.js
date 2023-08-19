import { useFormik } from "formik";
import Base from "../base/base";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export const userValidation = yup.object({
    studentName:yup.string().required("Enter student name"),
    studentId: yup.string().required("Enter student ID"),
    previousMentor:yup.string().required("Enter your previous mentor"),
    previousMentorId: yup.string().required("Enter previous mentor id")
})

function AddStudent({studData, setStudData}){
    let navigate = useNavigate();

    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            studentName:"",
            studentId:"",
            previousMentor:"",
            previousMentorId:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            let val = document.querySelectorAll(".selected");
            let out = false;
            let value = "no"
            val.forEach((ele)=>{
                if(ele.selected==true){
                    value = ele.value;
                }
            })
            if(value==="yes"){
                out = true;
            }
            else{
                out= false;
            }
            let newMentor= document.querySelector(".new-ment").value;
            let newMentorID = document.querySelector(".new-ment-id").value;
            obj.newMentorAssigned = out;
            obj.newMentor = newMentor;
            obj.studentId = +(obj.studentId);
            obj.previousMentorId = +(obj.previousMentorId);
            obj.newMentorId = + newMentorID;
            let studObj = {
                "mentor_id":obj.previousMentorId,
                "newMentorAssigned":obj.newMentorAssigned,
                "newMentorId":obj.newMentorId,
                "new_mentor":obj.newMentor,
                "previous_mentor":obj.previousMentor,
                "stud_id":obj.studentId,
                "student_name":obj.studentName
            }
            addToDB(studObj);
        }
    })

    async function addToDB(studObj){
        let out = await fetch("https://school-hbtw.onrender.com/add-student", {
            method:"POST",
            body:JSON.stringify(studObj),
            headers:{
                "content-type":"application/json"
            }
        })
        // console.log(out);
        let addedStud = await out.json();
        console.log(addedStud)
       setStudData([...studData, addedStud.data]);
       console.log(studData);
       navigate("/students");
    }
    return (
        <div className="add-student">
            <Base
            title="In this page you can create new student">
            <form onSubmit={handleSubmit}>
            <div className="stud">
                <h5>Fill Below Details</h5>
                <div className="student-form">
                    
                    <input type="text" placeholder="Enter Student Name" name="studentName"
                    value={values.studentName}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    {errors.studentName && touched.studentName ?<div style={{color:"crimson", fontSize:12+"px"}}>name cannot be empty</div>:""}
                    <input type="text" placeholder="Enter Student ID" name="studentId"
                    value={values.studentId}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    {errors.studentId && touched.studentId ?<div style={{color:"crimson", fontSize:12+"px"}}>student ID cannot be empty</div>:""}
                    <input type="text" placeholder="Enter your previous mentor" name="previousMentor"
                    value={values.previousMentor}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    {errors.previousMentor && touched.previousMentor ?<div style={{color:"crimson", fontSize:12+"px"}}>previous mentor name cannot be empty</div>:""}
                    <input type="text" placeholder="Enter previous mentor ID" name="previousMentorId"
                    value={values.previousMentorId}
                    onChange={handleChange}
                    onBlur={handleBlur}/>
                    {errors.previousMentorId && touched.previousMentorId ?<div style={{color:"crimson", fontSize:12+"px"}}>previous mentor ID cannot be empty</div>:""}
                    <input type="text" placeholder="enter new mentor" name="new-ment" className="new-ment"/>
                    <input type="text" placeholder="enter new mentor id" name="new-ment-id" className="new-ment-id"/>
                    <div>
                    <label>New Mentor Assigned ?</label>
                    <select>
                        <option value={"yes"} className="selected">Yes</option>
                        <option value={"no"} className="selected">No</option>
                    </select>
                    </div>
                </div>
                <div className="stud-btn-div">
                <button className="add-stud-btn" type="submit">Create</button>
                </div>
            </div>
            </form>
            </Base>
        </div>
    )
}
export default AddStudent;