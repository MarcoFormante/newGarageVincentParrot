
import { array } from 'prop-types'
import React, { useEffect, useState} from 'react'


//Section "Vos Avis" in home page
const AvisSection = () => {
   
  return (
    <div>
      <h3 className={'section_title section_title_avis'}>Vos avis</h3> 
        <div className={"section_page section_page--grey"}>
            <div className={'avis_score'}>
                  <div className={"avis_score_stars"}>
                      {/** stars block set "clickable" for avis page */}
                      <StarsBlock numberOfStars={5} clickable={false} />
                  </div>
            </div>
        </div>
    </div>
  )
}

export default AvisSection


//STAR (only one)
export const Star = ({color,onClick,style}) => {
    
    return (
        <>
            <svg width="32" onClick={onClick} style={style}  height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path  d="M1.63028 11.0004C0.851657 10.274 0.613745 9.63831 0.916543 9.09346C1.21934 8.54861 1.9547 8.27618 3.12264 8.27618H10.7142L14.2829 1.95588C14.7587 1.04779 15.3535 0.59375 16.0672 0.59375C16.781 0.59375 17.3757 1.04779 17.8516 1.95588L21.4851 8.27618H29.0118C30.223 8.27618 30.9692 8.54861 31.2503 9.09346C31.5315 9.63831 31.2828 10.274 30.5042 11.0004L30.4393 11.0549L24.7294 16.9393L27.6492 24.0769C28.0385 25.0213 27.9845 25.6661 27.487 26.0112C26.9896 26.3562 26.2217 26.3108 25.1836 25.8749L16.0997 22.061L7.01574 25.8749C5.93433 26.3108 5.1557 26.3562 4.67988 26.0112C4.20406 25.6661 4.1608 25.0213 4.55011 24.0769L7.46994 16.9393L1.69516 11.0549L1.63028 11.0004Z" fill={color === "red" ? "#D64E54" : "grey"} />
            </svg>
        </>
    )
}


//STARS BLOCK
export const StarsBlock = ({ numberOfStars,clickable}) => {
    const [stars, setStars] = useState([0, 0, 0, 0, 0])
    const [starsLength,setStarsLength] = useState(numberOfStars)
    
    const setNote = (indexStar) => {

        if (clickable) {
            const array = [];
            stars.forEach((star, index) => {
                if (index <= indexStar) {
                    array[index] = 1
                } else{
                    array[index] = 0
                }
            })
            setStars([...array])
            }
        }
    
  
    useEffect(() => {
        stars.map((star, index) =>
            starsLength -1 >= index
                ?
                stars[index] = 1
                :
                stars[index]= 0
        )
        }, [])
    

        return (
            <div className={'stars_block'}>
                {stars && stars.map((star, index) =>
                    
                    <Star key={index + "_" + Math.floor(Math.random() * 50) + "_stars"} 
                        onClick={(e) => setNote(index)}
                        style={clickable ? { cursor: "pointer" } : {}}
                        color={star === 1 ? "red" : "grey"}
                    />
                )}
            </div>
        )
    }

