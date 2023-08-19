import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Base({title, children}) {
    let navigate = useNavigate();

    let [show, setShow] = useState(true);
    function changeColor(){
        let a = document.querySelectorAll(".nav-color");
        for(let i=0; i<a.length; i++){
            a[i].style.color="white";
        }
        
    }

    return (
        <div className="base-div">
            <div className="base-main">
                <div className="top-menu">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary my-nav">
                        <div className="container-fluid color-div">
                            <a className="navbar-brand nav title-nav" href="#">Data</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll " style={{"--bs-scroll-height": 200+"px"}}>
                                    {/* <li class="nav-item">
                                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                                    </li> */}
                                    {/* <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li> */}
                                    <li className="nav-item dropdown" onClick={changeColor}>
                                        <button className="nav-link dropdown-toggle nav nav-color" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            students
                                        </button>
                                        <ul className="dropdown-menu menu-drop">
                                            <li onClick={()=>navigate("/students")}><button className="dropdown-item">Dashboard</button></li>
                                            <li onClick={()=>navigate("/add-student")}><button className="dropdown-item">Create Student</button></li>
                                            
                                            {/* <li><hr class="dropdown-divider" /></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown" onClick={changeColor}>
                                        <button className="nav-link dropdown-toggle nav nav-color" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Mentors
                                        </button>
                                        <ul className="dropdown-menu menu-drop">
                                        <li onClick={()=>navigate("/mentors")}><button className="dropdown-item">Dashboard</button></li>
                                         <li onClick={()=>navigate("/add-mentor")}><button className="dropdown-item">Create Mentor</button></li>
                                            
                                            {/* <li><hr class="dropdown-divider" /></li>
                                            <li><a class="dropdown-item" href="#">Something else here</a></li> */}
                                        </ul>
                                    </li>
                                    {/* <li class="nav-item">
                                        <a class="nav-link disabled" aria-disabled="true">Link</a>
                                    </li> */}
                                </ul>
                                {/* <form class="d-flex" role="search">
                                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button class="btn btn-outline-success" type="submit">Search</button>
                                </form> */}
                            </div>
                        </div>
                    </nav>
                    {/* <div className="base-info">
                    <h2>Go to Student page to create new Student</h2>
                    <h2>Go to Mentor page to create new Mentor</h2>
                    </div> */}
                </div>
                <div className="right-div">
                    <div className="right-inside">
                        <h2></h2>
                        <div className="right-children">
                            <h2 className="base-title">{title}</h2>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Base;