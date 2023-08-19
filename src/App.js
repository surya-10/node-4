import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import Base from './base/base';
import Students from './students/students';
import { Route, Routes } from 'react-router-dom';
import AddStudent from './students/addStudent';
import Editstudent from './students/editStudent';
import Home from './dashboard/dashboard';
import Mentor from './mentors/mentors';
import AddMentor from './mentors/addMentor';
import EditMentor from './mentors/editMentor';


export const datas = createContext()
function App() {
  let [studData, setStudData] = useState([])
  let [mentorData, setMentorData] = useState([]);

  useEffect(()=>{
    async function getAllStudents(){
      let students = await fetch("https://school-hbtw.onrender.com/students/all", {
        method:"GET"
      })
      let stud = await students.json();
      setStudData(stud);
    }
    getAllStudents()

    async function getAllMentor(){
      let mentors = await fetch("https://school-hbtw.onrender.com/all-mentors", {
        method:"GET",
        headers:{
          "content-type":"application/json"
        }
      })
      let ment = await mentors.json();
      // console.log(ment)
      setMentorData(ment);
    }
    getAllMentor()
  }, [])
  // console.log(studData)

 
  return (
    <div className="App">
      <Routes>
        <Route exact path="/"  element={<Home/>}/>
        <Route path="/students" element={<Students
        studData={studData}
        setStudData={setStudData}
        />}/>
        <Route path="/add-student" element={<AddStudent
        studData={studData}
        setStudData={setStudData}/>
        }/>
        <Route path='edit/:id' element={<Editstudent
        studData={studData}
        setStudData={setStudData}/>}/>
        <Route path='/mentors' element={<Mentor
        mentorData = {mentorData}
        setMentorData={setMentorData}/>}/>
        <Route path='/add-mentor' element={<AddMentor
        mentorData = {mentorData}
        setMentorData={setMentorData}/>}/>
        <Route path='edit-mentor/:id' element={<EditMentor
        mentorData = {mentorData}
        setMentorData={setMentorData}/>}/>
      </Routes>
    </div>

  );
}

export default App;
