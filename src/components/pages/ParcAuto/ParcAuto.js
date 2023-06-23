import React, { useState,useEffect } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import CarCard from '../../CarCard/CarCard'
import SwitchPageBlock from '../../SwitchPageBlock/SwitchPageBlock'
import CarFilters from './CarFilters'
import axios from '../../../api/axios'

const ParcAuto = () => {
  const [cars, setCars] = useState([])
    const [filtersToggle, setFiltersToggle] = useState(false);
    const [carCount, setCarCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [filters, setFilters] = useState({ minKm: 0, maxKm: 500000, minYear: 0, maxYear: 500000, minPrice: 0, maxPrice: 1000000, offer: false })
    const [loading, setLoading] = useState(false);
  
    
  
    function handleCarPage(page) {
        setCurrentPage(page)
  }
  
 console.log("damandare : ",filters);

    useEffect(() => {
        
            setLoading(true)
            const parcAutoPath = process.env.REACT_APP_HTTP + "pages/parcAuto.php";
                axios.get(`${parcAutoPath}?page=${currentPage * 10}&filters=${JSON.stringify(filters)}&getFilters=${true}`)
                    .then(response => {
                        console.log(response?.data);
                        console.log(response.statusText);
                        if (response.status === 200 && response.request.readyState === 4 ) {
                            setCars(response?.data?.cars)
                            setCarCount(response?.data?.count)
                            setTimeout(() => {
                                setLoading(false);
                            }, 500);
                        }
                    })
                  
                  .catch(error => console.log(error.data))
        
   
    }, [currentPage, filters])
    
  console.log(filters);
  
  



    return (
      
        <div className='parc-auto_page'>
           
          <div className='filters_container'>
         
                <div
                  className={filtersToggle ? "filters_btn_toggle filters_btn_toggle--active" : 'filters_btn_toggle'}
                  onClick={() => setFiltersToggle(!filtersToggle)}
                >
                  {filtersToggle ? "X" : "Filters"}
                </div>
             
                <aside style={filtersToggle === true ? { display: "block" } : { display: "none" }}>
                    <p className='filtre_title'>Filtres</p>
                    <CarFilters  handleChangeFilters={(value)=>setFilters({...filters,...value})}/>
                </aside>
            </div>
            <PageTitle pageTitle={"Notre Parc automobile"} />
          
            <div className='parc_auto_cars_switch_block'>
              <div className={'parc_auto_cars_section'}>   
                    {loading ? "loading..." : ""}
                    {(carCount === undefined) && <div className='error-message'>0 voiture trouvé</div>}
                {cars && !loading && cars.map((car, index) => <CarCard key={"parc-auto " + index + car.id} {...cars[index]} />)}
            </div>
                  <SwitchPageBlock carCount={carCount} dataLength={carCount} handleCarPage={(page)=> handleCarPage(page)} />
            </div>
            
    </div>
  )
}

export default ParcAuto
