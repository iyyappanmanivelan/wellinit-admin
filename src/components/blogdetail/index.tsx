import IconifyIcon from "components/base/IconifyIcon";
import ReactSwiper from "components/base/ReactSwiper";
import { useScreenWidth } from "components/base/usescreenwidth";
import { instance } from "config/config";
import { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import noimg from 'assets/images/noimg.jpg';


import DOMPurify from 'dompurify';



interface data {
    id: string | undefined
}

interface Task {
    id: number,
    title: string,
    name: string,
    comment: string,
    content: string,
    img: string,
    relatedimg: [] ,
    mm_dd_yy: string,
    time: string
}


const BlogdetailComponent = ({ id }: data) => {

    const apiKey = "/api/blogs"
    const [Detail, setDetail] = useState<Task>()

    const GET_BLOG_DATA = async () => {

        try {
            if (id) {
                const response = await instance.get(`${apiKey}/${id}`)
                setDetail(response?.data?.data)
            }
        }

        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        GET_BLOG_DATA()

    }, [id])


    const screenWidth = useScreenWidth()

    const slidesPerView = screenWidth >= 1024 ? 3 : screenWidth >= 768 ? 2 : 1;





    console.log('detailpage')


    return (

        <section style={{ padding: "30px 0px" }}>
            <div className="container">

                <div className="bg-title">
                    <h2>{Detail?.title.toUpperCase()}</h2>
                </div>

                <div className="bgtech">
                    <div className="bloginfo" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <IconifyIcon icon="mdi:account-circle" color="text.secondary" fontSize="h6.fontSize" />
                        <p>{'Admin'}</p>
                    </div>
                    <div className="bloginfo" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <IconifyIcon icon="mdi:application" color="text.secondary" fontSize="h6.fontSize" />
                        <p>{Detail?.mm_dd_yy}</p>
                    </div>
                    <div className="bloginfo" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <IconifyIcon icon="mynaui:clock-circle" color="text.secondary" fontSize="h6.fontSize" />
                        <p>{Detail?.time}</p>
                    </div>
                </div>

                <div className="bgmpic">
                    <img src={Detail?.img ? Detail?.img : noimg} className="img-fluid" />
                </div>

                {
                    Detail?.comment ? (
                        <div className="bgcnt" >
                            <h5 className="bgcntsub">Overview</h5>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Detail?.comment) }}></div>
                        </div>
                    ) : ''
                }

                {
                    Detail?.content ? (
                        <div className="bgcnt" >
                            <h5 className="bgcntsub">Description</h5>
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(Detail?.content) }}></div>
                        </div>

                    ) : ''
                }


                {
                    Detail?.relatedimg   ?
                        (
                            <div className="relateimg">
                                <h5 className="bgcntsub">Realted Images</h5>
                                <ReactSwiper
                                    slidesPerView={slidesPerView}
                                >
                                    <Swiper>
                                        {
                                            Detail?.relatedimg?.map((img) => (
                                                <SwiperSlide >
                                                    <div className="rl-img">
                                                        <img src={img} className="img-fluid" />
                                                    </div>

                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>

                                </ReactSwiper>
                            </div>
                        ) : ''
                }


            </div>





        </section>

    )
}

export default BlogdetailComponent;