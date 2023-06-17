import React from 'react'

const Arrows = ({ carouselX, carouselWidth, onClick }) => {
  
  return (
    <div className={"arrows_container"}>
    <button className={'arrow arrow_left_car_carousel'} disabled={carouselX <= 0} style={carouselX <= 0 ? {opacity:"0.3"} : {}} onClick={() => onClick("left")}>
        <div className={'arrow_left'} ></div>
    </button >
    <button className={'arrow  arrow_right_car_carousel'} disabled={carouselX && carouselX >= carouselWidth } style={(carouselX && carouselX >= carouselWidth - 1) ? { opacity: "0.3" } : {}} onClick={() => onClick("right")}>
        <div className={'arrow_right'}></div>
    </button>
 </div>
  )
}

export default Arrows
