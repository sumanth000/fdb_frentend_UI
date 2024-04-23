
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



let BactchPage = (params) => {


    let { close, propData, studentData, bathesForInstructorToEnroll, instructor_programme_id } = params;
    let [batchesData, setBatchesData] = useState([]);
    let [batchs_data_for_instructor_to_enroll, setBatchs_data_for_instructor_to_enroll] = useState([]);

    let [majorData, setMajorData] = useState([]);

    useEffect(() => {
        console.log('instructor_programme_id', instructor_programme_id);

        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.programme_id = instructor_programme_id;
            return prevObj;
        });




    }, [instructor_programme_id])

    let fetchBatches = async () => {

        // http://localhost:8081/fdb-application/batches
        const response = await fetch('http://localhost:8081/fdb-application/batches');

        const responsejson = await response.json();

        console.log("batches data ----- " + JSON.stringify(responsejson));



        setBatchesData(responsejson);
        if (responsejson) {
            console.log('batchesData ---setting @', batchesData);
        }






    }


    useEffect(() => {

        // console.log('batchesData', batchesData);
        // let programme_name=batchesData.filter(item=> item.programme_id==instructor_programme_id)[0].programme_name;
        // console.log(" filtered it a bbit for programme name ", batchesData.filter(item=> item.programme_id==instructor_programme_id));
        // setPayload((prev) => {
        //     let prevObj = { ...prev };
        //     prevObj.programme_name = programme_name;
        //     return prevObj;
        // })

    }, [batchesData]);
    useEffect(() => {
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.person_id = propData.id;
            prevObj.instructor_id=propData.id;

            return prevObj;
        })

        console.log("propData", propData);


        fetchBatches();
    }, [propData])
    useEffect(() => {

        if (bathesForInstructorToEnroll) {


            setBatchs_data_for_instructor_to_enroll(bathesForInstructorToEnroll);

        }
        console.log('bathesForInstructorToEnroll ---->   ', bathesForInstructorToEnroll);
    }, [bathesForInstructorToEnroll]);

    // useEffect(() => {
    //     console.log('student data @@@ ', studentData);

    //     if (studentData['status'] === 'SUCCESS') {

    //         setPayload((prev) => {
    //             let prevObj = { ...prev };
    //             prevObj.major_id = studentData['major_id'];
    //             prevObj.major_name = studentData['major_name'];
    //             prevObj.programme_id = studentData['programme_id'];
    //             prevObj.programme_name = studentData['programme_name'];
    //             prevObj.programme_level = studentData['programme_level'];

    //             return prevObj;
    //         })
    //     }

    // }, [studentData])


    let fetchMajorData = async () => {
        const response = await fetch('http://localhost:8081/fdb-application/majors');

        const responsejson = await response.json();
        setMajorData(responsejson)
        console.log("majors data --here in instructor--- " + JSON.stringify(responsejson));

        if (responsejson) {
            setPayload((prev) => {
                let prevObj = { ...prev };

                prevObj.programme_name = responsejson.filter((item) => item.programme_id == instructor_programme_id)[0].programme_name;
                return prevObj;
            })
        }


    }

    useEffect(() => {

        fetchMajorData();


    }, [params])



    let [value, setValue] = useState();

    let [payload, setPayload] = useState({
        instructor_id: '',
        programme_name: '',
        semester_name: '',
        batch_id: '',
        programme_id: '',
        course_id:'',
        course_code:''

    })



    let [startDt, setStartDt] = useState('');
    let [endDt, setEndDt] = useState('');

    let submitFunction = async () => {

        console.log('payload  ', payload);


        const response = await fetch('http://localhost:8081/fdb-application/activating-batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });




        const responsejson = await response.json();

        console.log(responsejson);

        // {
        //     "message": "Batch activated successfully",
        //     "status": "true"
        // }

        if (responsejson) {

            if (responsejson.status == 'true') {
                alert(responsejson.message);
            }
            if (responsejson.status == 'false') {
                alert(responsejson.message);
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
        console.log('payload  --> ', payload);
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

    // let selectSemesterName = (event) => {
    //     let semester_name = event.target.value;
    //     console.log("semester    selected", semester_name);
    //     setPayload((prev) => {
    //         let prevObj = { ...prev };
    //         prevObj.selecting_course_semester = semester_name;
    //         return prevObj;
    //     })
    // }

    let select_course_code = (event) => {
        let course_code = event.target.value;
        console.log("course    selected", course_code);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.course_code = course_code;
            return prevObj;
        })
    }

    let select_batch_name = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('data-semester-batch-id');
        const batch_name = selectedOption.value;

        console.log("batch   selected", batch_name , ' ', id);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.selecting_course_batch = batch_name;
        prevObj.batch_id = id;
            return prevObj;
        })
    }
    const [semesterName, setSemesterName] = useState('');
    const [year, setYear] = useState('');
    const [combinedWord, setCombinedWord] = useState('');

    useEffect(() => {
        console.log('combinedWord', combinedWord);  

        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.semester_name = combinedWord;
            
      
            return prevObj;
        })
    }, [combinedWord]);


    const selectSemesterName = (event) => {
        const selectedSemester = event.target.value;
        setSemesterName(selectedSemester);
        setCombinedWord(selectedSemester + ' ' + year);
    };

    const selectYear = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
        setCombinedWord(semesterName + ' ' + selectedYear);
    };

    return (

        <div className={empStyles.body}>
            <div className={empStyles.closeButton}>
                <button onClick={close}>Back</button>

            </div>
            <div className={empStyles.leaveContainer}>



                <div className={empStyles.leavesPageHeading} >ENROLL AND TEACH BATCH</div>
                {/* <div className={empStyles.leavesForm} >leaves forms</div> */}

                <div className={empStyles.leavesForm} >

                    {/* <div className={empStyles.leavesFormRow} >
                        <div className={empStyles.leavesLabel}>
                            <label>Student userName</label>
                        </div>

                        <div className={empStyles.leavesInput}>
                            <label>{propData.userId}</label>
                        </div>
                    </div> */}

                    <div className={empStyles.leavesFormRow} >
                        <div className={empStyles.leavesLabel}>
                            <label>programme Name</label>
                        </div>

                        <div className={empStyles.leavesInput}>
                            <label>{payload.programme_name}</label>
                        </div>
                    </div>


                    <div className={empStyles.leavesForm}>
                        <div className={empStyles.leavesFormRow} >
                            <div className={empStyles.leavesLabel}>
                                <label>semester name</label>
                            </div>

                            <div className={empStyles.leavesInput}>
                                <select name="semester_name" onChange={selectSemesterName}>
                                    <option>select</option>
                                    <option>Fall</option>
                                    <option>Spring</option>
                                </select>

                                <select name="year" onChange={selectYear}>
                                    <option>select</option>
                                    <option>2020</option>
                                    <option>2021</option>
                                    <option>2022</option>
                                    <option>2023</option>
                                    <option>2024</option>
                                    <option>2025</option>
                                    <option>2026</option>
                                </select>

                                {/* <div>
                                    Combined Word: {combinedWord}
                                </div> */}
                            </div>
                        </div>


                        <div className={empStyles.leavesFormRow} >
                            <div className={empStyles.leavesLabel}>
                                <label>course name</label>
                            </div>

                            <div className={empStyles.leavesInput}>
                                <select name="course_code" onChange={(event) => { select_course_code(event) }}>
                                    <option>select</option>
                                    {[...new Set(batchs_data_for_instructor_to_enroll.filter(item => item.programme_id == payload.programme_id).map(item => item.course_code))].map((major) => {
                                        return <option value={major}>{major}</option>;
                                    })}

                                </select>
                            </div>
                        </div>

                        <div className={empStyles.leavesFormRow} >
                            <div className={empStyles.leavesLabel}>
                                <label>batch name</label>
                            </div>

                            <div className={empStyles.leavesInput}>
                                <select name="batch_name" onChange={(event) => { select_batch_name(event) }}>
                                    <option>select</option>
                                    {bathesForInstructorToEnroll.filter(item => item.programme_id == payload.programme_id).filter((item)=>{return item.course_code==payload.course_code}).map((major) => {
                                        return <option value={major.batch_name} data-semester-batch-id={major.batch_id}>{major.batch_name}</option>;
                                    })}

                                </select>
                            </div>
                        </div>

                        {/* <div className={empStyles.leavesFormRow} >
                                <div className={empStyles.leavesLabel}>
                                    <label>programe name</label>
                                </div>

                                <div className={empStyles.leavesInput}>
                                    <select onChange={(event) => { selectProgramme(event) }}>
                                        <option>select</option>
                                        {majorData.filter((e) => { return e.programme_level === payload.programme_level }).reduce((acc, curr) => {
                                            if (!acc.find(item => item.programme_id === curr.programme_id)) {
                                                acc.push(curr);
                                            }
                                            return acc;
                                        }, []).map((major) => {
                                            return <option key={major.programme_id} value={major.programme_name} data-programme-id={major.programme_id}>{major.programme_name}</option>
                                        })}

                                    </select>
                                </div>
                            </div>

                            <div className={empStyles.leavesFormRow} >
                                <div className={empStyles.leavesLabel}>
                                    <label>major name</label>
                                </div>
                                <div className={empStyles.leavesInput}>
                                    <select onChange={(event) => { selectMajor(event) }}>
                                        <option>select</option>
                                        {majorData.filter((e) => { return e.programme_id == payload.programme_id }).map((major) => {
                                            return <option key={major.major_id} value={major.major_name} data-major-id={major.major_id}>{major.major_name}</option>
                                        })}

                                    </select>
                                </div>
                            </div> */}
                        <div className={empStyles.leavesFormRow} >

                            <div className={empStyles.submitLeaves} onClick={submitFunction} >
                                SUBMIT
                            </div>
                        </div>

                    </div>











                </div>

            </div>

        </div>
    )
}

export default BactchPage;