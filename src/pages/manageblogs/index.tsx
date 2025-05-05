import {  Stack } from "@mui/material"
// import Footer from "components/common/Footer"
// import TaskToday from "components/sections/dashboard/task-today"
import UpcomingTask from "components/sections/mangeblogs/upcoming-task"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
// import WeekCalendar from "components/sections/dashboard/week-calendar"
import paths from 'routes/paths';


const ManageBlogs = ()=>{



  const router = useNavigate()


  const ACCESPAGE = () => {

    const value: string | null = localStorage.getItem('Singin_Data')
    const Maindata: { role: string }[] | [] =  value ? JSON.parse(value) : ''


    if(Maindata.length > 0){
      if(Maindata[0]?.role != 'admin'){
        router(paths.signin)
      }
      else{
        router(paths?.manageblogs)
      }
    }
    
    else{
      router(paths.signin)
    }
    

  }


  useEffect(()=>{
ACCESPAGE()
  },[])





    return(
        <Stack direction={{ xs: 'column'}}>

          <UpcomingTask />


      </Stack>
    )
}

export default ManageBlogs