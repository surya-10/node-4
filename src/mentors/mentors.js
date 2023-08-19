import { useNavigate } from "react-router-dom";
import Base from "../base/base";

function Mentor({mentorData, setMentorData}){
    let navigate = useNavigate();
    // console.log(mentorData);

    function editMentor(id){
        navigate(`/edit-mentor/${id}`)
    }

    async function deleteMentor(id){

        let finalMentors = mentorData.filter((val)=>val.mentor_id!==id);
        let result = await fetch(`https://school-hbtw.onrender.com/delete-mentor/${id}`, {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            }
        })
        let out = await result.json();
        console.log(out);
        setMentorData(finalMentors);
        console.log(finalMentors)
    }
    return (
        <div className="mentor-div">
            <Base
            title={"You can find all mentors in this page"}>
                <div className="mentors">
                    {mentorData.map((val, ind)=>(
                        <div className="mentor" key={ind}>
                        <div className="ment-left">
                            <h3>{val.mentor_name}</h3>
                        </div>
                        <div className="ment-right">
                            <p>ID : {val.mentor_id}</p>
                            <p>email : {val.mentor_email}</p>
                            <div className="assigned-stud">
                            {val.student.length>0 ?
                            <div>
                                <p>Assigned Students</p>
                            <ol>{val.student.map((ele, ind)=>(
                                 <li key={ind}>{ele.studentName}</li>
                            ))}</ol>
                            </div>
                            : <div>Assigned Students : 0</div>}
                            </div>
                            <div className="btns">
                                <button onClick={()=>editMentor(val.mentor_id)}>Edit</button>
                                <button onClick={()=>deleteMentor(val.mentor_id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Base>

        </div>
    )
}
export default Mentor;