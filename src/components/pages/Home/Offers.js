import React,{ useState,useEffect,useRef } from 'react'
import CarCard from '../../CarCard/CarCard'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows'
import axios from '../../../api/axios'

const Offers = ({cars,count}) => {
    const [arrowTarget, setArrowTarget] = useState()
    const [carouselWidth,setCarouselWidth]=useState()
    const [carouselX, setCarouselX] = useState()
    const [pathName, setPathName] = useState("")
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
           
            setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);  
        })

        return carousel.current.removeEventListener("scroll",()=>{})

        }, [carouselX,carouselWidth])

    
    useEffect(() => {
        
         window.addEventListener("resize", () => {
            
            if (pathName === "/") {
                setCarouselX(carousel.current.scrollLeft);
                setCarouselWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
            }
           
        })   

         return window.removeEventListener("resize", () => {})

     }, [pathName])
    
   


    return (
        <div style={cars.length > 0 ? {display:"block"} : {display:"none"}}>
            <h3 className={'section_title section_title_offres'}>Nos offres du mois</h3> 
            <Arrows carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction)=>setArrowTarget(direction)}  />
           
        <div className={"section_page section_page--grey"}>
            <div className={'carCards_container'} ref={carousel}>
            <div className={'page_section page_section_offers card_carousel_flex'}>
            { cars && cars.map((car, index) => car.id && <CarCard key={index}  {...cars[index]} />) }
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


