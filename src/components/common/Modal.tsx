import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import create from "assets/images/icons/create.png"
import close from "assets/images/icons/close.png"
import upload from "assets/images/icons/upload.png"
import filtericon from 'assets/images/icons/close2.png'
import { CircularProgress, TextField } from '@mui/material';
import { useFormik } from 'formik'
import * as Yup from 'Yup'
import axios from 'axios';
import { instance } from 'config/config';
import {ToastContainer , toast} from 'react-toastify'
import moment from 'moment'



interface Formdata {
  name: string,
  comment: string,
  title: string,
  content: string,
  img: string,
  relatedimg: []
  mm_dd_yy : string
  time : string

}



export default function BasicModal() {
  const [open, setOpen] = useState<boolean>(false);
  const [Loading , setLoading] = useState<boolean>(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [bolbimg, setbolbimg] = useState<File>()
  // const [blobimg2, setblobimg2] = useState<File[]>([])

  const [multimg , setmultimg] = useState<string[]>([])

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
      mm_dd_yy : '',
      time : ''

    },

    validationSchema: schema,

    onSubmit: async (values , {resetForm}) => {

      setLoading(true)

      try{

        const MOMENT = moment()
        const DD = MOMENT.date()
        const MM = moment().format('MMMM');
        const YY = MOMENT.year()
        const time = moment().utcOffset("+05:30").format('hh:mm a')
      
        const data = {
             name : values?.name,
             title : values?.title,
             content : values?.content,
             img : values?.img,
             comment : values?.comment,
             relatedimg : multimg,
             mm_dd_yy : `${MM} ${DD}, ${YY}`,
             time : `${time}`
    
        }

        const response = await instance.post(`${apiKey}` , data)
        console.log('vfv',response)
        console.log(values)
        resetForm()
        toast.success('Blog Posted')
        // setblobimg2([])
        setbolbimg(undefined)
        setLoading(false)
        setmultimg([])
        // handleClose()
       
      }
      catch(err){
        console.log(err)
        toast.error('Somthing error ! Try again')
        setLoading(false)
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
           Formik.setFieldValue('img' , imageUrl)
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
      // setblobimg2(prev => [...prev , ...main])

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
            setmultimg((prev)=> [...prev , imageUrl])
          }
        } catch (error) {
          console.error('Upload error:', error);
        }
      })
    }
  };

  const filterimg = (data : string)=>{
    const ddd = multimg.filter(val => !val.includes(data))
    setmultimg(ddd)
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

  

  return (
    <div>
      <Button onClick={handleOpen} >
        <div className='add-img' style={{ display: "flex", gap: "7px" }}>
          <img src={create} className="img-fluid" />
          <h5 >Add Blogs</h5>
        </div>
      </Button>

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

        }}  >

          <div className='blog-head' style={{ display: "flex", justifyContent: "end", cursor: "pointer" }}>
            <img src={close} className='img-fluid' onClick={handleClose} />
          </div>

          <h3> Create and Publish Your Health Expertise</h3>


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
                bolbimg ? <p>Selected Image</p> : ''
              }
              {
                bolbimg ? (<div style={{ position: "relative", width: "70px", padding: "10px 0px" }}>
                  <img src={`${URL.createObjectURL(bolbimg)}`} style={{ width: "70px", height: "70px", objectFit: "cover" }} className='img-fluid' />
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
                           <button className='btn' type='submit' 
                           style={{ backgroundColor: "#00a9e5", color: "#ffff", border: "none", borderRadius: "5px" }}>
                             {Loading ?  <CircularProgress   size="20px"/> : 'submit' }
                             
                             </button>
                         </div>
          </form>


        </Box>
      </Modal>

      <div id="tosat">
        <ToastContainer position='top-center'  />
      </div>

      
    </div>
  );
}