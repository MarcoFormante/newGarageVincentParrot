
import React, { useEffect, useState,useRef } from 'react'
import StarsBlock from '../../Stars/StarsBlock'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows';

//Section "Vos Avis" in home page
const AvisSection = () => {
    const carousel = useRef();
    const [arrowTarget, setArrowTarget] = useState()
    const [carouselWidth,setCarouselWidth]=useState()
    const [carouselX,setCarouselX]=useState()
    const [avis, setAvis] = useState([{
        name: "clement",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
        note: Math.floor(Math.random()*6)
    },
    {
        name: "clement",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
        note:Math.floor(Math.random()*6)
    },
    {
        name: "clement",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
        note: Math.floor(Math.random()*6)
    },
    {
        name: "clement",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
        note: Math.floor(Math.random()*6)
    },
    {
        name: "clement",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum pariatur nihil animi voluptates repellat qui dicta, repudiandae vel saepe labore suscipit dolor voluptate possimus reprehenderit ducimus odit deserunt delectus distinctio?",
        note: Math.floor(Math.random()*6)
        }]);
    
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
      
            setAvis([...avis])
    
    }, [])
    
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

    

    useEffect(() => {
       
        carousel.current.addEventListener("scroll", () => {
            
                setCarouselX(carousel.current.scrollLeft)
            
            })

            return carousel.current.removeEventListener("scroll", () => { setCarouselX(carousel.current.scrollLeft) })
        
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
        

    }, [])

   
        return (
          
            
            <div className={'section_avis'} style={!avis.length > 0 ? {display:"none"} : {display:"block"}}>
             
                    <h3 className={'section_title section_title_avis'}>Vos avis</h3> 

                    <div className={"section_page section_page--grey"}>
                        <div className={'avis_score'}>
                              <div className={"avis_score_stars"}>
                                  {/** stars block set "clickable" for avis page */}
                                  <StarsBlock numberOfActiveStars={5} clickable={false}/>
                                  <span className={'score'}>4,7/5</span>
                              </div>
                              <ScoreBarsBlock />
                          </div>
                      </div>
                       
                    <Arrows carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction) => setArrowTarget(direction)} />
                
                        <div className={"avis_cards_container"}>
                            <div className={"avis_cards_container_inner"}  ref={carousel}>
                              {avis.map((avis, index) => <AvisCard key={"avis_" + index +"_card" } name={avis.name}  text={avis.text} note={avis.note} />)}
                          </div>
                          <p className='title_cta'>Votre avis nous interesse</p>
                          <ButtonCta type={"link"} to={"/avis"} inner={"Je donne mon avis"} className={"btn_avis"} />
                        </div>
                
                
                </div>
        )

     
     } 
  
    


export default AvisSection


const ScoreBarsBlock = () => {
    const bars = [1, 2, 3, 4, 5];


    return (
    <div>
            {bars.map((bar, index) => <ScoreBar key={"scorebar_" + Math.floor(Math.random()*100 ) + "_bar" + bar} scoreNum={bar}/>)}
    </div>
    )
}


const ScoreBar = ({scoreNum}) => {
    return (
        <div>
            <div className={'score_bar'}>
                <span className={'score_num_bar'}>{scoreNum + " Stars"}</span>
                <div className={'bar_outer'}>
                    <div className={'bar_inner'}>
                        {/** dynamic bar that change the width fething dataScore from database */}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AvisCard = ({name,text,note}) => {
    
    return (
        <div>
            <div className={'avis_card'}>
                <span className={'avis_card_name'}>{name}</span>
                <q className={'avis_card_text'}>{text}</q>
                <div className={'avis_card_note'}>
                   <StarsBlock numberOfActiveStars={note} clickable={false}/> 
                </div>
            </div>
        </div>
        
    )
}



