import { redirect } from "react-router-dom"



const authentication = () => {

    const value: string | null = localStorage.getItem('Singin_Data')
    const Maindata: { role: string }[] | [] = value ? JSON.parse(value) : ''
    if (Maindata.length > 0) {
        return Maindata[0]?.role === 'admin'
    }
    return false
}

const Access = ()=>{
    
    if(!authentication()){
        return redirect('/authentication/signin')
    }
    else{
        return null
    }
}

export default Access
