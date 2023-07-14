import React, {useState, useEffect } from 'react'
import MultiRangeSlider from './MultiRangeSlider'
import axios from '../../../api/axios'

const CarFilters = ({handleChangeFilters,closeButton,setFiltersToggle,loadFilteredCars}) => {
  const [offer, setOffer] = useState(false)
  const [filters, setFilters] = useState({})
  const [baseFilters,setBaseFilters] = useState({})
 
  
  function handleOfferChange() {
    setOffer(!offer);
    
  }

  useEffect(() => {
    handleChangeFilters({offer})
  }, [offer])
  


  useEffect(() => {
    if (filters) {
      const parcAutoPath = "pages/parcAuto.php";
      axios.get(parcAutoPath + "?getFilters=true") 
        .then(response => {
          setFilters({ ...response?.data })
          setBaseFilters({...response?.data})
        })
    }
  },[])
  

  return (
  <div>
      
    <div className='filters range_slider_block'>
     
      {filters.minKm && <MultiRangeSlider
        min={filters.minKm - 1}
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

        <div style={{marginTop:50}}>
          <div className='container--center--row'>
            <label htmlFor={'Offre'}> Filtrer les offres</label>
            <input id={"offre"} type="checkbox" checked={offer} onChange={handleOfferChange}/>
          </div>
          <div className='reset container--center--row'>Reset <span className='reset_icon_filters reset_icon' onClick={() => {
              setOffer(false)
              handleChangeFilters({ minKm: 0, maxKm: 50000000000, minYear: 0, maxYear: 50000000, minPrice: 0, maxPrice: 500000000, offer: false })
            setFilters({ baseFilters })
            loadFilteredCars()

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







