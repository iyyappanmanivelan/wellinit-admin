import BlogdetailComponent from 'components/blogdetail';
import { useParams } from 'react-router-dom';

const Blogdetail = () => {
  const pramas = useParams();
  const Blog_id = pramas?.id;
  console.log('rkgng', pramas?.id);

  return <BlogdetailComponent id={Blog_id} />;
};

export default Blogdetail;
