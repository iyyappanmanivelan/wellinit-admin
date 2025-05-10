import React, { useEffect, useState } from 'react';
import * as Yup from 'Yup';
import upload from 'assets/images/icons/upload.png';
import filtericon from 'assets/images/icons/close2.png';
import { CircularProgress, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import { instance } from 'config/config';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface Formdata {
    // name: string;
    comment: string;
    title: string;
    content: string;
    img: string;
    relatedimg: [];
    mm_dd_yy: string;
    time: string;
}



const Userform = ({ onClose }: any) => {


    const [Loading, setLoading] = useState<boolean>(false);

    const [bolbimg, setbolbimg] = useState<File>();

    const [multimg, setmultimg] = useState<string[]>([]);

    const [content, setcontent] = useState<string>('')
    const [overview, setoverview] = useState<string>('')

    const apiKey = '/api/blogs';

    const schema = Yup.object().shape({
        title: Yup.string().required('Enter Title'),
        // content: Yup.string().required('Enter Content'),
        // comment: Yup.string().required('Enter Your Overview'),
    });



    const Formik = useFormik<Formdata>({
        initialValues: {
            comment: '',
            title: '',
            content: '',
            img: '',
            relatedimg: [],
            mm_dd_yy: '',
            time: '',
        },

        validationSchema: schema,

        onSubmit: async (values, { resetForm }) => {
            setLoading(true);



            try {
                const MOMENT = moment();
                const DD = MOMENT.date();
                const MM = moment().format('MMMM');
                const YY = MOMENT.year();
                const time = moment().utcOffset('+05:30').format('hh:mm a');

                const data = {
                    // name: values?.name,
                    title: values?.title,
                    content: content,
                    img: values?.img,
                    comment: overview,
                    relatedimg: multimg,
                    mm_dd_yy: `${MM} ${DD}, ${YY}`,
                    time: `${time}`,
                };

                const response = await instance.post(`${apiKey}`, data);
                console.log('vfv', response);
                console.log(values);
                resetForm();
                setbolbimg(undefined);
                setLoading(false);
                toast.success('Blog Added Succesfully');
                setmultimg([]);
                handleBackdropClick();
            } catch (err) {
                console.log(err);
                setLoading(false);
                toast.success('Something Error !');
            }
        },
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const fileimg = target.files?.[0];

        if (fileimg) {
            setbolbimg(fileimg);
            const Cloudinary = new FormData();
            Cloudinary.append('upload_preset', 'wellinit_blogs');
            Cloudinary.append('cloud_name', 'dfry6rebw');
            Cloudinary.append('file', fileimg);

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dfry6rebw/image/upload',
                    Cloudinary,
                );
                const imageUrl = response?.data?.secure_url;
                if (imageUrl) {
                    Formik.setFieldValue('img', imageUrl);
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
                const Cloudinary = new FormData();
                Cloudinary.append('upload_preset', 'wellinit_blogs');
                Cloudinary.append('cloud_name', 'dfry6rebw');
                Cloudinary.append('file', data);
                try {
                    const response = await axios.post(
                        'https://api.cloudinary.com/v1_1/dfry6rebw/image/upload',
                        Cloudinary,
                    );

                    const imageUrl = response?.data?.secure_url;
                    if (imageUrl) {
                        setmultimg((prev) => [...prev, imageUrl]);
                    }
                } catch (error) {
                    console.error('Upload error:', error);
                }
            });
        }
    };

    const filterimg = (data: string) => {
        const ddd = multimg.filter((val) => !val.includes(data));
        setmultimg(ddd);
    };

    const handleBackdropClick = () => {
        onClose();
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            ['code-block', 'link',]
        ]
    };


    const submitting = Formik.isSubmitting;

    useEffect(() => {
        const firsterror = Object.keys(Formik.errors)[0];

        const el = document.querySelector(`[id = "${firsterror}"]`);
        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [submitting]);


    return (
        <>
            <div>
                <Typography fontSize="1.5rem" margin="5px 0px" fontWeight="600">Add Blogs</Typography>
                <form
                    onSubmit={Formik.handleSubmit}
                    style={{ overflowY: 'scroll', height: '450px', marginTop: '20px' }}
                >
                    {/* <div className="bloginput">
                        <label>Name</label>
                        <TextField
                            id="name"
                            type="text"
                            style={{ border: '2px solid rgb(147 143 143)', borderRadius: '5px', marginTop: '5px' }}
                            variant="filled"
                            placeholder="Enter Blog Name"
                            {...Formik.getFieldProps('name')}
                            fullWidth
                        // autoFocus
                        />
                        {Formik.touched.name && Formik.errors.name ? (
                            <span className="error">{Formik.errors.name}</span>
                        ) : null}
                    </div> */}

                    <div className="bloginput">
                        <label>Choose Image</label>
                        <div
                            className="blogimg"
                            style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
                            onClick={() => {
                                document.getElementById('file')?.click();
                            }}
                        >
                            <p>Upload</p>
                            <img src={upload} className="img-fluid" />
                        </div>
                        {bolbimg ? <p style={{ margin: "5px 0px" }}>Selected Image</p> : ''}
                        {bolbimg ? (
                            <div className='showimg'>
                                <img
                                    src={`${URL.createObjectURL(bolbimg)}`}
                                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                    className="img-fluid"
                                />
                            </div>
                        ) : null}
                    </div>

                    <div className="bloginput">
                        <label>Title</label>
                        <TextField
                            id="title"
                            type="text"
                            style={{ border: '2px solid rgb(147 143 143)', borderRadius: '5px', marginTop: '5px' }}
                            variant="filled"
                            placeholder="Enter Blog Title"
                            {...Formik.getFieldProps('title')}
                            fullWidth
                        />
                        {Formik.touched.title && Formik.errors.title ? (
                            <span className="error">{Formik.errors.title}</span>
                        ) : null}
                    </div>

                    <div className="bloginput">
                        <label>Overview</label>
                        {/* <textarea
                            aria-label="minimum height"
                            rows={4}
                            id="comment"
                            {...Formik.getFieldProps('comment')}
                            placeholder="Enter Overview"
                            style={{
                                border: '2px solid rgb(147 143 143)',
                                borderRadius: '5px',
                                width: '100%',
                                padding: '20px',
                                marginTop: '5px',
                                font: 'inherit',
                            }}
                        /> */}

                        <ReactQuill theme="snow" modules={modules} value={overview} onChange={setoverview} />

                        {/* 
                        {Formik.touched.comment && Formik.errors.comment ? (
                            <span className="error">{Formik.errors.comment}</span>
                        ) : null} */}
                    </div>


                    <div className="bloginput">
                        <label>Content</label>
                        {/* <textarea
                            aria-label="minimum height"
                            id="content"
                            rows={6}
                            {...Formik.getFieldProps('content')}
                            placeholder="Enter Blog Content"
                            style={{
                                border: '2px solid rgb(147 143 143)',
                                borderRadius: '5px',
                                width: '100%',
                                padding: '20px',
                                marginTop: '5px',
                                font: 'inherit',
                            }}
                        />
                        {Formik.touched.content && Formik.errors.content ? (
                            <span className="error">{Formik.errors.content}</span>
                        ) : null} */}
                        <ReactQuill theme="snow" modules={modules} value={content} onChange={setcontent} />

                    </div>


                    <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    <input
                        id="file2"
                        name="file"
                        type="file"
                        multiple
                        onChange={handleFileChange2}
                        style={{ display: 'none' }}
                    />



                    <div className="bloginput">
                        <label>Choose Related Image</label>
                        <div
                            className="blogimg"
                            style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
                            onClick={() => {
                                document.getElementById('file2')?.click();
                            }}
                        >
                            <p>Upload</p>
                            <img src={upload} className="img-fluid" />
                        </div>
                        {multimg.length > 0 ? <p style={{ margin: "5px 0px" }}>Selected Image</p> : ''}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {multimg.length > 0
                                ? multimg.map((img) => (
                                    <div className='showimg' style={{ position: "relative" }}>
                                        <img
                                            src={img}
                                            className="img-fluid"
                                        />
                                        <div
                                            className="filtericon"
                                            style={{ cursor: 'pointer', position: "absolute", top: "0px", right: "0px" }}
                                            onClick={() => {
                                                filterimg(img);
                                            }}
                                        >
                                            <img src={filtericon} />
                                        </div>
                                    </div>
                                ))
                                : null}
                        </div>
                    </div>

                    <div className="bloginput">
                        <button
                            className="btn"
                            type="submit"
                            style={{
                                backgroundColor: '#00a9e5',
                                color: '#ffff',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                        >
                            {Loading ? <CircularProgress size="20px" /> : 'Submit'}
                        </button>
                    </div>
                </form>

            </div>

            <ToastContainer position='top-center' />

        </>
    )

}


export default Userform;