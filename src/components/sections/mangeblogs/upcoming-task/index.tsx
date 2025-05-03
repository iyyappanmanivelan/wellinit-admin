// import { tasks } from 'data/tasks';
// import TaskCard from './TaskCard';
// import SliderWrapper from 'components/common/SliderWrapper';
import { useEffect, useState } from 'react';
import { instance } from 'config/config';
import { Avatar, AvatarGroup, Box, Card, CardContent, CardMedia, Modal, Stack, Typography } from '@mui/material';
import ReactSwiper from 'components/base/ReactSwiper';
import { SwiperSlide } from 'swiper/react';
import noimg from 'assets/images/noimg.jpg'
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavigate } from 'react-router-dom';
import { useScreenWidth } from 'components/base/usescreenwidth';
import BasicModal from 'components/common/Modal';
import close from "assets/images/icons/close.png"
import upload from "assets/images/icons/upload.png"
import { TextField } from '@mui/material';
import { useFormik } from 'formik'
import filtericon from 'assets/images/icons/close2.png'
import * as Yup from 'Yup'
import axios from 'axios';
import { toast } from 'react-toastify'
import moment from 'moment'
import NODTA from 'assets/images/nodata.avif'


interface Task {
  id: number,
  title: string,
  name: string,
  comment: string,
  content: string,
  img: string,
  relatedimg: []
  mm_dd_yy: string,
  time: string
}



interface Formdata {
  name: string,
  comment: string,
  title: string,
  content: string,
  img: string,
  relatedimg: []
  mm_dd_yy: string
  time: string

}


