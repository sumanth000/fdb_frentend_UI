
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,Switch
} from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import AdminPage from "../admin_page/AdminPage";
import { Navigate } from "react-router-dom";
import StudentPage from "../employee_page/studentPage";
import InstructorPage from "../instructor_page/instructorPage";
export default function Routing(){
    return (
        <div>
                <Router>
                <div className="App">
                    <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                        <Route
                            exact
                            path="/login"
                            element={<LoginPage />}
                        ></Route>
                        <Route
                            exact
                            path="/Instructor"
                            element={<InstructorPage />}
                        ></Route>
                        <Route
                            exact
                            path="/Student"
                            element={<StudentPage />}
                        ></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    )
}