import React, { useState,useEffect } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import CarCard from '../../CarCard/CarCard'
import SwitchPageBlock from '../../SwitchPageBlock/SwitchPageBlock'
import CarFilters from './CarFilters'
import axios from '../../../api/axios'
import ButtonCta from '../../Buttons/ButtonCta'
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../Loading/Loading'


const ParcAuto = () => {
    const [cars, setCars] = useState([])
    const [filtersToggle, setFiltersToggle] = useState(false)
    const [carCount, setCarCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [filters, setFilters] = useState({ minKm: 0, maxKm: 500000, minYear: 0, maxYear: 500000, minPrice: 0, maxPrice: 1000000, offer: false })
    const [loading, setLoading] = useState(false)
    const notifySuccess = (text) => toast.success(text)
    const notifyError = (text) => toast.error(text)
  
  function handleCarPage(page) {
        setCurrentPage(page)
  }

  useEffect(() => {
    if (filtersToggle) {
      if (carCount === undefined) {
        notifyError("0 voitures trouvées")
      } else if(carCount > 0) {
        notifySuccess(carCount + " voitures trouvées")
      }
    }
  },[carCount])
  
 

    useEffect(() => {
        
      setLoading(true)
      const parcAutoPath = process.env.REACT_APP_HTTP + "pages/parcAuto.php";
          axios.get(`${parcAutoPath}?page=${currentPage * 10}&filters=${JSON.stringify(filters)}&getFilters=true`)
              .then(response => {
                  console.log(response?.data);
                  console.log(response.statusText);
                
                  if(response.status === 200 && response.request.readyState === 4 ) {
                    setCars(response?.data?.cars)
                      setCarCount(response?.data?.count)
                      setTimeout(() => {
                        setLoading(false);
                    }, 500);
                  }
              })
            
            .catch(error => console.log(error.data))
    }, [currentPage, filters])
    
  
  
  

    return (
      
      <div className='parc-auto_page'>
        <Loading isLoading={loading}/>
         <Toaster/>
          <div className='filters_container'>
            <div className={`${filtersToggle ?  "filter_window--active filters_window " : "filters_window "}`}>
            <p className='filtre_title'>Filtres</p>
            
            <CarFilters closeButton={
                  <ButtonCta
                  type={"button"}
                  inner={"Fermer"}
                  className={"cta cta--red  mar-auto"}
                  onClick={() => setFiltersToggle(!filtersToggle)}
                  />}
              
                handleChangeFilters={
                (value) => {
                  setFilters({ ...filters, ...value })
                  handleCarPage(0)
                }}
              
              setFiltersToggle={()=>setFiltersToggle(!filtersToggle)}
            />
            </div>
          </div>
            <PageTitle pageTitle={"Notre Parc automobile"} />
          
            <div className={'filters_btn_toggle'} onClick={() => setFiltersToggle(!filtersToggle)}>
                <div className={filtersToggle === false ? "filters_icon" : "filter_icon--active"}></div>
            </div>
            <div className='parc_auto_cars_switch_block'>
              <div className={'parc_auto_cars_section'}>   
                  
                {cars && !loading && cars.map((car, index) => <CarCard key={"parc-auto " + index + car.id} {...cars[index]} />)}
            </div>
                  <SwitchPageBlock carCount={carCount} dataLength={carCount} currentPage={currentPage} setCurrentPage={(value)=>setCurrentPage(value)} handleCarPage={(page)=> handleCarPage(page)} />
            </div>
            
    </div>
  )
}

export default ParcAuto
