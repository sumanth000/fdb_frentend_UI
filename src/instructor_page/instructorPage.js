

import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import { redirect, useLocation } from 'react-router-dom';
import './css_folder/employeePage.css';
import { Navigate } from 'react-router-dom';

import BactchPage from './batchPage';
import RatingPage from './subGradingBox';
import GradingPage from './gradingScreen';

export default function InstructorPage() {

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
        // { field: 'enrollment_id', headerName: 'Enrollment ID', flex: 1, align: 'center', headerAlign: 'center' },
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
        // { field: 'grade', headerName: 'Grade', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programmeid', headerName: 'Programme ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programme_name', headerName: 'Programme Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'programme_level', headerName: 'Programme Level', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'semester_batch_id', headerName: 'Sem-batch ID', flex: 1, align: 'center', headerAlign: 'center' },
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
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     flex: 1,
        //     align: 'center',
        //     headerAlign: 'center',
        //     renderCell: (params) => {
        //         const grade = params.row.grade;
        
        //         const buttonStyle = {
        //             cursor: 'pointer',
        //             padding: '8px 16px',
        //             border: '1px solid #ccc',
        //             borderRadius: '4px',
        //             backgroundColor: '#f0f0f0',
        //             transition: 'background-color 0.3s',
        //             userSelect: 'none',
        //             outline: 'none',
        //             opacity: grade === 'Yet to be graded' ? 0.5 : 1, 
        //             cursor:grade === 'Yet to be graded' ? 'not-allowed' : 'pointer'
        //         };
        
        //         return (
        //                         <div    style={buttonStyle} 
        //                          onClick={() => rating(params.row)}>
        //                             Click me
        //                         </div>
        //                     );
        //     }
        // }

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
        setEmpDataToShow(empData.map((e, index) => { return { ...e, actId: index + 1}}).filter((item)=>{
            return item.instructor_id==propData.id;
        }));
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



    const [batchesData,setBatchesData]=useState('')
    const [bathesForInstructorToEnroll,setBathesForInstructorToEnroll]=useState('')
    const fetchData = async (propData) => {

        console.log("##fetchData##", propData.userId)

        let payload = {
            userId: propData.userId
        }
        const response = await fetch('http://localhost:8081/fdb-application/batches', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },


        });
        const dataJson = await response.json();

        console.log("data fetched from the batches table ---", JSON.stringify(dataJson));


        // {"courses":null,"courses_enrolled":false,"major_status":false,"programme_id":null,"programme_status":false,"major_id":null,"status":"FAILURE"}
        

        setBatchesData(dataJson);


        setEmpData(dataJson);

        ///http://localhost:8081/fdb-application/batches

       const response1 = await fetch('http://localhost:8081/fdb-application/batches-instructor', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const dataJson1 = await response1.json();
        console.log('dataJson1',dataJson1);
        setBathesForInstructorToEnroll(dataJson1);



    };

    let [access,setAccess]=useState(false);
    let [instructor_programme_id,set_instructor_programme_id]=useState('');
    let fetchInstructorStatus = async (propData) => {
        
           // http://localhost:8081/fdb-application/check-instructor-enrollment?instructorId=11
        // result:{
        //     "programme_id": "1",
        //     "status": "true"
        // }  
        
        const response = await fetch('http://localhost:8081/fdb-application/check-instructor-enrollment?instructorId='+propData.id);
        const dataJson = await response.json();
        console.log('dataJson',dataJson);
        if(dataJson.status=='true')
        {
             set_instructor_programme_id(dataJson.programme_id);
              setAccess(true);  
        }
        else
        {
         setAccess(false);
            alert('Enroll into the department ,contact university admin for more details')
            setEmpData([]);
        }
    }

    useEffect(() => {

        // http://localhost:8081/fdb-application/check-instructor-enrollment?instructorId=11
        // {
        //     "programme_id": "1",
        //     "status": "true"
        // }

        fetchInstructorStatus(propData);
       

       
    }, [propData])
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

    let filterData=(e,value)=>{
     console.log(value);
     if(value=='show_all')
     {
        setEmpDataToShow(empData.map((e, index) => { return { ...e, actId: index + 1}}))
     }
     else if(value=='enrolled')
     {
        setEmpDataToShow(empData.map((e, index) => { return { ...e, actId: index + 1}}).filter((item)=>{
            return item.instructor_id==propData.id;
        }));
     }
    }

    if (errorLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className='body'>

            <div className={empStyles.title}>INSTRUCTOR PAGE</div>

            {viewAttendanceScreen && access &&
                <div className={empStyles.tableContainer}>

                    <div className={empStyles.plusIcon} onClick={viewEnrollScreenStats}>
                        <span className={empStyles.spanText}>REGISTER BATCH</span>

                    </div>





                    <div className={empStyles.viewIcon} onClick={viewLeaveStats} >
                        <span className={empStyles.spanText}>GRADE SCREEN</span>

                    </div>

                    {/* <div className={empStyles.leaveIcon} onClick={viewPayStats}>
                        <span className={empStyles.spanText}>VIEW PAY</span>

                    </div> */}



                    {/* 
                <div className={empStyles.leaveHistoryIcon } onClick={viewLeaveHistoryStats}>
                    <span className={empStyles.spanText}>view history</span>

                </div> */}

                    <div className={empStyles.filtering_section}>
                        <div className={empStyles.filtering_button} onClick={(e)=>{filterData(e,'enrolled')}}>
                        Scheduled 
                        </div>

                        <div  className={empStyles.filtering_button} onClick={(e)=>{filterData(e,'show_all')}} >
                        Show all
                        </div>
                    </div>


                    <DataGrid

                        autoHeight
                        columns={columnHeaders}
                        rows={empDataToShow}
                        getRowId={(row) => row.actId}

                    >

                    </DataGrid>
                </div>

            }


           

            {/* {
                viewratingScreen
                &&
                <RatingPage close={backtoEmployeepage} propData={propData} studentData={studentJson} editingRow={rowData}></RatingPage>

            } */}




            {
                viewEnrollScreen &&

                <BactchPage close={backtoEmployeepage} propData={propData} studentData={studentJson} bathesForInstructorToEnroll={bathesForInstructorToEnroll} instructor_programme_id={instructor_programme_id}></BactchPage>
            }

            {
                registeringScreen &&

                <GradingPage close={backtoEmployeepage} propData={propData} studentData={studentJson}  ></GradingPage>
            }


            {/* {
                viewLeavesHistoryScreen &&

                <LeavesHistory close={backtoEmployeepage} propData={propData} studentData={studentJson}></LeavesHistory>
            } */}




        </div>
    )
}


