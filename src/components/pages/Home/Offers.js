import React,{ useState,useEffect,useRef } from 'react'
import CarCard from '../../CarCard/CarCard'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows'
import axios from '../../../api/axios'

const Offers = ({cars,count}) => {
    const [arrowTarget, setArrowTarget] = useState()
    const carousel = useRef();
    const [carouselWidth,setCarouselWidth]=useState(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth)
    const [carouselX, setCarouselX] = useState(0)
    const [pathName, setPathName] = useState("")
    const [offerCards, setofferCards] = useState([])
    const [offerLimit, setOfferLimit] = useState(0);
    const [carCount, setcarCount] = useState(0);
    const [cardsOffsetWitdth,setCardsOffsetWidth] = useState(0)
 

    //carousel scroll event
    const handleScrollCarousel = (direction) => {
        const cardPadding = 20;
            carousel.current.scrollBy({
                left: direction + window.innerWidth - cardPadding,
                behavior: "smooth"
            })
        /** prevent multiple clicks*/
            setTimeout(() => {
                setArrowTarget("")
            }, 500) 
    }
    
    useEffect(() => {
        setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
        setPathName(window.location.pathname)   
    }, [pathName])

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
            setCarouselX(carousel?.current?.scrollLeft)
            setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);  
        })

        return carousel.current.removeEventListener("scroll", () => {
            setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);  
        })

        }, [carouselX,carouselWidth,carousel?.current?.offsetWidth])

    
    useEffect(() => {
      
         window.addEventListener("resize", () => {
           
            if (pathName === "/") {
                setCarouselX(carousel?.current?.scrollLeft);
                setCarouselWidth(carousel?.current?.scrollWidth - carousel.current.offsetWidth);
            }
           
        })   

        return window.removeEventListener("resize", () => {
            if (pathName === "/") {
                setCarouselX(carousel?.current?.scrollLeft);
                setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
            }
         })

     }, [pathName])
    
    
     useEffect(() => {
        const homepagePath = process.env.REACT_APP_HTTP + "pages/homePage.php";
        const formData = new FormData();
            formData.append('limit', offerLimit)
            axios.post(homepagePath, formData, {
                headers: {"Content-Type": "application/x-www-form-urlencoded"}})
                .then(response => {
                  
                if (response?.data?.status !== 0 && response?.status === 200) {
                      
                      if (response?.data?.cars[0]?.length > 0) {
                            setcarCount(response?.data?.cars[1]) 
                            setofferCards(response?.data?.cars[0])
                        }
                        
                      } else {
                        //create component for error page
                        console.warn(response.data.message)
                    }
                
                }).catch(error => console.warn(error))  
           
     }, [])
       
   


    return (
        <div style={offerCards && offerCards?.length > 0 ? {display:"block"} : {display:"none"}}>
            <h3 className={'section_title section_title_offres'}>Nos offres du mois</h3> 
            <Arrows cardsTotalWidth={offerCards.length * 300} carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction)=>setArrowTarget(direction)}  />
           
        <div className={"section_page section_page--grey"}>
            <div className={'carCards_container'} ref={carousel}>
            <div className={'page_section page_section_offers card_carousel_flex'} style={offerCards.length * 300 < window.innerWidth ? { justifyContent: "center" } : {}}>
                {/* { offerCards && offerCards?.map((car, index) => car.id && <CarCard key={index}  {...cars[index]} />) } */}
                { offerCards && offerCards?.map((car, index) => car.id && <CarCard key={index}  {...offerCards[index]} />) }
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


