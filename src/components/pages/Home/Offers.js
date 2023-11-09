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
    const [carCount, setcarCount] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0)
    const [imgWidth,setImgWidth] = useState(0)

 

    //carousel scroll event
    const handleScrollCarousel = React.useCallback((direction) => {
        const cardPadding = 20;
            carousel.current.scrollBy({
                left: direction + 310,
                behavior: "smooth"
            })
        /** prevent multiple clicks*/
            setTimeout(() => {
                setArrowTarget("")
            }, 500) 
    }, [])
    
 
    
    useEffect(() => {
        setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
        setPathName(window.location.pathname)   
    }, [pathName])

    useEffect(() => {
        setCarouselX(carousel.current.scrollLeft);
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
    }, [arrowTarget, carouselWidth, handleScrollCarousel])
    
    // every tick check scrollLeft of carousel ref
    useEffect(() => {
        
        carousel?.current?.addEventListener("scroll", () => {
            setCarouselX(carousel?.current?.scrollLeft)
            setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);  
        })

        return carousel?.current?.removeEventListener("scroll", () => {
            setCarouselX(carousel?.current?.scrollLeft)
            setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);  
        })

    }, [carouselX, carouselWidth, carousel?.current?.offsetWidth])
    

    useEffect(() => {
        window.addEventListener("resize", (e) => {
            if (e.target) {
                setScreenWidth(e.target.innerWidth)
            }
        })

        return () => window.removeEventListener("resize", (e) => {
            if (e.target) {
                setScreenWidth(e.target.innerWidth)
            }
        })
    },[])


    
    
     useEffect(() => {
         axios.get(`car/offers`)
                .then(response => {
                  
                if (response?.data?.status !== 0 && response?.status === 200) {
                      
                    if (response?.data?.cars?.length > 0) {
                            setcarCount(response?.data?.count) 
                            setofferCards(response?.data?.cars)
                        }
                        
                      } else {
                    
                        console.warn(response?.data?.message)
                    }
                
                }).catch(error => console.warn(error))  
           
     }, [])
     
   
   

    return (
        <div style={offerCards && offerCards?.length > 0 ? {display:"block"} : {display:"none"}}>
             <h3 className={'section_title section_title_offres'}>{!parseInt(offerCards[0]?.offer) > 0 ? "Les dernieres arrivées" : "Les offres du moment"}</h3>
            <Arrows cardsTotalWidth={offerCards.length * imgWidth } carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction)=>setArrowTarget(direction)}  />
           
            <div className={"section_page section_page--grey"} >
            <div className={'carCards_container'} ref={carousel} style={{overflowY:"hidden"}}>
            <div className={'page_section page_section_offers card_carousel_flex'}  style={offerCards.length * imgWidth < window.innerWidth ? { justifyContent: "center"} : {}}>
                { offerCards && offerCards?.map((car, index) => car.id  && <CarCard setImgWidth={setImgWidth}  lastlocation={"home"} key={index}  {...offerCards[index]} />) }
            </div>
              
            </div>
            <div className={"container_full--flex"}>
                <ButtonCta className={"cta cta--red cta_offers cta--wh-70vw container--center--row"} inner={"Tous nos vèhicules"} type={"link"} to={"/parc-auto"} />
            </div>
        </div>
        </div>
  )
}

export default Offers


