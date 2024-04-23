
import { useEffect, useState } from 'react';
import empStyles from './css_folder/employeePage.module.css'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



let RatingPage = (params) => {
    let [payload, setPayload] = useState({
        enrollment_id: '',
        grade: '',

    })
    const handleRatingChange = (event) => {
        const { name, value } = event.target; // Get the name and value from the event
        setPayload(prevState => ({
            ...prevState,
            [name]: value // Update the ratings state with the new value
        }));
    };

    let { close, rowData } = params;








    useEffect(() => {

    setPayload({
        enrollment_id: rowData.enrollment_id,
    })  

    }, [rowData])





    let submitFunction = async () => {

        console.log('payload  ', payload);


        const response = await fetch('http://localhost:8081/fdb-application/insert-academic-grade', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });




        const responsejson = await response.json();

        console.log(responsejson);

        if (responsejson) {

            if (responsejson.status == "error") {

                alert(responsejson.message);

            }
            if (responsejson.status == "success") {
                alert(responsejson.message);
            }
            alert(responsejson.message);


        }

    }



    useEffect(() => {
        console.log('payload ', payload);
    }, [payload])





    return (

        <div className={empStyles.body}>

            <div className={empStyles.gradeBoxContainer}>


                <div className={empStyles.closeButton}>
                    <button onClick={close}>Back</button>

                </div>
                <div className={empStyles.leavesPageHeading} >ADD GRADE</div>
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
                            <label>Enrollment Id</label>
                        </div>

                        <div className={empStyles.leavesInput}>
                            <label>{rowData.enrollment_id}</label>
                        </div>
                    </div>


                    <div className={empStyles.leavesFormRow} >
                        <div className={empStyles.leavesLabel}>
                            <label>Grade Awarding</label>
                        </div>

                        <div className={empStyles.leavesInput}>
                            <select onChange={handleRatingChange} name="grade" value={payload.grade}>
                                <option value="">select</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                            </select>
                        </div>
                    </div>

                    <div className={empStyles.leavesFormRow} >

                        <div className={empStyles.submitLeaves} onClick={submitFunction} >
                            SUBMIT
                        </div>
                    </div>












                </div>

            </div>

        </div>
    )
}

export default RatingPage;