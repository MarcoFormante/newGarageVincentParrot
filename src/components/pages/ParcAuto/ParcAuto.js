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
    const [filters, setFilters] = useState({ minKm: 0, maxKm: 500000, minYear: 0, maxYear: 3000, minPrice: 0, maxPrice: 1000000, offer: false })
    const [loading, setLoading] = useState(false);
    
    function handleCarPage(page) {
        setCurrentPage(page)
    }
    function handleFilters() {
        setFilters({})
    }
  
//   useEffect(() => {
//   //fetch data * all cars limit 12 
//     setCars([{
//     id: 1,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 0,
//     price: 7500
// },{
//     id: 2,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 0,
//     price: 5200
// },{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 0,
//     price: 6800
// },{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// }

// ,{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// }

// ,{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// }

// ,{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// }

// ,{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 0,
//     price: 6800
// }

// ,{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// },{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// },{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 0,
//     price: 6800
// },{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 700,
//     price: 6800
// },{
//     id: 3,
//     thumbnail:"/images/bkhome-mb.jpg",
//     model: "Mazda steng 98k",
//     km: 80000,
//     year: 2001,
//     offer: 0,
//     price: 6800
//         },
//         {
//         id: 3,
//         thumbnail:"/images/bkhome-mb.jpg",
//         model: "Mazda steng 98k",
//         km: 80000,
//         year: 2001,
//         offer: 0,
//         price: 6800
//         },
//         {
//             id: 3,
//             thumbnail:"/images/bkhome-mb.jpg",
//             model: "Mazda steng 98k",
//             km: 80000,
//             year: 2001,
//             offer: 0,
//             price: 6800
//         },
//         {
//             id: 3,
//             thumbnail:"/images/bkhome-mb.jpg",
//             model: "Mazda steng 98k",
//             km: 80000,
//             year: 2001,
//             offer: 0,
//             price: 6800
//         },
//         {
//             id: 3,
//             thumbnail:"/images/bkhome-mb.jpg",
//             model: "Mazda steng 98k",
//             km: 80000,
//             year: 2001,
//             offer: 0,
//             price: 6800
//         },
//         {
//             id: 3,
//             thumbnail:"/images/bkhome-mb.jpg",
//             model: "Mazda steng 98k",
//             km: 80000,
//             year: 2001,
//             offer: 0,
//             price: 6800
//         },
//         {
//             id: 3,
//             thumbnail:"/images/bkhome-mb.jpg",
//             model: "Mazda steng 98k",
//             km: 80000,
//             year: 2001,
//             offer: 0,
//             price: 6800
//               },
//     ])
    
//   }, [])
    

    useEffect(() => {
    setLoading(true)
    const carAutoPath = process.env.REACT_APP_HTTP + "pages/parcAuto.php";
        axios.get(`${carAutoPath}?page=${currentPage * 10}&filters=${JSON.stringify(filters)}`)
            .then(response => {
                console.log(response.statusText);
                if (response.status === 200 && response.request.readyState === 4 ) {
                    setCars(response?.data?.cars)
                    setCarCount(response?.data?.count)
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                }
            }).catch(error=> console.log(error.data))
  },[currentPage])
    

  
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
                    <CarFilters />
                </aside>
            </div>
            <PageTitle pageTitle={"Notre Parc automobile"} />
          
            <div className='parc_auto_cars_switch_block'>
              <div className={'parc_auto_cars_section'}>   
                  {loading ? "loading..." : ""}
                {cars && !loading && cars.map((car, index) => <CarCard key={"parc-auto " + index + car.id} {...cars[index]} />)}
            </div>
                  <SwitchPageBlock dataLength={carCount} handleCarPage={(page)=> handleCarPage(page)} />
            </div>
            
    </div>
  )
}

export default ParcAuto
