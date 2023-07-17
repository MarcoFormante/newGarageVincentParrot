
import React, { useEffect, useState,useRef } from 'react'
import StarsBlock from '../../Stars/StarsBlock'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows'
import axios from '../../../api/axios'

//Section "Vos Avis" in home page
const AvisSection = () => {
    const carousel = useRef();
    const [arrowTarget, setArrowTarget] = useState(null)
    const [carouselWidth,setCarouselWidth]=useState(null)
    const [carouselX, setCarouselX] = useState(null)
    const [avis, setAvis] = useState([]);
    const [reviewsAverage, setReviewsAverage] = useState(0)
    const [totalStarsLength, setTotalStarsLength] = useState([])
    const [sum,setSum] = useState(0)

    
    useEffect(() => {
    const homepagePath = "pages/homePage.php?reviews=true";
        axios.get(homepagePath)
            .then(response => {
                setAvis([...response.data.reviews])
            })
    }, [])

    
    function TotalReviewsCalculate(reviews) {
        const { total,stars1, stars2, stars3, stars4, stars5 } = reviews;
        const reviewsSum = +stars1 + +stars2 + +stars3 + +stars4 + +stars5;
        const avarage = (reviewsSum / +total) * 5;
        setReviewsAverage(avarage.toFixed(1));
        setTotalStarsLength([+stars1 , +stars2 , +stars3 , +stars4 , +stars5 ])
        setSum(reviewsSum)
    }
    
    useEffect(() => {
        const homepagePath ="pages/homePage.php?totalReviews=true";
        axios.get(homepagePath)
            .then(response => {
                
                TotalReviewsCalculate(response.data.total[0]);
            })
    }, [])
    

    
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
        if (avis.length > 0) {
            setCarouselX(carousel?.current?.scrollLeft);
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
    
        }
    }, [arrowTarget, carouselWidth])

  

    useEffect(() => {
        if (avis.length > 0) {
            carousel?.current?.addEventListener("scroll", () => {
                setCarouselX(carousel?.current?.scrollLeft)
                setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
            })

            return carousel?.current?.removeEventListener("scroll", () => {
                setCarouselX(carousel?.current?.scrollLeft)
                setCarouselWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
            })
        }
        }, [carouselX,carouselWidth])


    
        return (
            <div className={'section_avis'} >
                {avis.length > 0 ? <div>
                    <h3 className={'section_title section_title_avis'}>Vos avis</h3> 
                    <div className={"section_page section_page--grey"}>
                        <div className={'avis_score'}>
                            <div className={"avis_score_stars"}>
                                {/** stars block set "clickable" for avis page */}
                                <StarsBlock numberOfActiveStars={5} clickable={false}/>
                                <span className={'score'}>{reviewsAverage > 5 ? 5 : reviewsAverage}/5</span>
                            </div>
                            <ScoreBarsBlock sum={sum} totalStarsLength={totalStarsLength} />
                        </div>
                    </div>
    
                    <Arrows cardsTotalWidth={avis.length * 250} carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction) => setArrowTarget(direction)} />
                    
                    <div className={"avis_cards_container"}>
                        <div className={"avis_cards_container_inner"} style={avis.length * 250 < window.innerWidth ? { justifyContent: "center" } : {}} ref={carousel}>
                            {avis && avis.map((avis, index) =>   <AvisCard key={"avis_" + index +"_card" } name={avis.name}  message={avis.message} review={avis.review} />)}
                        </div>
                    
                    </div>
                </div>
                    :
                    ""
            }
                <p className='title_cta'>Votre avis nous interesse</p>
                <ButtonCta type={"link"} to={"/avis"} inner={"Je donne mon avis"} className={"cta cta--red cta--wh-70vw cta_avis"} />
            </div>
        )

     
     } 
  
    


export default AvisSection


const ScoreBarsBlock = ({totalStarsLength,sum}) => {
    const bars = [1, 2, 3, 4, 5];
  

    return (
    <div>
            {bars.map((bar, index) =>
                <ScoreBar sum={sum} key={"scorebar_bar" + bar + index}
                    totalStarsLength={totalStarsLength[index]}
                    scoreNum={bar}
                />
            )}
    </div>
    )
}


const ScoreBar = ({ scoreNum, totalStarsLength,sum}) => {
    
    const [barWidth, setBarWidth] = useState(477)
    const [percentage,setPercentage] = useState((totalStarsLength / (sum - totalStarsLength / barWidth) ) * 100)
    const width = React.useRef()

    useEffect(() => {
        if (width?.current) {
            setBarWidth(width?.current?.offsetWidth)
        }
    },[totalStarsLength])
   
    useEffect(() => {
        window.addEventListener("resize", () => {
            setBarWidth(width?.current?.offsetWidth)
        })

        window.removeEventListener("resize", () => {
            setBarWidth(width?.current?.offsetWidth)
        })
    }, [])
    

    useEffect(() => {
        setPercentage((totalStarsLength / (sum - totalStarsLength / barWidth) ) * 100)
    },[totalStarsLength,barWidth,sum])
   
    return (
        <div>
            <div className={'score_bar'} >
                <span className={'score_num_bar'}>{scoreNum + " Stars"}</span>
                <div className={'bar_outer'} ref={width}>
                    <div className={'bar_inner'} style={ (totalStarsLength && barWidth && width!==null)  ? { width: (((percentage /100 ) * barWidth)) + "px", maxWidth: barWidth   } : {width:0}}>
                        {/** dynamic bar that change the width fething dataScore from database */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AvisCard = ({name,message,review,style}) => {
    
    return (
        <>
            <div className={'avis_card'}  style={style}>

                <span className={'avis_card_name'}>{name}</span>
              
                <q className={'avis_card_text'}>{message}</q>
              
                <div className={'avis_card_note'}>
              
                <StarsBlock numberOfActiveStars={review} clickable={false} />
              
                </div>
             
            </div>
            
        </>
        
    )
}



