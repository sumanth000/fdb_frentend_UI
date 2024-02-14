

import { DataGrid } from '@mui/x-data-grid';
import empDatajson from './../data_folders/empData.json'
import { useEffect, useState } from 'react';
import Divbutton from './divButton';

export default function EmployeePage(){

    let [empData,setEmpData]=useState([])
    let columnHeaders=[
        { field: 'name',headerName: 'Username',flex:1,align:'center',headerAlign:'center' }, 
        { field: 'id',headerName: 'UserId',flex:1,align:'center',headerAlign:'center' }, 
        { field: 'hours',headerName: 'Hours worked' ,flex:1,align:'center',headerAlign:'center'},
        { field: 'attendancediv',headerName: 'mark attendance' ,flex:1,align:'center',headerAlign:'center',renderCell:(index)=>{ return (<Divbutton data={index.row.hours}></Divbutton>)}}]


    useEffect(()=>{

        let empnew=empDatajson.map((e)=>{
            return {
                ...e,
                // attendancediv: <Divbutton></Divbutton>
            }
        })

        console.log(JSON.stringify(empnew));

   setEmpData(empnew);

    },[empDatajson])

    return(
        <div>
            employee home

            <DataGrid

            autoHeight
            columns={columnHeaders}
            rows={empData}
            >

            </DataGrid>
        </div>
    )
}


