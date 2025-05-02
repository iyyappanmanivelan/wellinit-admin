import { useParams } from "react-router-dom";
import Blog_Detail from "components/sections/blogdetail/index"

const Blogdetail = () => {

    const pramas = useParams()

    const Blog_id = pramas?.id

    console.log('rkgng', pramas?.id)

    return (


        <Blog_Detail id={Blog_id} />


    )


}


export default Blogdetail;