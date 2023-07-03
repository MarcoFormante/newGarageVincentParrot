import React, { useState, useEffect,useRef} from 'react'
import Arrows from '../../Arrows/Arrows'
import { useLocation} from 'react-router-dom'
import PageTitle from '../../PageTitle/PageTitle'
import axios from '../../../api/axios'
import Loading from '../../Loading/Loading'


const CarDetails = () => {
    const location = useLocation()
    const [loadingComponent,setLoadingComponent] = useState(null)
    const [detailsInLoading, setDetailsInLoading] = useState(true);
    const [carPhotosInLoading, setCarPhotosInLoading] = useState(true);

    useEffect(() => {
        if (detailsInLoading && carPhotosInLoading) {
            setLoadingComponent(<Loading isLoading={true}/>)
        } else {
            setTimeout(() => {
                setLoadingComponent(<Loading isLoading={false}/>)
            }, 800);
        }
       
   },[detailsInLoading,carPhotosInLoading])
    
  return (
      <div>
            {loadingComponent}
            <PageTitle pageTitle={location.state.make + " " + location.state.model}/>
            <CarPhotos {...location.state} setCarPhotosInLoading={(value)=>setCarPhotosInLoading(value)}  />
            <Details {...location.state}   setDetailsInLoading={(value)=>setDetailsInLoading(value)} />
    </div>
    )
        

}

export default CarDetails




// Photos of single car ,car Photos carousel component
const CarPhotos = ({thumbnail,year,km,price,offer,setCarPhotosInLoading}) => {
    const [imgs, setImgs] = useState([])
    const [imgLarge, setImgLarge] = useState("")
    const [arrowTarget, setArrowTarget] = useState()
    const [carouselWidth,setCarouselWidth]=useState()
    const [carouselX, setCarouselX] = useState()
    const [activeImg, setActiveImg] = useState()
    const carousel = useRef()
    const location = useLocation()
  
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
        setCarouselX(carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft)
        setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
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
    }, [arrowTarget, carouselWidth,carouselX])

    
    //every tick check scrollLeft of carousel ref
    useEffect(() => {
        carousel?.current?.addEventListener("scroll", () => {
            setCarouselX(carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft)
        })   

        return carousel?.current?.removeEventListener("scroll", () => {
            setCarouselX(carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft)
        })

    }, [])

    
     useEffect(() => {
         window.addEventListener("resize", () => {
                setCarouselX(carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft)
                setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
        })   

         return window.removeEventListener("resize", () => {
            setCarouselX(carousel?.current?.scrollLeft !== null && carousel?.current?.scrollLeft)
                 setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
        })

    },[])
   
    
    useEffect(() => {
        //fetch data imgs from img folder by backend
        const carDetailsPath = process.env.REACT_APP_HTTP + "pages/carDetails.php"
        axios.get(carDetailsPath + "?carImages=true&id=" + location.state.id)
            .then(response => {
                setImgs([{id:"",path:thumbnail}])
                setImgs(prev => [...prev, ...response.data])
                setCarPhotosInLoading(false);
            })
       
    },[])
   
   

    useEffect(() => {
        setImgLarge("/images/uploads/" + imgs[0]?.path) 
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
                {imgs.map((img, index) => <img  className={ activeImg === img.id ? "img_carousel_details--active":"img_carousel_details"} key={"car_detail" + index } src={"/images/uploads/" + img.path} alt=""  width={250} height={180} onClick={() => handleOnClick("/images/uploads/" +img.path,img.id) }/>)}
            </div>
        </div>
        </div>
    )
}




//car Details Component
const Details = ({id,year,km,setDetailsInLoading}) => {
    const [activeDetail, setActiveDetail] = useState(true);
    const [details, setDetails] = useState([])
    const [equipements, setEquipements] = useState([])
    const detailsTitles = ["Année", "Kilométrage", "Boîte de vitesses", "Puissance DIN","Nùmero VO", "Puissance fiscale","Couleur","Portières","Sièges","Énergie"]
  

    useEffect(() => {
        const carDetailsPath = process.env.REACT_APP_HTTP + "pages/carDetails.php";

        axios.get(carDetailsPath + "?details=true&id="+id)
            .then(response => {
                
                if (response.status === 200 && response.statusText === "OK") {

                    const {
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
                    setEquipements([...response?.data[1]])
                    setDetailsInLoading(false);
                } else {
                    console.error("Erreur:Impossible de recuperer les données(details voiture)");
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




