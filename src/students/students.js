import { useContext } from "react";
import { datas } from "../App";
import Base from "../base/base";
import { useNavigate } from "react-router-dom";

function Students({studData,setStudData }){
    // let {studData,setStudData } = useContext(datas)
    let navigate = useNavigate();

    function EditData(id){
        navigate(`/edit/${id}`);
    }

    async function deletStudData(id){
        // console.log(typeof(id))
        let deleted = studData.filter((val)=>val.stud_id!==id);
        let result = await fetch(`https://school-hbtw.onrender.com/delete/${id}`, {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        let afterDelete = await result.json();
        setStudData(deleted)
        // console.log(afterDelete)
    }
    return (
        <div className="stud-div">
            <Base
            title = "Students Page">
            <div className="students">
            {studData.map((val, ind)=>(
                <div className="student" key={ind}>
                    <div className="stud-left">
                        <h4>{val.student_name}</h4>
                    </div>
                    <div className="stud-right">
                        <p>ID : <span>{val.stud_id}</span></p>
                        {/* {val.mentor ?<p>Mentor : <span>{val.new_mentor}</span></p>:} */}
                        <p>Previous Mentor : <span>{val.previous_mentor}</span></p>
                        <p>Previous Mentor ID : <span>{val.mentor_id}</span></p>
                        {val.newMentorAssigned == true? <p>Mentor Assigned : <span>Yes</span></p>:<p>Mentor Assigned <span>No</span></p>}
                        {val.new_mentor ? <p>current Mentor : <span>{val.new_mentor}</span></p>:<p>current Mentor <span>NA</span></p>}
                        {val.newMentorId ?<p>Current Mentor ID : <span>{val.newMentorId}</span></p>:<p>Current Mentor ID <span>NA</span></p>}
                        <div className="btns">
                            <button onClick={()=>EditData(val.stud_id)}>Edit</button>
                            <button onClick={()=>deletStudData(val.stud_id)}>Delete</button>
                            </div>
                    </div>
               </div>
            ))}
            </div>
            </Base>

        </div>
    )
}
export default Students;