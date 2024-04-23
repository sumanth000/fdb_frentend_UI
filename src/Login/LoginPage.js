import './css_folder/LoginPage.css'
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import empCredData from '../data_folders/employeeCredentials.json'
// import  adminCredData from '../data_folders/adminCredentials.json'
import axios from 'axios';
export default function LoginPage() {
    let credentialsObject = {
        who: 'student',
        password: '',
        userId: '',
        employeeId: ''

    }


    let [logInSuccess, setLogInSuccess] = useState(false);

    let [logInSuccessAsInstructor, setLogInSuccessAsInstructor] = useState(false);
    let [logInSuccessAsStudent, setLogInSuccessAsStudent] = useState(false);


    let [selectAsStudent, setSelectAsStudent] = useState(true);
    let [selectAsInstructor, setSelectAsInstructor] = useState(false);


    let [userId, setUserId] = useState('');
    let [password, setPassword] = useState('');
    let [logInAsData, setLogInAsData] = useState('');
    let [credentials, setCredentials] = useState(credentialsObject);

    //effect for the person type
    

    let [instructorPersonClass, setInstructorPersonClass] = useState('person');
    let [studentPersonClass, setstudentPersonClass] = useState('personActive');


    //effect for the username and password on the input
    let [focusAndValueExistClassUserId, setFocusAndValueExistClassUserId] = useState('label');
    let [focusAndValueExistClassPassword, setFocusAndValueExistClassPassword] = useState('label');

    let handleFocus = (id) => {
        if (id === "password") {
            setFocusAndValueExistClassPassword('label entering');
        }
        else if (id === "userId") {
            setFocusAndValueExistClassUserId('label entering');
        }

    }

    let handleBlur = () => {

        if (password.length === 0)
            setFocusAndValueExistClassPassword('label');

        if (userId.length === 0)
            setFocusAndValueExistClassUserId('label');

    }

    let handleChange = (value, id) => {


        if (id === "password") {
            setPassword(value);

            setCredentials({ ...credentials, password: value })
        }

        if (id === "userId") {
            setUserId(value);
            setCredentials({ ...credentials, userId: value })

        }


    }
    let selectAs = (event) => {
        let id = event.target.id;
        if (id === "instructor") {
           
            setSelectAsStudent(false);
            setSelectAsInstructor(true);
            setCredentials({ ...credentials, who: 'instructor' })
            
           

            setstudentPersonClass('personActive');
            setInstructorPersonClass('person')

            // document.documentElement.style.setProperty('--box-background','linear-gradient(45deg,#637da5,rgb(152, 172, 186))')
            document.documentElement.style.setProperty('--box-background', getComputedStyle(document.documentElement).getPropertyValue('--instructor-box-background'))

        }

        if (id === "student") {
            setSelectAsStudent(true);
            setSelectAsInstructor(false);
            setCredentials({ ...credentials, who: 'student' })

            setstudentPersonClass('personActive');
            setInstructorPersonClass('person')
         

            document.documentElement.style.setProperty('--box-background', getComputedStyle(document.documentElement).getPropertyValue('--student-box-background'))


        }



    }

    // let checkCredentialsOfEmployee = () => {

    //     console.log("userid   ", userId, " password ", password)

    //     if (empCredData.find((e) => { return e.password == password && e.userId == userId })) {
    //         setLogInSuccessAsEmployee(true);
    //     }


    // }


    // let logInAndFetchCookie=async()=>{


    //     console.log(credentials.who, '#', credentials.userId, '#', credentials.password);

    //     let response = await fetch('http://localhost:8081/ttp-application/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     });

    //     let responseJson = await response.json();

    //     if(credentials.who=="employee" && responseJson['status']=="SUCCESS")
    //     setLogInSuccessAsEmployee(true);
    //     if(credentials.who=="admin" && responseJson['status']=="SUCCESS")    
    //     setLogInSuccessAsAdmin(true);


    //     console.log('response',responseJson );
    // }

    const logInAndFetchCookie = async () => {
        console.log(credentials.who, '#', credentials.userId, '#', credentials.password);
    
        try {
            const response = await fetch('http://localhost:8081/fdb-application/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include' // Include credentials (cookies)
            });
    
            // Assuming responseJson contains the login status
            const responseJson = await response.json();

            console.log('response', responseJson);
            console.log('Received cookies:', document.cookie);
    
            // Set login success based on user type
            if(responseJson.status === 'FAILURE'){
                console.log('Login failed');
                alert('Login failed');
            }
            else if (credentials.who === 'student' && responseJson.status === 'SUCCESS') {
                setCredentials({ ...credentials, id: responseJson.id});
                setLogInSuccessAsStudent(true);
            } else if (credentials.who === 'instructor' && responseJson.status === 'SUCCESS') {
                setCredentials({ ...credentials, id: responseJson.id});
                setLogInSuccessAsInstructor(true);
            }
    
            console.log('Login successful');
        } catch (error) {
            // Handle fetch error
            console.error('Error logging in:', error);
        }
    };


    

    //useEffects
    const rootStyles = getComputedStyle(document.documentElement);

    useEffect(() => {
        console.log('useeffect -->', credentials);
    }, [credentials])


    useEffect(() => {
        // const rootStyles = getComputedStyle(document.documentElement);
        // const color = rootStyles.getPropertyValue('--box-background');
        // console.log(color);

    }, [])


    if (logInSuccessAsInstructor) {
        return <Navigate to="/Instructor" state={{ propData: credentials }} />;
    }

    if (logInSuccessAsStudent) {
        return <Navigate to="/Student" state={{ propData: credentials }} />;
    }
    return (

        <div className="body">
            <div className='background'>
            </div>


            <div className="container">


                <div className="who">

                    <div onClick={selectAs} className={studentPersonClass} id="student">
                        <input type='radio' checked={selectAsStudent} readOnly id="student"></input>
                        STUDENT
                    </div>


                    <div onClick={selectAs} className={instructorPersonClass} id="instructor">
                        <input type='radio' checked={selectAsInstructor} readOnly id="instructor"></input>
                        INSTRUCTOR
                    </div>
                </div>

                <div className="information">

                    <div className={focusAndValueExistClassUserId}>USER ID</div>
                    <input onFocus={() => handleFocus('userId')} onBlur={handleBlur} onChange={(e) => handleChange(e.target.value, 'userId')} className="inputSpace"></input>


                </div>

                <div className="information">
                    <div className={focusAndValueExistClassPassword}>PASSWORD</div>
                    <input type='password' onFocus={() => handleFocus('password')} onBlur={handleBlur} onChange={(e) => handleChange(e.target.value, 'password')} className="inputSpace"></input>
                </div>

                {/* <div className="buttonSpace">
                    <div
                        onClick={logInAs} className="loginButton">
                        LOGIN
                    </div>
                </div> */}

                <div className="buttonSpace">
                    <div
                        onClick={logInAndFetchCookie} className="loginButton">
                        LOGIN
                    </div>
                </div>


            </div>
        </div>

    )

}