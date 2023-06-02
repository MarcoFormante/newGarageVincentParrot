import React, { useState, useEffect,useRef} from 'react'
import Arrows from '../../Arrows/Arrows'
import { useLocation } from 'react-router-dom'


const CarDetails = () => {
    const location = useLocation()

   
  return (
    <div>
          <CarPhotos {...location.state} />
    </div>
  )
}

export default CarDetails




// Photos of single car
const CarPhotos = ({model,year,km,price,offer}) => {
    const [imgs, setImgs] = useState([])
    const [imgLarge, setImgLarge] = useState("")
    const [arrowTarget, setArrowTarget] = useState()
    const [carouselWidth,setCarouselWidth]=useState()
    const [carouselX, setCarouselX] = useState()
    const [activeImg, setActiveImg] = useState();
    const carousel = useRef();

  
    //carousel scroll event
    const handleScrollCarousel = (direction) => {
            carousel.current.scrollBy({
                top: 0,
                left: direction + document.querySelector(".img_carousel_details").width,
                behavior: "smooth"
            })
        
        /** prevent multiple clicks*/
            setTimeout(() => {
                setArrowTarget("")
            }, 500) 
    }

    const handleOnClick = (imgPath,imgId) => {
        setImgLarge(imgPath);
        setActiveImg(imgId);
    }
    
    

    useEffect(() => {
        setCarouselX(carousel.current.scrollLeft);
        setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        switch (arrowTarget) {
            case "left":
                handleScrollCarousel("-")
                break;
            case "right":
                handleScrollCarousel("+")
                break;
        
            default:
                break;
        }
    }, [arrowTarget, carouselWidth])
    
    //every tick check scrollLeft of carousel ref
    useEffect(() => {
        carousel.current.addEventListener("scroll", () => {
            setCarouselX(carousel.current.scrollLeft)
        })   

        return carousel.current.removeEventListener("scroll",()=>{})

    }, [])
    
     useEffect(() => {
         window.addEventListener("resize", () => {
                setCarouselX(carousel.current.scrollLeft);
                setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        })   

         return window.removeEventListener("resize", () => {
                 setCarouselX(carousel.current.scrollLeft);
                 setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
        })

    },[])
   
    
    useEffect(() => {
        //fetch data imgs from img folder by backend
        setImgs([
            {
                id: 0,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 1,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 2,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
            {
                id: 3,
                img:"/images/bkhome-mb.jpg"
            },
        ])
    },[])
   

    useEffect(() => {
        setImgLarge(imgs[0]?.img) 
        setActiveImg(imgs[0]?.id)
    }, [imgs])
    

    return (
        <div>
            <div className='img_show_large'>
                <img src={imgLarge} alt="" width={600} /> 
                <div className='car_details_base'>
                    <div>
                        <span>Model: </span>
                        <span>Année: </span>
                        <span>Km: </span>
                        <span>Prix:</span>
                    </div>
                    
                    <div>
                        <span>{model}</span>
                        <span>{year}</span>
                        <span>{km}</span>
                        <span>
                            <span style={offer > 0 ? { textDecoration: "line-through"} : {}}> {price} </span> 
                            {offer && offer > 1 ? <span style={{ marginLeft: "10px", color: "red" }}> {price - offer}</span> : ""}
                        </span>
                    </div>
                
                </div> 
            </div>
            {/**Carousel car details */}
            <Arrows carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction)=>setArrowTarget(direction)}  />
            <div className='details_carousel_container' ref={carousel}>
            <div className='details_carousel_imgs'>
                    {imgs.map((img, index) => <img style={activeImg === img.id ? {border:"2px solid red",boxShadow:" 0 0 10px red"} : {}} className={"img_carousel_details"} key={"car_detail" + index } src={img.img} alt=""  width={250} height={180} onClick={() => handleOnClick(img.img,img.id) }/>)}
            </div>
        </div>
        </div>
    )
}