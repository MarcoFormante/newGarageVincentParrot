import React,{ useState,useEffect,useRef } from 'react'
import CarCard from '../../CarCard/CarCard'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows'
import axios from '../../../api/axios'

const Offers = () => {
    const [arrowTarget, setArrowTarget] = useState()
    const [carouselWidth,setCarouselWidth]=useState(0)
    const [carouselX, setCarouselX] = useState(0)
    const [pathName, setPathName] = useState("")
    const [offerCards, setofferCards] = useState([])
    const [offerLimit, setOfferLimit] = useState(0);
    const [isSentOffers, setIsSentOffers] = useState(false);
    const [carCount, setcarCount] = useState(0);
    const carousel = useRef();
  
    //carousel scroll event
    const handleScrollCarousel = (direction) => {
        const cardPadding = 20;
            carousel.current.scrollBy({
                top: 0,
                left: direction + window.innerWidth - cardPadding,
                behavior: "smooth"
            })
        /** prevent multiple clicks*/
            setTimeout(() => {
                setArrowTarget("")
            }, 500) 
    }
    
    useEffect(() => {
        setPathName(window.location.pathname)   
    }, [window.location.pathname])
    

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
            setCarouselX(carousel.current.scrollLeft);
            setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);  
        })

        return carousel.current.removeEventListener("scroll",()=>{})

        }, [carouselX])

    

    
     useEffect(() => {
         window.addEventListener("resize", () => {
             console.log("e");
            if (pathName === "/") {
                setCarouselX(carousel.current.scrollLeft);
                setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
            }
           
        })   

         return window.removeEventListener("resize", () => {})

     }, [pathName])
    
   
    
    useEffect(() => {
        
        const offersPath = process.env.REACT_APP_HTTP + "pages/homePage.php";
        const formData = new FormData();
            formData.append('limit', offerLimit)
            axios.post(offersPath, formData, {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}})
                .then(response => {
                    if (response.data.status !== 0) {
                        if (response?.data?.cars?.length > 0 ) {
                            setcarCount(response?.data?.count[0]) 
                            setofferCards(response?.data?.cars)
                        }
                    } else {
                        console.warn(response.data.message)
                    }
                
                }).catch(error => console.warn(error))  
           
     }, [])
   
     


    return (
        <div style={offerCards.length > 0 ? {display:"block"} : {display:"none"}}>
            <h3 className={'section_title section_title_offres'}>Nos offres du mois</h3> 
            <Arrows carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction)=>setArrowTarget(direction)}  />
           
        <div className={"section_page section_page--grey"}>
            <div className={'carCards_container'} ref={carousel}>
            <div className={'page_section page_section_offers card_carousel_flex'}>
            { offerCards && offerCards.map((car, index) => car.id && <CarCard key={index}  {...offerCards[index]} />) }
            </div>
              
            </div>
            <div className={"container_full--flex"}>
                <ButtonCta className={"cta cta--red cta_offers"} inner={"Tous nos vèhicules"} type={"link"} to={"/parc-auto"} />
            </div>
        </div>
        </div>
  )
}

export default Offers


