

import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import { redirect, useLocation } from 'react-router-dom';
import './css_folder/employeePage.css';
import { Navigate } from 'react-router-dom';

import RegisteringPage from './registeringPage';
import BactchPage from './batchPage';
import RatingPage from './ratingScreen';


export default function StudentPage() {

    let [viewAttendanceScreen, setViewAttendanceScreen] = useState(true);
    let [viewPayStatsScreen, setViewPayStatsScreen] = useState(false);
    let [registeringScreen, setViewRegisteringScreen] = useState(false);
    let [viewLeavesHistoryScreen, setViewLeavesHistoryScreen] = useState(false);
    let [viewEnrollScreen, setViewEnrollScreen] = useState(false);



    const location = useLocation();
    const propData = location.state?.propData;

    let [errorLogin, setErrorLogin] = useState(false);




    let [employeeDbData, setEmployeeDbData] = useState([])
    let [empData, setEmpData] = useState([])
    let [empDataToShow, setEmpDataToShow] = useState([])
    let [studentJson, setStudentJson] = useState({})





    let columnHeaders = [
        { field: 'enrollment_id', headerName: 'Enrollment ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'student_id', headerName: 'Student ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'batch_id', headerName: 'Batch ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'enrollment_status', headerName: 'Enrollment Status', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'batch_name', headerName: 'Batch Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'course_id', headerName: 'Course ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'shift_detail', headerName: 'Shift Detail', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'shift_days', headerName: 'Shift Days', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'instructor_name', headerName: 'Instructor Name', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'course_code', headerName: 'Course Code', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'course_name', headerName: 'Course Name', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'course_credits', headerName: 'Course Credits', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'major_id', headerName: 'Major ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'major_name', headerName: 'Major Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programme_id', headerName: 'Programme ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'credits_completion', headerName: 'Credits Completion', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'grade', headerName: 'Grade', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programmeid', headerName: 'Programme ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programme_name', headerName: 'Programme Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programme_level', headerName: 'Programme Level', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'semester_batch_id', headerName: 'Sem-batch ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'semester_name', headerName: 'Semester Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { 
        //     field: 'actions',
        //     headerName: 'Actions', 
        //     flex: 1, 
        //     align: 'center', 
        //     headerAlign: 'center',
        //     renderCell: (params) => {
        //         const buttonStyle = {
        //             cursor: 'pointer',
        //             padding: '8px 16px',
        //             border: '1px solid #ccc',
        //             borderRadius: '4px',
        //             backgroundColor: '#f0f0f0',
        //             transition: 'background-color 0.3s',
        //             userSelect: 'none',
        //             outline: 'none',
        //         };
        //         return (
        //             <div    style={buttonStyle} 
        //              onClick={() => rating(params.row)}>
        //                 Click me
        //             </div>
        //         );
        //     }
        // },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                const grade = params.row.grade;
        
                const buttonStyle = {
                    cursor: 'pointer',
                    padding: '8px 16px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f0f0f0',
                    transition: 'background-color 0.3s',
                    userSelect: 'none',
                    outline: 'none',
                    opacity: grade === 'Yet to be graded' ? 0.5 : 1, 
                    cursor:grade === 'Yet to be graded' ? 'not-allowed' : 'pointer'
                };
        
                return (
                                <div    style={buttonStyle} 
                                 onClick={() => rating(params.row)}>
                                    Click me
                                </div>
                            );
            }
        }

    ];


    //functions
    const [rowData,setRowData] = useState({});
    const [viewratingScreen,setviewRatingScreen] = useState(false);
    let rating = (row) => {
        setviewRatingScreen(true);
        setViewAttendanceScreen(false);
        setViewPayStatsScreen(false);
        setViewRegisteringScreen(false);
        setViewLeavesHistoryScreen(false);
        setViewEnrollScreen(false);
        setRowData(row);
        console.log('row -----',row);
    }


    let viewEnrollScreenStats = () => {

        setViewAttendanceScreen(false);
        setViewPayStatsScreen(false);
        setViewRegisteringScreen(false);
        setViewLeavesHistoryScreen(false);
        setViewEnrollScreen(true);


    }




    let viewPayStats = () => {


        setViewAttendanceScreen(false);
        setViewPayStatsScreen(true);
        setViewRegisteringScreen(false);
        setViewLeavesHistoryScreen(false);



    }

    let viewLeaveStats = () => {


        setViewRegisteringScreen(true);
        setViewAttendanceScreen(false);
        setViewPayStatsScreen(false);
        setViewLeavesHistoryScreen(false);


    }
    let viewLeaveHistoryStats = () => {

        setViewLeavesHistoryScreen(true);
        setViewRegisteringScreen(false);
        setViewAttendanceScreen(false);
        setViewPayStatsScreen(false);


    }




    useEffect(() => {
        setEmpDataToShow(empData);
    }, [empData])


    const save_new_row_in_db = async (newRow) => {

        let payload = newRow;

        const response = await fetch('http://localhost:8081/ttp-application/saveEmployeeDetail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const dataJson = await response.json();

        console.log("data saved from the employee table", JSON.stringify(dataJson));
        fetchData(propData);
    }


    useEffect(() => {
        console.log('studentJson  ', studentJson);
    }, [studentJson])




    const fetchData = async (propData) => {

        console.log("##fetchData##", propData.userId)

        let payload = {
            userId: propData.userId
        }
        const response = await fetch('http://localhost:8081/fdb-application/getCoursesDetailsBasisPerson?personId=' + propData.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },


        });
        const dataJson = await response.json();

        console.log("data fetched from the employee table", JSON.stringify(dataJson));


        // {"courses":null,"courses_enrolled":false,"major_status":false,"programme_id":null,"programme_status":false,"major_id":null,"status":"FAILURE"}


        if (dataJson['status'] == "FAILURE" && dataJson['major_status'] == false) {
            alert('You are not enrolled in any programme. Please enroll first');
            setViewEnrollScreen();
        }

        else {

            setStudentJson(dataJson);

            let coursesData = dataJson['courses'];
            if(dataJson['courses'] && coursesData.length>0)
            {
                let dbData = coursesData.map((e, index) => { return { ...e, actId: index + 1, grade: e['grade'] != null ? e['grade'] : 'Yet to be graded' } });

                setEmployeeDbData(dbData);
    
                setEmpData(dbData);
            }
            
        }


    };


    useEffect(() => {
        if (propData) {
            console.log('propData##', propData);
            if (propData.id == null || propData.id == undefined || propData.id == "") {
                setErrorLogin(true);
            }

            fetchData(propData);//fetched data from the db

        }
    }, [propData])

    let backtoEmployeepage = () => {
        setviewRatingScreen(false);

        setViewAttendanceScreen(true);
        setViewPayStatsScreen(false);
        setViewRegisteringScreen(false);
        setViewLeavesHistoryScreen(false);
        setViewEnrollScreen(false);
        fetchData(propData);//fetched data from the db

    }

    if (errorLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='body'>

            <div className={empStyles.title}>STUDENT PAGE</div>

            {viewAttendanceScreen &&
                <div className={empStyles.tableContainer}>

                    <div className={empStyles.plusIcon} onClick={viewLeaveStats}>
                        <span className={empStyles.spanText}>REGISTER ROLE</span>

                    </div>





                    <div className={empStyles.viewIcon} onClick={viewEnrollScreenStats} >
                        <span className={empStyles.spanText}>ENROLL COURSE</span>

                    </div>

                    {/* <div className={empStyles.leaveIcon} onClick={viewPayStats}>
                        <span className={empStyles.spanText}>VIEW PAY</span>

                    </div> */}



                    {/* 
                <div className={empStyles.leaveHistoryIcon } onClick={viewLeaveHistoryStats}>
                    <span className={empStyles.spanText}>view history</span>

                </div> */}


                    <DataGrid

                        autoHeight
                        columns={columnHeaders}
                        rows={empDataToShow}
                        getRowId={(row) => row.actId}

                    >

                    </DataGrid>
                </div>

            }


           

            {
                viewratingScreen
                &&
                <RatingPage close={backtoEmployeepage} propData={propData} studentData={studentJson} editingRow={rowData}></RatingPage>

            }




            {
                viewEnrollScreen &&

                <BactchPage close={backtoEmployeepage} propData={propData} studentData={studentJson}></BactchPage>
            }

            {
                registeringScreen &&

                <RegisteringPage close={backtoEmployeepage} propData={propData} studentData={studentJson}></RegisteringPage>
            }


            {/* {
                viewLeavesHistoryScreen &&

                <LeavesHistory close={backtoEmployeepage} propData={propData} studentData={studentJson}></LeavesHistory>
            } */}




        </div>
    )
}


