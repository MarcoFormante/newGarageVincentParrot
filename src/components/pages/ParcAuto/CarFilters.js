import React, { useRef, useState, useEffect } from 'react'
import MultiRangeSlider from './MultiRangeSlider'


const CarFilters = () => {


  return (
    <div>
      
    <div className='filters range_slider_block'>
     
   
     <MultiRangeSlider
      min={0}
      max={180000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
        title={"Km"}
      />

    <MultiRangeSlider
      min={0}
      max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
        title={"Prix"}
      />

    <MultiRangeSlider
      min={0}
      max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
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







