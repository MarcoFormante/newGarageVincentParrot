import React, { useRef, useState, useEffect } from 'react'
import MultiRangeSlider from './MultiRangeSlider'
import axios from '../../../api/axios'

const CarFilters = ({handleChangeFilters}) => {
  const [offer, setOffer] = useState(false)
  const [filters, setFilters] = useState({})
  
 

  function handleOfferChange() {
    setOffer(!offer);
  }

  useEffect(() => {
    handleChangeFilters({offer})
  }, [offer])
  


  useEffect(() => {
    const parcAutoPath = process.env.REACT_APP_HTTP + "pages/parcAuto.php";
    axios.get(parcAutoPath + "?getFilters=" + true) 
      .then(response => {
      setFilters({...response?.data})
      })
  },[])
  
  
  
  return (
    <div>
      
    <div className='filters range_slider_block'>
     
     {filters.minKm && <MultiRangeSlider
      min={filters.minKm -1}
      max={filters.maxKm + 1}
        onChange={({ min, max }) => handleChangeFilters({minKm:min,maxKm:max})}
          title={"Km"}
      />}

    {filters.minPrice && <MultiRangeSlider
      min={filters?.minPrice - 1}
      max={filters?.maxPrice + 1}
      onChange={({ min, max }) => handleChangeFilters({minPrice:min,maxPrice:max})}
          title={"Prix"}
          
      />}

    {filters.minYear && <MultiRangeSlider
      min={filters.minYear - 1}
      max={filters.maxYear + 1}
      onChange={({ min, max }) => handleChangeFilters({minYear:min,maxYear:max})}
          title={"Annèe"}
          
      />}

      <div>
        <input id={"offre"} type="checkbox" checked={offer} onChange={handleOfferChange}/>
        <label htmlFor={'Offre'}> Offre du mois</label>
      </div>
      
      </div>
      </div>
  )
}

export default CarFilters







