
import React, { useEffect, useState,useRef, useLayoutEffect, useCallback } from 'react'
import StarsBlock from '../../Stars/StarsBlock'
import ButtonCta from '../../Buttons/ButtonCta'
import Arrows from '../../Arrows/Arrows'
import axios from '../../../api/axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

//Section "Vos Avis" in home page
const AvisSection = () => {
    const carousel = useRef();
    const [arrowTarget, setArrowTarget] = useState(null)
    const [carouselWidth,setCarouselWidth]=useState(null)
    const [carouselX, setCarouselX] = useState(null)
    const [avis, setAvis] = useState([]);
    const [reviewsAverage, setReviewsAverage] = useState(0)
    const [totalStarsLength, setTotalStarsLength] = useState([])
    const [sum, setSum] = useState(0)
    const [average,setAverage] = useState(0)
    const triggerScoreAnimation = React.useRef()
    
    useEffect(() => {
        axios.get("review/all")
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
        axios.get("review/total")
            .then(response => {
                TotalReviewsCalculate(...response.data.total);
            })
    }, [])
    

    const averageAnimation = useCallback(() => {
            setTimeout(() => {
                if (average === Math.floor(reviewsAverage) ) {
                    setAverage(reviewsAverage)
                } else {
                    setAverage(average + 1)
                }
            }, 100);
    }, [average, reviewsAverage]) 
    

    useEffect(() => {
        if (average <= Math.floor(reviewsAverage)) {
            averageAnimation()
        } else {
            return ()=>{}
        }
        
    },[average])
 

    
    const handleScrollCarousel = (direction) => {
       
            const cardPadding = 20;
            carousel.current.scrollBy({
                top: 0,
                left: direction + 310,
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
    }, [arrowTarget, carouselWidth,avis.length])



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
        }, [carouselX,carouselWidth,avis.length])


    
        return (
            <div className={'section_avis'} >
                {avis.length > 0 ? <div>
                    <h3 className={'section_title section_title_avis'}>Vos avis</h3> 
                    <div className={"section_page section_page--grey"} ref={triggerScoreAnimation}>
                        <div className={'avis_score'}>
                            <div className={"avis_score_stars"}>
                                {/** stars block set "clickable" for avis page */}
                                <StarsBlock numberOfActiveStars={5} clickable={false}/>
                                <span className={'score'}>{average}/5</span>
                            </div>
                            <ScoreBarsBlock sum={sum} totalStarsLength={totalStarsLength} averageAnimation={averageAnimation} triggerAnimation={triggerScoreAnimation} />
                        </div>
                    </div>
    
                    <Arrows cardsTotalWidth={avis.length * 300} carouselX={carouselX} carouselWidth={carouselWidth} onClick={(direction) => setArrowTarget(direction)} />
                    
                    <div className={"avis_cards_container"}>
                        <div className={"avis_cards_container_inner"} style={avis.length * 300 < window.innerWidth ? { justifyContent: "center" } : {}} ref={carousel}>
                            {avis && avis.map((avis, index) =>  <AvisCard key={"avis_" + index +"_card" } name={avis.name}  message={avis.message} review={avis.review} />)}
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


const ScoreBarsBlock = ({totalStarsLength,sum,averageAnimation,triggerAnimation}) => {
    const bars = [1, 2, 3, 4, 5];
  

    return (
    <div>
            {bars.map((bar, index) =>
                <ScoreBar
                    sum={sum}
                    key={"scorebar_bar" + bar + index}
                    totalStarsLength={totalStarsLength[index]}
                    scoreNum={bar}
                    averageAnimation={averageAnimation}
                    triggerAnimation={triggerAnimation}
                />
            )}
    </div>
    )
}


const ScoreBar = ({ scoreNum, totalStarsLength,sum,averageAnimation,triggerAnimation}) => {
    
    const [barWidth, setBarWidth] = useState(477)
    const [percentage, setPercentage] = useState((totalStarsLength / (sum - totalStarsLength / barWidth)) * 100)
    const comp = React.useRef()
    const width = React.useRef()
    const el = React.useRef()
    const scoreBar = React.useRef()

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
    }, [totalStarsLength, barWidth, sum])
    
    useLayoutEffect(() => {
       gsap.registerPlugin(ScrollTrigger)
        let ctx = gsap.context(() => {
            gsap.to(el?.current, {
                width: percentage * barWidth / 100,
                duration: 2,
                scrollTrigger: {
                    trigger: triggerAnimation.current,
                    start: "-50% center",
                    end: " bottom",
                    scrub: 1
                },
                onStart: () => {
                  averageAnimation()
                }
            })
        },comp.current);
        
        return () => ctx.revert();
    },[barWidth,percentage])
   
    return (
        <div>
            <div className={'score_bar'} ref={scoreBar} >
                <span className={'score_num_bar'}>{scoreNum + " Stars"}</span>
                <div className={'bar_outer'} ref={width} style={{overflow:"hidden"}}>
                    <div className={'bar_inner'} ref={el} style={{width:0}}>
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
            <div className={'avis_card'} style={style}>

                <span className={'avis_card_name'}>{name}</span>
              
                <q className={'avis_card_text'}>{message}</q>
              
                <div className={'avis_card_note'}>
              
                <StarsBlock numberOfActiveStars={review} clickable={false} />
              
                </div>
             
            </div>
            
        </>
        
    )
}



