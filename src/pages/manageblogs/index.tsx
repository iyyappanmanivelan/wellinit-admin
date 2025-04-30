import {  Stack } from "@mui/material"
// import Footer from "components/common/Footer"
// import TaskToday from "components/sections/dashboard/task-today"
import UpcomingTask from "components/sections/mangeblogs/upcoming-task"
// import WeekCalendar from "components/sections/dashboard/week-calendar"

const ManageBlogs = ()=>{
    return(
        <Stack direction={{ xs: 'column'}}>

          <UpcomingTask />


      </Stack>
    )
}

export default ManageBlogs