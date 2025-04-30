import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import create from "assets/images/icons/create.png"
import close from "assets/images/icons/close.png"
import upload from "assets/images/icons/upload.png"
// import close2 from "assets/images/icons/close2.png"

import { TextField } from '@mui/material';
import { useFormik } from 'formik'
import * as Yup from 'Yup'
import axios from 'axios';




interface Formdata {
  name : string,
  comment : string,
  title: string,
  content: string,
  img: string,
  relatedimg: []

}




export default function BasicModal() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [bolbimg, setbolbimg] = useState<string>()
  // const [filechk, setfilechk] = useState<File>()

  const schema = Yup.object().shape({
    'title': Yup.string().required('Enter Title'),
    'content': Yup.string().required('Enter Content'),
    'name' : Yup.string().required('Enter Name'),
    'comment' : Yup.string(),
  })


  const Formik = useFormik<Formdata>({

    initialValues: {
      name : '',
      comment : '',
      title: '',
      content: '',
      img: '',
      relatedimg: []
    },
    validationSchema: schema,

    onSubmit: (values) => {
      console.log('frkmfkr', values)
    }

  })


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const fileimg = target.files?.[0];
    if (fileimg) {
      console.log('frngf', fileimg)

      const cloudinary = new FormData()

      cloudinary.append('upload_preset', 'wellinit_blogs')
      cloudinary.append(' cloud_name', 'dfry6rebw')
      cloudinary.append('file', fileimg)
  
      console.log('ekvmkmfntb', cloudinary)
  
      const response = await axios.post('https://api.cloudinary.com/v1_1/dfry6rebw/image/upload', cloudinary)
      Formik.setFieldValue('img', response?.data?.secure_url)

    }
  };

  const handleFileChange2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const fileimg = target.files;

    if (fileimg) {
      const main =  Array.from(fileimg);

      const emptyspace : string[] = []
      main.map( async (data)=>{
        const cloudinary = new FormData()
        cloudinary.append('upload_preset', 'wellinit_blogs')
        cloudinary.append(' cloud_name', 'dfry6rebw')
        cloudinary.append('file', data)

        const response = await axios.post('https://api.cloudinary.com/v1_1/dfry6rebw/image/upload' , cloudinary)
        emptyspace.push(...[] , response?.data?.secure_url)

       })

       Formik.setFieldValue('relatedimg' , emptyspace)
    }

  };
  






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
          width: '500px',
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
                name="name"
                type="text"
                style={{ border: "2px solid #00a9e5", borderRadius: "10px", marginTop: "5px" }}
                variant="filled"
                placeholder="Enter Blog Title"
                onChange={(e) => { Formik.setFieldValue('name', e.target.value) }}
                fullWidth
                autoFocus
              />
              {
                Formik.touched.name && Formik.errors.name ? (<span className='error'>{Formik.errors.name}</span>) : null
              }
            </div>
            <div className='bloginput'>
              <label>Title</label>
              <TextField
                id="title"
                name="title"
                type="text"
                style={{ border: "2px solid #00a9e5", borderRadius: "10px", marginTop: "5px" }}
                variant="filled"
                placeholder="Enter Blog Title"
                onChange={(e) => { Formik.setFieldValue('title', e.target.value) }}
                fullWidth
                autoFocus
              />
              {
                Formik.touched.title && Formik.errors.title ? (<span className='error'>{Formik.errors.title}</span>) : null
              }
            </div>

            <div className='bloginput'>
              <label>Content</label>
              <textarea
                aria-label="minimum height"
                rows={6}
                onChange={(e) => { Formik.setFieldValue('content', e.target.value) }}
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
                onChange={(e) => { Formik.setFieldValue('comment', e.target.value) }}
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
              onChange={handleFileChange2}
              multiple
              style={{ display: "none" }}

            />


            <div className='bloginput'>
              <label>Choose Image</label>

              <div className='blogimg' style={{ display: "flex", justifyContent: "center", gap: "10px" }} onClick={() => { document.getElementById('file')?.click() }}>
                <p>Upload</p>
                <img src={upload} className='img-fluid' />
              </div>
{/* 
              {
                bolbimg ? (
                  <div className="img-show" >
                    <div style={{ position: "relative", width: "70px", padding: "10px 0px" }}>
                      <img src={`${bolbimg}`} style={{ width: "70px", height: "70px", objectFit: "cover" }} className='img-fluid' />

                      <div style={{ position: "absolute" }} className='removeimg' onClick={() => { Formik.setFieldValue('img', ''); setbolbimg(''); setfilechk(undefined) }}>
                        <img src={close2} style={{ width: "15px" }} className='img-fluid' />
                      </div>
                    </div>

                  </div>
                ) : null
              } */}

            </div>

            <div className='bloginput'>
              <label>Choose Related Image</label>

              <div className='blogimg' style={{ display: "flex", justifyContent: "center", gap: "10px" }} onClick={() => { document.getElementById('file2')?.click() }}>
                <p>Upload</p>
                <img src={upload} className='img-fluid' />
              </div>

              {/* {
                bolbimg ? (
                  <div className="img-show" >
                    <div style={{ position: "relative", width: "70px", padding: "10px 0px" }}>
                      <img src={`${bolbimg}`} style={{ width: "70px", height: "70px", objectFit: "cover" }} className='img-fluid' />

                      <div style={{ position: "absolute" }} className='removeimg'>
                        <img src={close2} style={{ width: "15px" }} className='img-fluid' />
                      </div>
                    </div>

                  </div>
                ) : null
              } */}

            </div>

            <div className="bloginput">
              <button className='btn' type='submit' style={{ backgroundColor: "#00a9e5", color: "#ffff", border: "none", borderRadius: "5px" }}>Submit</button>
            </div>
          </form>



        </Box>
      </Modal>
    </div>
  );
}