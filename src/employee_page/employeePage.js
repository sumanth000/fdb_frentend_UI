

import { DataGrid } from '@mui/x-data-grid';
import empDatajson from './../data_folders/empData.json'
import { useEffect, useState } from 'react';
import Divbutton from './divButton';
import empStyles from './css_folder/employeePage.module.css'
import { useLocation } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';


export default function EmployeePage(){

    const location = useLocation();
    const state= location.state;

    console.log('state',state);


    let [empData,setEmpData]=useState([])
    let [empDataToShow,setEmpDataToShow]=useState([])


    

    let columnHeaders=[
                { field: 'actId',headerName: 'ActivityID',flex:1,align:'center',headerAlign:'center' }, 

        { field: 'name',headerName: 'Username',flex:1,align:'center',headerAlign:'center' }, 
        // { field: 'id',headerName: 'UserId',flex:1,align:'center',headerAlign:'center' }, 
        { field: 'clockIn',headerName:'clockIn' ,flex:1,align:'center',headerAlign:'center',renderCell:(params)=>{ return ( <div onClick={()=>{inFunction(params.row,'clockIn')}}><Divbutton id='clockIn' data={params.row.hours} isPresentcallback={isPresentcallback} disabled={params.row.disableClockIn}></Divbutton></div>)}},
        { field: 'inTime',headerName: 'inTime',flex:1,align:'center',headerAlign:'center' }, 

        { field: 'clockOut',headerName: 'clockOut' ,flex:1,align:'center',headerAlign:'center',renderCell:(params)=>{ return (<div  onClick={()=>{inFunction(params.row,'clockOut')}} ><Divbutton id='clockOut'  data={params.row.hours} isPresentcallback={isPresentcallback} disabled={params.row.disableClockOut} ></Divbutton></div>)}},
        { field: 'outTime',headerName: 'outTime',flex:1,align:'center',headerAlign:'center' }, 

        { field: 'hours',headerName: 'Hours worked' ,flex:1,align:'center',headerAlign:'center'}

    ]

    //functions
    let isPresentcallback=(id,getdata)=>{
        console.log("isPresentcallback  function in the parent--> ",id,' & ' ,getdata)

    }
    let inFunction=(params,clockData)=>{
        console.log("id in infunction ",params,' ',clockData);

        if(clockData=="clockIn")
        {

        let setinTime=empData.map((e)=>{
            if(e.actId== params.actId && e.disableClockOut==true && e.disableClockIn==false)
            return {
                ...e,
                inTime: new Date(),
                disableClockOut:false,
                disableClockIn:true
            }
            else
            return {
        ...e}
            
        })
        setEmpData(setinTime);
      }
      if(clockData=="clockOut")
        {
        let setinTime=empData.map((e)=>{
            if(e.actId== params.actId && e.disableClockOut==false && e.disableClockIn==true)
            return {
                ...e,
                outTime: new Date(),
                disableClockOut:true
            }
            else
            return {
        ...e}
            
        })
        setEmpData(setinTime);
      }

    }
    let addNewEmpRow=()=>{
        let empNew=[...empData];
        let newRow={
        
        name:'mamatha',
         id:"44",
         actId:empNew[empNew.length-1].actId+1,
            disableClockIn:false,               
            disableClockOut: true,
            hours:''
        }

        // console.log(empNew);
        empNew.push(newRow)
        setEmpData(empNew)
    }


    //use effects

    useEffect(()=>{

        let empData1=[...empData];
      
        let empNew=empData1.map((e)=>{

            if(e.inTime && e.outTime)
            {
                console.log("coming to fix time 1")

                if(e.inTime!==null && e.outTime!=null )
                {
                    console.log("seconds calc ->"+(e.outTime-e.inTime)/1000);
                    let hoursCalc=(e.outTime-e.inTime)/1000;
                    return {
                        ...e,
                        hours: hoursCalc
                    }
                }
                
            }
            else
            return {
        ...e
        }
            
        })

        console.log('new data after time calculated',empNew);


        setEmpDataToShow(empNew);



    },[empData])
    


    useEffect(()=>{

        let empnew=empDatajson.map((e)=>{
            return {
                ...e,
                disableClockIn:false,               
                 disableClockOut: true

            }
        })

        console.log(JSON.stringify(empnew));

     setEmpData(empnew);

    },[empDatajson])

    return(
        <div className='body'>
          
          <div className={empStyles.title}>EMPLOYEE PAGE</div>
          
            <div className={empStyles.tableContainer}>
                <div className={empStyles.plusIcon} onClick={addNewEmpRow}>
                    <span className={empStyles.spanText}>ADD ROW</span>

                </div>

                
                <DataGrid

                    autoHeight
                    columns={columnHeaders}
                    rows={empDataToShow}
                    getRowId={(row) => row.actId}

                >

                </DataGrid>
            </div>

            
        </div>
    )
}


