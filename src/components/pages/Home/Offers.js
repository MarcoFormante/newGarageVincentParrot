import React,{ useState,useEffect,useRef } from 'react'
import CarCard from '../../CarCard/CarCard'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows'


const Offers = () => {
    const [arrowTarget, setArrowTarget] = useState()
    const [carouselWidth,setCarouselWidth]=useState()
    const [carouselX,setCarouselX]=useState()
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
   
    /* provisoire!! fetch data Count(card_offers)*/
    const offerCards = [
        {
            id: 1,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 1000,
            price: 7500
        },{
            id: 2,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 400,
            price: 5200
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        }

        ,{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        }

        ,{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        }

        ,{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        }

        ,{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        }

        ,{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 700,
            price: 6800
        }
    ]

    if (!offerCards.length > 0) {
        return
    }

    return (
        <>
            <h3 className={'section_title section_title_offres'}>Nos offres du mois</h3> 
            <Arrows carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction)=>setArrowTarget(direction)}  />
           
        <div className={"section_page section_page--grey"}>
            <div className={'carCards_container'} ref={carousel}>
            <div className={'page_section page_section_offers card_carousel_flex'}>
                 {offerCards.map((car, index) => <CarCard key={index + car.id } {...offerCards[index]} />)}
            </div>
              
            </div>
            <div className={"container_full--flex"}>
                <ButtonCta className={"cta cta--red cta_offers"} inner={"Tous nos vèhicules"} type={"link"} to={"/parc-auto"} />
            </div>
        </div>
        </>
  )
}

export default Offers


