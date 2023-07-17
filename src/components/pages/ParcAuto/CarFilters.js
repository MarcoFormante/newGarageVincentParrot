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
      const parcAutoPath = "pages/parcAuto.php";
      axios.get(parcAutoPath + "?getFilters=true") 
        .then(response => {
          setFilters({ ...response?.data })
          setBaseFilters({...response?.data})
        })
  },[])
  
  useEffect(() => {
    if (reset) {
      setFilters({...baseFilters})
    } else {
      setFilters({...filters})
    }
   
  },[reset])

  return (
  <div>
      
    <div className='filters range_slider_block'>
     
        {filters.minKm && <MultiRangeSlider
          filter={filters}
          reset={reset}
          setReset={(value)=>setReset(value)}
        min={filters.minKm }
        max={filters.maxKm  }
          onChange={({ min, max }) => handleChangeFilters({ minKm: min, maxKm:max })}
            title={"Km"}
        />}

      {filters.minPrice && <MultiRangeSlider
        min={parseInt(filters?.minPrice) }
        max={parseInt(filters?.maxPrice) }
        onChange={({ min, max }) => handleChangeFilters({minPrice:parseInt(min - 1),maxPrice: (max + 1)})}
            title={"Prix"}
            
        />}

      {filters.minYear && <MultiRangeSlider
        min={parseInt(filters.minYear) }
        max={parseInt(filters.maxYear) }
        onChange={({ min, max }) => handleChangeFilters({minYear:parseInt(min - 1),maxYear:parseInt(max + 1)})}
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
            
            }, 10);
            

          

          }}></span></div>
        </div>
       
        <div>
      {  closeButton}
        </div>
      
    </div>
  </div>
  )
}

export default CarFilters







