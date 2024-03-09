
import { DataGrid } from '@mui/x-data-grid';
import adminDatajson from './../data_folders/adminData.json'
import { useEffect, useState } from 'react';
import admstyles from './css-folder/AdminPage.module.css'
export default function AdminPage() {

    let [empData, setEmpData] = useState([]);
    // let [earnings]
    let columnHeaders = [
        { field: 'id', headerName: 's_no', flex: 1, align: 'center', headerAlign: 'center' },

        { field: 'employee_id', headerName: 'EMPOLOYEE ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'user_id', headerName: 'USER ID', flex: 1, align: 'center', headerAlign: 'center' },

        { field: 'total_hours_worked', headerName: 'Total Hours', flex: 1, align: 'center', headerAlign: 'center' },

        { field: 'earnings', headerName: 'earnings', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'ofPerson', headerName: 'personStats', flex: 1, align: 'center', headerAlign: 'center', renderCell: (params) => { } },

    ]

    //     useEffect(()=>{

    //         let adminData=adminDatajson.map((e)=>{
    //             return {
    //                 ...e,
    //                 earnings: '$'+e.hours*10
    //             }
    //         })


    //    setEmpData(adminData);

    //     },[adminDatajson])


    let fetchAttendanceDetails = async () => {
        //http://localhost:8080/ttp-application/getEmployeeAttendanceDetails
        let response = await fetch('http://localhost:8080/ttp-application/getEmployeeAttendanceDetails');
        let responseJson = await response.json();

        console.log("##attendance response", responseJson);

        let index = 1;
        const groupedData = responseJson.reduce((groups, entry) => {
            const { user_id, employee_id, hours_worked,pay_scale } = entry;
            if (!groups[user_id]) {
                groups[user_id] = { 
                    user_id: user_id, 
                    employee_id: employee_id, 
                    total_hours_worked: 0,
                     id: index ,
                    earnings:0,
                };
                index++;
            }
            groups[user_id].total_hours_worked += hours_worked;
            groups[user_id].earnings += (hours_worked*pay_scale);

            return groups;
        }, {});

        // Convert grouped data object to an array of objects

        console.log("##groupedData", groupedData)
        const result = Object.values(groupedData);
        console.log("##result", result);
        setEmpData(result);
    }

    let fetchPersonDetails = async () => {

        let response = await fetch('http://localhost:8080/ttp-application/getEmployeeDetails');
        let responseJson = await response.json();
        console.log("##person response", responseJson);

    }


    useEffect(() => {
        fetchAttendanceDetails();

        fetchPersonDetails();
    }, [])

    return (
        <div className={admstyles.body}>
            <div className={admstyles.title}>ADMIN PAGE</div>
            <div className={admstyles.tableContainer}>
                <DataGrid

                    autoHeight
                    columns={columnHeaders}
                    rows={empData}

                >

                </DataGrid>
            </div>

        </div>
    )
}