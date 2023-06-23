import React, { useRef, useState, useEffect } from 'react'
import MultiRangeSlider from './MultiRangeSlider'


const CarFilters = ({handleChangeFilters}) => {

 

  return (
    <div>
      
    <div className='filters range_slider_block'>
     
   
     <MultiRangeSlider
      min={0}
      max={5000000}
        onChange={({ min, max }) => handleChangeFilters({minKm:min,maxKm:max})}
          title={"Km"}
      />

    <MultiRangeSlider
      min={0}
      max={5000000}
      onChange={({ min, max }) => handleChangeFilters({minPrice:min,maxPrice:max})}
          title={"Prix"}
          
      />

    <MultiRangeSlider
      min={0}
      max={20234}
      onChange={({ min, max }) => handleChangeFilters({minYear:min,maxYear:max})}
          title={"Annèe"}
          
      />

      <div>
        <input id={"offre"} type="checkbox" />
        <label htmlFor={'Offre'}> Offre du mois</label>
      </div>
      
      </div>
      </div>
  )
}

export default CarFilters







