
import { DataGrid } from '@mui/x-data-grid';
import empDatajson from './../data_folders/empData.json'
import { useEffect, useState } from 'react';
export default function AdminPage(){

    let [empData,setEmpData]=useState([])
    let columnHeaders = [
        { field: 'name', headerName: 'Username', flex: 1, align: 'center', headerAlign: 'center' }, 
        { field: 'id', headerName: 'UserId', flex: 1, align: 'center', headerAlign: 'center' }, 
        { field: 'hours', headerName: 'Hours worked', flex: 1, align: 'center', headerAlign: 'center' },]


    useEffect(()=>{

   setEmpData(empDatajson);

    },[empDatajson])

    return(
        <div>
            adminpage

            <DataGrid

            autoHeight
            columns={columnHeaders}
            rows={empData}
            >

            </DataGrid>
        </div>
    )
}