const UpcomingTask = () => {

  const [Blogdata, setBlogdata] = useState<Task[] | undefined>()
  const router = useNavigate()
  const [bolbimg, setbolbimg] = useState<File>()
  // const [blobimg2, setblobimg2] = useState<File[]>([])
  const [multimg, setmultimg] = useState<string[]>([])

  const screenWidth = useScreenWidth()
  const slidesPerView = screenWidth >= 1024 ? 3 : screenWidth >= 768 ? 2 : 1
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [bbid, setbbid] = useState<number>()
  const apiKey = "/api/blogs"



  const schema = Yup.object().shape({
    'title': Yup.string().required('Enter Title'),
    'content': Yup.string().required('Enter Content'),
    'name': Yup.string().required('Enter Name'),
    'comment': Yup.string(),
  })


  const Formik = useFormik<Formdata>({
    initialValues: {
      name: '',
      comment: '',
      title: '',
      content: '',
      img: '',
      relatedimg: [],
      mm_dd_yy: '',
      time: ''

    },

    validationSchema: schema,

    onSubmit: async (values, { resetForm }) => {

      try {

        const MOMENT = moment()
        const DD = MOMENT.date()
        const MM = moment().format('MMMM');
        const YY = MOMENT.year()
        const time = moment().utcOffset("+05:30").format('hh:mm a')

        const data = {
          name: values?.name,
          title: values?.title,
          content: values?.content,
          img: values?.img,
          comment: values?.comment,
          relatedimg: multimg,
          mm_dd_yy: `${MM} ${DD}, ${YY}`,
          time: `${time}`

        }

        const response = await instance.put(`${apiKey}/${bbid ? bbid : null}`, data)
        console.log('vfv', response)
        console.log(values)
        resetForm()
        FETCHBLOGDATA()
        toast.success('Blog Edited Succesfully')
        // setblobimg2([])
        setbolbimg(undefined)
        setmultimg([])
        handleClose()


      }
      catch (err) {
        console.log(err)
        toast.error('Somthing error ! Try again')
      }
    }
  })




  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const fileimg = target.files?.[0];


    if (fileimg) {
      setbolbimg(fileimg)
      const Cloudinary = new FormData()
      Cloudinary.append('upload_preset', 'wellinit_blogs')
      Cloudinary.append('cloud_name', 'dfry6rebw')
      Cloudinary.append('file', fileimg)

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dfry6rebw/image/upload',
          Cloudinary
        );
        const imageUrl = response?.data?.secure_url;
        if (imageUrl) {
          Formik.setFieldValue('img', imageUrl)
        }
      } catch (error) {
        console.error('Upload error:', error);
      }

    }


  };

  const handleFileChange2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const fileimg = target.files;
    if (fileimg) {
      const main = Array.from(fileimg);
      // setblobimg2(prev => [...prev, ...main])

      main.map(async (data) => {
        const Cloudinary = new FormData()
        Cloudinary.append('upload_preset', 'wellinit_blogs')
        Cloudinary.append('cloud_name', 'dfry6rebw')
        Cloudinary.append('file', data)
        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dfry6rebw/image/upload',
            Cloudinary
          );

          const imageUrl = response?.data?.secure_url;
          if (imageUrl) {
            setmultimg((prev) => [...prev, imageUrl])
          }
        } catch (error) {
          console.error('Upload error:', error);
        }
      })
    }
  };

  const handelbolg_data = async (): Promise<Task[]> => {
    const response = await instance.get(`${apiKey}`)
    return response?.data?.data
  }

  const FETCHBLOGDATA = () => {
    handelbolg_data()
      .then((res) => {
        setBlogdata(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handelSingleblog_data = async (id: number): Promise<Task> => {
    const response = await instance.get(`${apiKey}/${id ? id : null}`)
    return response?.data?.data
  }

  const handelSingleblog_delete = async (id: number | undefined) => {
    const response = await instance.delete(`${apiKey}/${id ? id : null}`)
    return response?.data?.data
  }
  const modalid = (ddd: number) => {
    handleOpen();
    setbbid(ddd)
    handelSingleblog_data(ddd)
      .then((res) => {
        Formik.setFieldValue('name', res?.name)
        Formik.setFieldValue('title', res?.title)
        Formik.setFieldValue('content', res?.content)
        Formik.setFieldValue('img', res?.img)
        setmultimg(res?.relatedimg)
      })
      .catch((err) => {
        console.log(err)
        setbbid(undefined)
      })

  }

  const modal2id = (id: number) => {
    handleOpen2()
    setbbid(id)
  }

  const Confirmdelete = () => {
    handelSingleblog_delete(bbid)
      .then((res) => {
        console.log(res)
        toast.success('Blog Deleted Succesfully')
        setbbid(undefined)
        FETCHBLOGDATA()
        handleClose2()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const submitting = Formik.isSubmitting;

  useEffect(() => {
    const firsterror = Object.keys(Formik.errors)[0];

    const el = document.querySelector(`[id = "${firsterror}"]`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [submitting]);


  useEffect(() => {
    FETCHBLOGDATA()
  }, [])


  const filterimg = (data : string)=>{
    const ddd = multimg.filter(val => !val.includes(data))
    setmultimg(ddd)
  }



  return (
    // <SliderWrapper title="Blogs" SliderCard={TaskCard} data={Blogdata ?? []}  />

    <>

      <Stack direction="column" spacing={1.75} width={1}>

        <Stack alignItems="center" justifyContent="space-between">
          <Typography variant="h4">{'Blogs'}</Typography>
          <BasicModal />
        </Stack>

        {
          Blogdata ? (
            <ReactSwiper slidesPerView={slidesPerView}>
          {
            Blogdata?.map((data, i) => (
              <SwiperSlide key={i}>

                <Card sx={{ userSelect: 'none' }}  >
                  <CardMedia component="img" height="200" image={data.img ? data?.img : noimg} alt="task_today_image" />
                  <CardContent>
                    <Box mt={1.5}>
                      <Stack alignItems="center" justifyContent="space-between" position="relative">
                        <Typography variant="subtitle1" color="text.primary" fontWeight={600} className='title-bg'>
                          {data.title.toUpperCase()}
                        </Typography>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <IconifyIcon icon="mingcute:edit-3-fill" fontSize="h6.fontsize" color="text.secondary" sx={{ cursor: "pointer" }} onClick={() => { modalid(data?.id) }} />
                          <IconifyIcon icon="ooui:trash" fontSize="h6.fontsize" color="red" sx={{ cursor: "pointer" }} onClick={() => { modal2id(data?.id) }} />
                        </div>
                      </Stack>

                      <Typography variant="subtitle2" color="text.secondary" className='title-bg'>
                        {data.name}
                      </Typography>
                    </Box>

                    <Box mt={1.5}>
                      <Typography variant="body1" color="text.primary" fontWeight={500} className='content'>
                        {data?.content}
                      </Typography>

                    </Box>

                    <Stack mt={2} alignItems="center" justifyContent="space-between">
                      <Stack alignItems="center" spacing={1}>
                        <IconifyIcon icon="mynaui:clock-circle" color="text.secondary" fontSize="h4.fontSize" />
                        <Stack gap="5px">
                          <Typography fontSize="0.8rem" variant="body1" fontWeight={500}>{data?.mm_dd_yy}</Typography>
                          <Typography fontSize="0.8rem" variant="body1" fontWeight={500}> {data?.time}</Typography>
                        </Stack>
                      </Stack>

                      <AvatarGroup max={5}>
                        {data.relatedimg.map((avatar) => (
                          <Avatar key={avatar} alt="avatar_img" src={avatar} />
                        ))}
                      </AvatarGroup>
                    </Stack>
                    <p style={{ cursor: "pointer", fontSize: "10px", margin: "5px 0px" }} onClick={() => { router(`/pages/blogdetail/${data?.id}`) }}>Read More...</p>
                  </CardContent>


                </Card>


              </SwiperSlide>
            ))
          }
        </ReactSwiper>
          ) : (
            <div style={{textAlign:"center"}}>
              <img src={NODTA} width="500px" height="400px" className='img-fluid'/>
            </div>
          )
        }

      </Stack>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            borderRadius: "20px",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '450px',
            backgroundColor: 'background.paper',
            boxShadow: 24,
            padding: 4,
          }}>
            <div className='blog-head' style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
              <img src={close} className='img-fluid' onClick={handleClose} />
            </div>

            <h3> Edit and Publish Your Health Expertise</h3>


            <form onSubmit={Formik.handleSubmit} style={{ overflowY: "scroll", height: "450px", marginTop: "20px" }}>
              <div className='bloginput'>
                <label>Name</label>
                <TextField
                  id="name"
                  type="text"
                  style={{ border: "2px solid #00a9e5", borderRadius: "10px", marginTop: "5px" }}
                  variant="filled"
                  placeholder="Enter Blog Name"
                  {...Formik.getFieldProps('name')}
                  fullWidth
                // autoFocus
                />
                {
                  Formik.touched.name && Formik.errors.name ? (<span className='error'>{Formik.errors.name}</span>) : null
                }
              </div>
              <div className='bloginput'>
                <label>Title</label>
                <TextField
                  id="title"
                  type="text"
                  style={{ border: "2px solid #00a9e5", borderRadius: "10px", marginTop: "5px" }}
                  variant="filled"
                  placeholder="Enter Blog Title"
                  {...Formik.getFieldProps('title')}
                  fullWidth
                // autoFocus
                />
                {
                  Formik.touched.title && Formik.errors.title ? (<span className='error'>{Formik.errors.title}</span>) : null
                }
              </div>

              <div className='bloginput'>
                <label>Content</label>
                <textarea
                  aria-label="minimum height"
                  id="content"
                  rows={6}
                  {...Formik.getFieldProps('content')}
                  placeholder="Enter Blog Content"
                  style={{ border: "2px solid #00a9e5", borderRadius: "10px", width: "100%", padding: "20px", marginTop: "5px", font: "inherit" }}

                />
                {
                  Formik.touched.content && Formik.errors.content ? (<span className='error'>{Formik.errors.content}</span>) : null
                }
              </div>

              <div className='bloginput'>
                <label>Comment</label>
                <textarea
                  aria-label="minimum height"
                  rows={4}
                  id="comment"
                  {...Formik.getFieldProps('comment')}
                  placeholder="Enter Comment"
                  style={{ border: "2px solid #00a9e5", borderRadius: "10px", width: "100%", padding: "20px", marginTop: "5px", font: "inherit" }}
                />
                {
                  Formik.touched.comment && Formik.errors.comment ? (<span className='error'>{Formik.errors.comment}</span>) : null
                }
              </div>

              <input
                id="file"
                name="file"
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <input
                id="file2"
                name="file"
                type="file"
                multiple
                onChange={handleFileChange2}
                style={{ display: "none" }}

              />

              <div className='bloginput'>
                <label>Choose Image</label>

                <div className='blogimg' style={{ display: "flex", justifyContent: "center", gap: "10px" }} onClick={() => { document.getElementById('file')?.click() }}>
                  <p>Upload</p>
                  <img src={upload} className='img-fluid' />
                </div>
                {
                  bolbimg || Formik.values.img ? <p>Selected Image</p> : null
                }
                {
                  bolbimg || Formik.values.img ? (<div style={{ position: "relative", width: "70px", padding: "10px 0px" }}>
                    <img src={bolbimg ? URL.createObjectURL(bolbimg) : Formik.values.img} style={{ width: "70px", height: "70px", objectFit: "cover" }} className='img-fluid' />
                  </div>) : null
                }
              </div>

              <div className='bloginput'>
                <label>Choose Related Image</label>

                <div className='blogimg' style={{ display: "flex", justifyContent: "center", gap: "10px" }} onClick={() => { document.getElementById('file2')?.click() }}>
                  <p>Upload</p>
                  <img src={upload} className='img-fluid' />
                </div>
                {
                  multimg.length > 0 ? <p>Selected Image</p> : ''
                }

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {
                      multimg.length > 0 ? multimg.map((img) => (
                      <div style={{ position: "relative", width: "70px", padding: "10px 0px" }}>
                        <img src={img} style={{ width: "70px", height: "70px", objectFit: "cover" }} className='img-fluid' />
                        <div className="filtericon" style={{cursor:"pointer"}} onClick={()=>{filterimg(img)}}>
                          <img src={filtericon} width="20px" />
                        </div>
                      </div>
                    )) : null
                  }
                </div>

              </div>

              <div className="bloginput">
                <button className='btn' type='submit' style={{ backgroundColor: "#00a9e5", color: "#ffff", border: "none", borderRadius: "5px" }}>Submit</button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={{
          borderRadius: "10px",
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          backgroundColor: 'background.paper',
          border: "none",
          boxShadow: 24,
          padding: 4,
        }}>


          <div>

            <div className='blog-head' style={{ textAlign: "center" }}>
              <h3>Are You Sure ?</h3>
            </div>
            <div className='blogdlt' style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "15px 0px" }}>
              <button className='btn' style={{ background: "#00a9e5", color: "#ffff" }} onClick={() => { Confirmdelete() }} >Yes</button>
              <button className='btn' style={{ background: "gray", color: "#ffff" }} onClick={handleClose2}>No</button>
            </div>
          </div>


        </Box>

      </Modal>




    </>





  )
};

export default UpcomingTask;
