import React, {useState, useEffect } from 'react'
import MultiRangeSlider from './MultiRangeSlider'
import axios from '../../../api/axios'

const CarFilters = ({handleChangeFilters,closeButton,loadFilteredCars}) => {
  const [offer, setOffer] = useState(false)
  const [filters, setFilters] = useState({})
  const [baseFilters, setBaseFilters] = useState({})
  const [reset,setReset] = useState(false)
 
  
  function handleOfferChange() {
    setOffer(!offer);
  }

  useEffect(() => {
    handleChangeFilters({offer})
  }, [offer])
  

  useEffect(() => {
      axios.get("car/filters") 
        .then(response => {
          setFilters({ ...response?.data.filters })
        })
  },[reset])
  
  useEffect(() => {
    if (reset) {
      setFilters({...baseFilters})
    } else {
      setFilters({...filters})
    }
   
  }, [reset])
  


  return (
  <div>
      
    <div className='filters range_slider_block' style={!filters.minKm ? {display:"none"}: {}}>
     
        {filters.minKm && <MultiRangeSlider
          filter={filters}
          reset={reset}
          setReset={(value)=>setReset(value)}
        min={filters.minKm  }
        max={filters.maxKm }
          onChange={({ min, max }) => handleChangeFilters({ minKm: min -1, maxKm: max + 1 })}
            title={"Km"}
        />}

      {filters.minPrice && <MultiRangeSlider
        min={parseInt(filters?.minPrice) }
        max={parseInt(filters?.maxPrice ) }
        onChange={({ min, max }) => handleChangeFilters({minPrice: min ,maxPrice: max })}
            title={"Prix"}
            
        />}

      {filters.minYear && <MultiRangeSlider
        min={parseInt(filters.minYear) }
        max={parseInt(filters.maxYear) }
        onChange={({ min, max }) => handleChangeFilters({minYear: min - 1, maxYear: max + 1})}
            title={"Annèe"}
        />}

        <div style={{marginTop:50}}>
          <div className='container--center--row'>
            <label htmlFor={'Offre'}> Filtrer les offres</label>
            <input id={"offre"} type="checkbox" checked={offer} onChange={handleOfferChange}/>
          </div>
          <div className='reset container--center--row'>Reset <span className='reset_icon_filters reset_icon' onClick={() => {
              setOffer(false)
              setFilters({ minKm: 0, maxKm: 8000000, minPrice: 0, maxPrice: 8000000000, minYear: 0, maxYear: 800000000, offer: false })
          
          
            setReset(true)
            setTimeout(() => {
              setReset(false)
              handleChangeFilters({ minKm: 0, maxKm: 8000000, minPrice: 0, maxPrice: 8000000000, minYear: 0, maxYear: 800000000, offer: false })
            
            }, 1000);
            

          

          }}></span></div>
        </div>
       
        <div>
      {closeButton}
        </div>
      
    </div>
  </div>
  )
}

export default CarFilters







