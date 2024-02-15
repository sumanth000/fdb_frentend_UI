
import { DataGrid } from '@mui/x-data-grid';
import empDatajson from './../data_folders/empData.json'
import { useEffect, useState } from 'react';
import admstyles from './css-folder/AdminPage.module.css'
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