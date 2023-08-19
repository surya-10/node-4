import { useFormik } from "formik";
import Base from "../base/base";
import { useNavigate, useParams } from "react-router-dom";
import { userValidation } from "./addStudent";

function Editstudent({studData, setStudData}){
    let navigate = useNavigate();

    let {id} = useParams();
    id = +id;
    // console.log(id)
    let editedStud = studData.find((val)=>val.stud_id==id);
    // console.log(editedStud)

    let {values, handleChange, handleSubmit, handleBlur, errors, touched} = useFormik({
        initialValues:{
            studentName:editedStud.student_name,
            studentId:editedStud.stud_id,
            previousMentor:editedStud.previous_mentor,
            previousMentorId:editedStud.mentor_id,
            newMentor:editedStud.new_mentor,
            newMentorId:editedStud.newMentorId
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
            // console.log(studObj);
            updateToDb(studObj);
        }

    })

    async function updateToDb(stud){
        let ind = studData.findIndex((val)=>val.stud_id===id);
        console.log(ind);
        let res = await fetch(`https://school-hbtw.onrender.com/edit-stud`,{
            method:"PUT",
            body:JSON.stringify(stud),
            headers:{
                "content-type":"application/json"
            }
        })
        let out = await res.json();
        console.log(out);
        studData[ind] = stud;
        console.log(studData);
        setStudData([...studData]);
        navigate("/students");

    }
    return (
        <div className="edit-div">
            <Base
            title="Edit below details">
                <form onSubmit={handleSubmit}>
            <div className="stud">
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
                    <input type="text" placeholder="enter new mentor" name="newMentor" className="new-ment" value={values.newMentor}/>
                    <input type="text" placeholder="enter new mentor id" name="newMentorId" className="new-ment-id" value={values.newMentorId}/>
                    <div>
                    <label>New Mentor Assigned ?</label>
                    <select>
                        <option value={"yes"} className="selected">Yes</option>
                        <option value={"no"} className="selected" selected>No</option>
                    </select>
                    </div>
                </div>
                <div className="stud-btn-div">
                <button className="add-stud-btn" type="submit">Update</button>
                </div>
                </div>
                </form>
            </Base>

        </div>
    )
}
export default Editstudent;