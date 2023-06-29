import React from 'react'

const Arrows = ({ cardsTotalWidth ,carouselX, carouselWidth, onClick }) => {

  
  return (
    <div className={"arrows_container"}>
      <button className={'arrow arrow_left_car_ca rousel'}
        disabled={carouselX <= 0}
        style={carouselX <= 0 ? { opacity: "0.3" } : {}}
        onClick={() => onClick("left")}
      >
        <div className={'arrow_left'} ></div>
    </button >
      <button className={'arrow  arrow_right_car_carousel'}
        disabled={(carouselX && carouselX >= carouselWidth) || cardsTotalWidth < window.innerWidth}
        style={((carouselX && carouselX >= carouselWidth - 1) || cardsTotalWidth < (window.innerWidth)) ? { opacity: "0.3" } : {}}
        onClick={() => onClick("right")}
      >
        <div className={'arrow_right'}></div>
    </button>
 </div>
  )
}

export default Arrows
