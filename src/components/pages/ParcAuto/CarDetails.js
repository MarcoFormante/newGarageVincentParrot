import React, { useState, useEffect,useRef} from 'react'
import Arrows from '../../Arrows/Arrows'
import { useLocation } from 'react-router-dom'
import PageTitle from '../../PageTitle/PageTitle'


const CarDetails = () => {
    const location = useLocation()
    
  return (
      <div>
           <PageTitle pageTitle={location.state.make + " " +location.state.model}/>
          <CarPhotos {...location.state} />
          <Details carID={location.state.id} />
    </div>
  )
}

export default CarDetails




// Photos of single car car Photos carousel component
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
const Details = ({id}) => {
    const [activeDetail, setActiveDetail] = useState(true);
    const [details, setDetails] = useState([])
    const [equipements,setEquipements]= useState([])
    const detailsTitles = ["Catégorie", "Année", "Kilométrage", "Boîte de vitesses", "Puissance DIN", "Puissance fiscale","Couleur","Portières","Sièges","Énergie"]
    

    useEffect(() => {
        //fetch real details data of car id *

            //  !!! Important !!
            // don't forget to add ch & cv in details value (puissence fiscal, puissence DIN)
        const detailsArray = ["Compacte", "2019", "36654", "Manuelle", "125", "6", "Rouge", "5", "5", "Essence"];
        const equipementsArray = ["Vitres arrière surteintées","Caméra de recul","Pack B&O","Haut parleurs","ABS","Accoudoir central AV","AFIL","Aide au démarrage en côte","Airbag conducteur","Airbag passager","Airbags latéraux AV et AR","Airbags rideaux AV et AR","Antidémarrage électronique","Appui-tête conducteur réglable hauteur","Appui-tête passager réglable en hauteur","Bacs de portes avant","Banquette 60/40","Banquette AR rabattable","Boite à gants fermée","Borne Wi-Fi","Boucliers AV et AR couleur caisse","Capteur de luminosité","Capteur de pluie","Clim automatique bi-zones","Commande du comportement dynamique","Commandes vocales","Vitres avant électriques","Volant cuir","Volant multifonction","Volant sport"]
        setDetails([...detailsArray])
        setEquipements([...equipementsArray])
        
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
    

    return (
        <div>
            <div className={'container--center--row container--center--row--flex-end'}>
                <div
                    className={'details_first_container details_container'}
                    style={activeDetail === true ? { border: "1px solid", backgroundColor: "#D64E54" } : { opacity: "0.3" }}
                    onClick={() => handleActiveDetailBlock("first")}
                >
                    <span className={'details_title_header'}>Détails du vehicule</span>
                </div>

                <div
                    className={'details_second_container details_container'}
                    style={activeDetail === false ? { border: "1px solid", backgroundColor: "#D64E54" } : { opacity: "0.3" }}
                    onClick={() => handleActiveDetailBlock("second")}
                >
                    <span className={'details_title_header'}>Equipement</span>
                </div>
            </div>

            <div className={'detail_first_inner'}>
                <ul className={"detail_first_inner_list"}>
                    {
                    activeDetail === true
                        ?
                        detailsTitles.map((detail, index) => <li key={"detail_" + index}><span className='detail_title'>{detail} </span> <span> {details[index]}</span></li>)
                        :
                        equipements.map((equipement, index) => <li key={"equipement_" + index}><span className='detail_title--black'>{equipement}</span></li>)
                        
                    }
                    </ul>
                </div>
        </div>
    )
}





// Vitres arrière surteintées
// Caméra de recul
// Pack B&O
// Haut parleurs
// ABS
// Accoudoir central AV
// AFIL
// Aide au démarrage en côte
// Airbag conducteur
// Airbag passager
// Airbags latéraux AV et AR
// Airbags rideaux AV et AR
// Antidémarrage électronique
// Appui-tête conducteur réglable hauteur
// Appui-tête passager réglable en hauteur
// Bacs de portes avant
// Banquette 60/40
// Banquette AR rabattable
// Boite à gants fermée
// Borne Wi-Fi
// Boucliers AV et AR couleur caisse
// Capteur de luminosité
// Capteur de pluie
// Clim automatique bi-zones
// Commande du comportement dynamique
// Commandes vocales
// Vitres avant électriques
// Volant cuir
// Volant multifonction
// Volant sport