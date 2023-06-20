import React, { useState, useEffect,useRef} from 'react'
import Arrows from '../../Arrows/Arrows'
import { useLocation} from 'react-router-dom'
import PageTitle from '../../PageTitle/PageTitle'
import axios from '../../../api/axios'


const CarDetails = () => {
    const location = useLocation()
    
  return (
      <div>
            <PageTitle pageTitle={location.state.make + " " +location.state.model}/>
          <CarPhotos {...location.state} />
          <Details {...location.state} />
    </div>
  )
}

export default CarDetails




// Photos of single car car Photos carousel component
const CarPhotos = ({make,model,year,km,price,offer}) => {
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
        <div className={'car_details_top_carousel_container'}>
           
            <div className={'img_show_large'}>
            <div className={'car_details_base'}>
                    <div>
                        <span>Année: {year} </span>
                        <span>Km: {km} </span>
                        <p>Prix: 
                            <span style={offer > 0 ? { textDecoration: "line-through"} : {}}> {price} $</span> 
                                {offer && offer > 0 ? <span style={{ color: "red" }}> {price - offer} $</span> : ""}
                        </p>
                    </div>
    
                <img src={imgLarge} alt="" /> 
                
                </div> 
            </div>
            {/**Carousel car details */}
            <Arrows carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction) => setArrowTarget(direction)} />
            
            <div className={'details_carousel_container'} ref={carousel}>
            <div className={'details_carousel_imgs'}>
                    {imgs.map((img, index) => <img  className={ activeImg === img.id ? "img_carousel_details--active":"img_carousel_details"} key={"car_detail" + index } src={img.img} alt=""  width={250} height={180} onClick={() => handleOnClick(img.img,img.id) }/>)}
            </div>
        </div>
        </div>
    )
}




//car Details Component
const Details = ({id,make,model,year,km}) => {
    const [activeDetail, setActiveDetail] = useState(true);
    const [details, setDetails] = useState([])
    const [equipements, setEquipements] = useState([])
    const [Error, setError] = useState(false);
    const detailsTitles = ["Catégorie", "Année", "Kilométrage", "Boîte de vitesses", "Puissance DIN","Nùmero VO", "Puissance fiscale","Couleur","Portières","Sièges","Énergie"]
  

    useEffect(() => {
        const carDetailsPath = process.env.REACT_APP_HTTP + "pages/carDetails.php"

        axios.get(carDetailsPath + "?details=true&id="+id)
            .then(response => {
                
                if (response.status === 200 && response.statusText === "OK") {

                    const {
                        category,
                        gearbox,
                        din_power,
                        fiscal_power,
                        color,
                        doors,
                        seats,
                        vo_number,
                        energy
                    } = response?.data[0];
                    
                    const detailsArray = [
                        category,
                        year, km + " km",
                        gearbox,
                        din_power + "cv",
                        vo_number,
                        fiscal_power + "ch",
                        color,
                        doors,
                        seats,
                        energy
                    ];
                    
                    setDetails([...detailsArray])
                    setEquipements([...response.data[1]])

                } else {
                    setError(true);
                }
               
            })
        
    }, [])
    
 
    const handleActiveDetailBlock = (clicked_element) => {
         switch (clicked_element) {
            case "first":
                 if (activeDetail === false) {
                    setActiveDetail(true) 
                 } else {
                     
                     setActiveDetail(true)
                }
                 break;
             
                  case "second":
                    if (activeDetail === true) {
                        setActiveDetail(false) 
                     } else {
                         setActiveDetail(true)
                    }
                     break;
         
            default:
                break;
         }
    }
    console.log(details);

    return (
       ( details.length > 0 ) &&
        <div>
            <div className={'container--center--row container--center--row--flex-end'}>
                {!details.length < 1 && <div
                    className={'details_first_container details_container'}
                    style={activeDetail === true ? { border: "1px solid", backgroundColor: "#D64E54" } : { opacity: "0.3" }}
                    onClick={() => handleActiveDetailBlock("first")}
                >
                    <span className={'details_title_header'}>Détails du vehicule</span>
                </div>}

                {equipements.length > 0 && <div
                    className={'details_second_container details_container'}
                    style={activeDetail === false  ? { border: "1px solid", backgroundColor: "#D64E54" } : { opacity: "0.3" }}
                    onClick={() => handleActiveDetailBlock("second")}
                >
                    <span className={'details_title_header'}>Equipement</span>
                </div>}
            </div>

            <div className={'detail_first_inner'}>
                <ul className={"detail_first_inner_list"}>
                    {
                    activeDetail === true
                        ?
                        details && detailsTitles.map((detail, index) => !details.length < 1 && <li key={"detail_" + index}><span className='detail_title'>{detail}</span> <span> {details[index]}</span></li>)
                        :
                        equipements && equipements.map((equipement, index) => <li key={"equipement_" + index}><span className='detail_title--black'>{equipement}</span></li>)
                        
                    }
                    </ul>
                </div>
        </div>
    )
}




