
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



let BactchPage = (params) => {


    let { close, propData, studentData } = params;
    let [batchesData, setBatchesData] = useState([]);

    let [majorData, setMajorData] = useState([]);

    let fetchBatches = async () => {

        // http://localhost:8081/fdb-application/batches
        const response = await fetch('http://localhost:8081/fdb-application/batches');

        const responsejson = await response.json();

        console.log("batches data ----- " + JSON.stringify(responsejson));
        setBatchesData(responsejson);


    }

    useEffect(() => {
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.person_id = propData.id;
            prevObj.student_id=propData.id;
            return prevObj;
        })



        fetchBatches();
    }, [propData])

    useEffect(() => {
        console.log('student data @@@ ', studentData);

        if (studentData['status'] === 'SUCCESS') {

            setPayload((prev) => {
                let prevObj = { ...prev };
                prevObj.major_id = studentData['major_id'];
                prevObj.major_name = studentData['major_name'];
                prevObj.programme_id = studentData['programme_id'];
                prevObj.programme_name = studentData['programme_name'];
                prevObj.programme_level = studentData['programme_level'];

                return prevObj;
            })
        }

    }, [studentData])


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
     student_id:'',
        major_id: '',
        major_name: '',
        programme_id: '',
        programme_name: '',
        programme_level: '',
        selecting_course_semester:'',
        selecting_course_code:'',
        selecting_course_batch:'',
        semester_batch_id:''

    })

    let [startDt, setStartDt] = useState('');
    let [endDt, setEndDt] = useState('');

    let submitFunction = async () => {

        console.log('payload  ', payload);


        const response = await fetch('http://localhost:8081/fdb-application/course-enrollment', {
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
                alert(responsejson.message);
            }
            alert(responsejson.message);


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

    let selectSemesterName = (event) => {
        let semester_name = event.target.value;
        console.log("semester    selected", semester_name);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.selecting_course_semester = semester_name;
            return prevObj;
        })
    }

    let select_course_code = (event) => {
        let course_code = event.target.value;
        console.log("course    selected", course_code);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.selecting_course_code = course_code;
            return prevObj;
        })
    }

    let select_batch_name = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('data-semester-batch-id');
        const batch_name = selectedOption.value;

        console.log("batch    selected", batch_name);
        setPayload((prev) => {
            let prevObj = { ...prev };
            prevObj.selecting_course_batch = batch_name;
            prevObj.semester_batch_id=id;
            return prevObj;
        })
    }

    return (

        <div className={empStyles.body}>
            <div className={empStyles.closeButton}>
                <button onClick={close}>Back</button>

            </div>
            <div className={empStyles.leaveContainer}>



                <div className={empStyles.leavesPageHeading} >COURSES</div>
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
                            <label>Major Name</label>
                        </div>

                        <div className={empStyles.leavesInput}>
                            <label>{payload.major_name}</label>
                        </div>
                    </div>


                        <div className={empStyles.leavesForm}>
                            <div className={empStyles.leavesFormRow} >
                                <div className={empStyles.leavesLabel}>
                                    <label>semester name</label>
                                </div>

                                <div className={empStyles.leavesInput}>
                                    <select name="semester_name" onChange={(event) => { selectSemesterName(event) }}>
                                        <option>select</option>
                                        {[...new Set(batchesData.filter(item=> item.major_id==payload.major_id).map(item => item.semester_name))].map((major) => {
                                            return <option value={major}>{major}</option>;
                                        })}

                                    </select>
                                </div>
                            </div>


                            <div className={empStyles.leavesFormRow} >
                                <div className={empStyles.leavesLabel}>
                                    <label>course name</label>
                                </div>

                                <div className={empStyles.leavesInput}>
                                    <select name="course_code" onChange={(event) => { select_course_code(event) }}>
                                        <option>select</option>
                                        {[...new Set(batchesData.filter(item=> item.major_id==payload.major_id).filter((item)=>{return item.semester_name==payload.selecting_course_semester}).map(item => item.course_code))].map((major) => {
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
                                        {batchesData.filter(item=> item.major_id==payload.major_id).filter((item)=>{return item.semester_name==payload.selecting_course_semester}).filter(item=> item.course_code==payload.selecting_course_code).map((major) => {
                                            return <option value={major.batch_name} data-semester-batch-id={major.semester_batch_id}>{major.batch_name}</option>;
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