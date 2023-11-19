import React, { useState, useEffect } from 'react'
import Star from './Star'

//STARS BLOCK
const StarsBlock = ({ numberOfActiveStars,clickable,setReview,formSent}) => {
    const [stars, setStars] = useState([0,0,0,0,0])
    const [activeStarsLength, setActiveStarsLength] = useState(numberOfActiveStars)
    
    const onClick = (indexStar) => {
      if (clickable) {
        const array = [];
        let note = 0;
        stars.forEach((star, index) => {
          if (index <= indexStar) {
            array[index] = 1;
          } else {
            array[index] = 0;
          }
        });
        setStars([...array]);
        note = array.reduce((num, i) => num + i);
        setReview(note);
        console.log(note);
      }
    };
   
    useEffect(()=>{
        if (formSent) {
            onClick(4)
        }
    },[formSent])
    
   
    useEffect(() => {
        setActiveStarsLength(4);
        let starsArray = [0, 0, 0, 0, 0];
        starsArray.map((star, index) =>
            activeStarsLength -1 >= index
                ?
                starsArray[index] = 1
                :
                starsArray[index] = 0
        )
       
        setStars(starsArray)
       
        }, [])
    

        return (
            <div className={'stars_block'}>
                {stars && stars.map((star, index) =>
                    <Star key={"stars__" + index} 
                        onClick={(e) => onClick(index)}
                        style={clickable ? { cursor: "pointer" } : {}}
                        color={star === 1 ? "red" : "grey"}
                    />
                )}
            </div>
        )
    }


export default StarsBlock
