
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DataGrid } from '@mui/x-data-grid';
import RatingPage from './subGradingBox';



let GradingPage = (params) => {

    const [alreadyRegistered, setAlreadyRegistered] = useState(false);

    let { close, propData, studentData, bathesForInstructorToEnroll } = params;

    let [majorData, setMajorData] = useState([]);

    let [batchs_data_for_instructor_to_enroll, setBatchs_data_for_instructor_to_enroll] = useState([]);
    let [empData, setEmpData] = useState([])
    let [empDataToShow, setEmpDataToShow] = useState([])
    let fetchEnrolledStudents = async () => {

        const response = await fetch('http://localhost:8081/fdb-application/instructor-students?instructorId=' + propData.id);
        const dataJson = await response.json();
        console.log('dataJson of instructor students', dataJson);
        if (dataJson) {
            setEmpData(dataJson);
        }
    }

    useEffect(() => {
        //add actid index to each object
        setEmpDataToShow(empData.map((e, index) => {
            return { ...e, actId: index + 1, grade: e['grade'] != null ? e['grade'] : 'Yet to be graded' }
        }))

    }, [empData])
    useEffect(() => {
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.person_id = propData.id;
            return prevObj;
        })

        fetchEnrolledStudents();
    }, [propData])
    let columnHeaders = [
        { field: 'enrollment_id', headerName: 'Enrollment ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'student_id', headerName: 'Student ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'enrollment_status', headerName: 'Enrollment Status', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'semester_batch_id', headerName: 'Semester Batch ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'semester_name', headerName: 'Semester Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'batch_id', headerName: 'Batch ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'instructor_id', headerName: 'Instructor ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'batch_name', headerName: 'Batch Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'course_id', headerName: 'Course ID', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'shift_detail', headerName: 'Shift Detail', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'shift_days', headerName: 'Shift Days', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'instructor_name', headerName: 'Instructor Name', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'course_code', headerName: 'Course Code', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'course_name', headerName: 'Course Name', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'course_credits', headerName: 'Course Credits', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'major_id', headerName: 'Major ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'student_name', headerName: 'Student Name', flex: 1, align: 'center', headerAlign: 'center' },

        // { field: 'address', headerName: 'Address', flex: 1, align: 'center', headerAlign: 'center' },
        // { field: 'mail', headerName: 'Email', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'grade', headerName: 'Grade', flex: 1, align: 'center', headerAlign: 'center' },
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
                    // opacity: grade === 'Yet to be graded' ? 0.5 : 1, f
                    // cursor:grade === 'Yet to be graded' ? 'not-allowed' : 'pointer'
                };

                return (
                    <div style={buttonStyle}
                        onClick={() => gradingFunction(params.row)}>
                        Add Grade
                    </div>
                );
            }
        }
    ];
    const [rowData, setRowData] = useState({});

    let gradingFunction = (row) => {
        setRowData(row);

        // console.log('row', row);

        setviewGradeSubmit(true);
        setViewGradingBoxRows(false);

    }
    useEffect(() => {

        if (bathesForInstructorToEnroll) {


            setBatchs_data_for_instructor_to_enroll(bathesForInstructorToEnroll);

        }
        console.log('bathesForInstructorToEnroll ---->   ', bathesForInstructorToEnroll);
    }, [bathesForInstructorToEnroll]);


    let fetchMajorData = async () => {
        const response = await fetch('http://localhost:8081/fdb-application/majors');

        const responsejson = await response.json();
        setMajorData(responsejson)
        console.log("majors data ----- " + JSON.stringify(responsejson));
    }

    useEffect(() => {

        fetchMajorData();


    }, [params])



    let [value, setValue] = useState();

    let [payload, setPayload] = useState({

        major_id: '',
        major_name: '',
        programme_id: '',
        programme_name: '',
        programme_level: '',

    })

    let [startDt, setStartDt] = useState('');
    let [endDt, setEndDt] = useState('');

    let submitFunction = async () => {

        console.log('payload  ', payload);


        const response = await fetch('http://localhost:8081/fdb-application/programme-enrollment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });




        const responsejson = await response.json();

        console.log(responsejson);

        if (responsejson) {

            if (responsejson.status == "BAD_REQUEST") {

                alert(responsejson.message);

            }
            if (responsejson.status == "SUCCESS") {
                alert('Enrollment request submitted successfully');
            }
        }
        // console.log(responsejson);
        // // {
        // //     "success": false,
        // //     "message": "Leave dates clash with existing leaves."
        // // }
        // if (responsejson) {
        //     if (responsejson.success == false) {
        //         alert(responsejson.message);
        //     }
        //     if (responsejson.success == true) {
        //         alert('Leave request submitted successfully');
        //     }
        // }
        // console.log('submitted leaves')
    }

    let handleChange = (name, value) => {
        if (name == 'reason') {
            console.log('name', name);
            console.log('value', value);

            setPayload((prev) => {
                let prevObj = { ...prev };
                prevObj.reason = value;
                return prevObj;

            })
        }
        else {

            if (name == "startDate") {
                //get value in format of 2024/04/03
                let date = value.format('YYYY-MM-DD');
                setStartDt(date);

                setPayload((prev) => {
                    let prevObj = { ...prev };
                    prevObj.startDate = date;
                    return prevObj;

                })
                console.log('start date', date);
            }

            if (name == "endDate") {
                //get value in format of 2024/04/03
                let date = value.format('YYYY-MM-DD');
                setEndDt(date);
                console.log('end date', date);

                setPayload((prev) => {
                    let prevObj = { ...prev };
                    prevObj.endDate = date;
                    return prevObj;
                });

            }
            console.log(name);
            console.log(value);
        }


    }

    let selectProgramme = (event) => {
        console.log(event);
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('data-programme-id');
        const programmeName = selectedOption.value;


        console.log("programme name selected", programmeName, ', ', id);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.programme_name = programmeName;
            prevObj.programme_id = id;
            return prevObj;
        })
    }

    useEffect(() => {
        console.log('payload ', payload);
    }, [payload])


    let selectMajor = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('data-major-id');
        const majorName = selectedOption.value;
        // let majorName = event.target.value;
        // const id = event.target.options[event.target.selectedIndex].getAttribute('key');
        console.log("major name selected", majorName, ', ', id);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.major_name = majorName;
            prevObj.major_id = id;
            return prevObj;
        })
    }

    let [viewGradingboxRows, setViewGradingBoxRows] = useState(true);
    let [viewGradeSubmit, setviewGradeSubmit] = useState(false);

    let selectProgrammelevel = (event) => {
        let level = event.target.value;
        console.log("programme level  selected", level);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.programme_level = level;
            return prevObj;
        })
    }

    let getBackToGradingRows = () => {
        setviewGradeSubmit(false);
        setViewGradingBoxRows(true);
        fetchEnrolledStudents();
    }

    return (

        <div className={empStyles.body}>
            {
                    viewGradingboxRows &&
            <div className={empStyles.closeButton}>
                <button onClick={close}>Back</button>

            </div>
} 
            <div className={empStyles.gradeContainer}>



                <div className={empStyles.leavesPageHeading} >Grade Students</div>

                {
                    viewGradingboxRows &&
                    <DataGrid

                        autoHeight
                        columns={columnHeaders}
                        rows={empDataToShow}
                        getRowId={(row) => row.actId}

                    >

                    </DataGrid>
                }

                {
                    viewGradeSubmit &&
                    <div>
                        <RatingPage close={getBackToGradingRows} rowData={rowData}></RatingPage>
                    </div>
                }



            </div>


        </div>
    )
}

export default GradingPage;