import React, { useState,useEffect } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import CarCard from '../../CarCard/CarCard'
import SwitchPageBlock from '../../SwitchPageBlock/SwitchPageBlock'
import CarFilters from './CarFilters'

const ParcAuto = () => {
  const [cars, setCars] = useState([])
    const [filtersToggle, setFiltersToggle] = useState(false);
  
  useEffect(() => {
  //fetch data * all cars limit 12 
    setCars([{
    id: 1,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 0,
    price: 7500
},{
    id: 2,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 0,
    price: 5200
},{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 0,
    price: 6800
},{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
}

,{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
}

,{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
}

,{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
}

,{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 0,
    price: 6800
}

,{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
},{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
},{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 0,
    price: 6800
},{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 700,
    price: 6800
},{
    id: 3,
    imgPath:"/images/bkhome-mb.jpg",
    model: "Mazda steng 98k",
    km: 80000,
    year: 2001,
    offer: 0,
    price: 6800
        },
        {
        id: 3,
        imgPath:"/images/bkhome-mb.jpg",
        model: "Mazda steng 98k",
        km: 80000,
        year: 2001,
        offer: 0,
        price: 6800
        },
        {
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 0,
            price: 6800
        },
        {
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 0,
            price: 6800
        },
        {
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 0,
            price: 6800
        },
        {
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 0,
            price: 6800
        },
        {
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 0,
            price: 6800
              },
    ])
    
  }, [])
    

  
  return (
      <div className='parc-auto_page'>
        
            <div className='filters_container'>
            <div className={filtersToggle ? "filters_btn_toggle filters_btn_toggle--active" :'filters_btn_toggle' }onClick={() => setFiltersToggle(!filtersToggle)}>{filtersToggle ? "X" : "Filters"}</div>
                <aside style={filtersToggle === true ? { display: "block" } : { display: "none" }}>
                    <p className='filtre_title'>Filtres</p>
                    <CarFilters />
                </aside>
            </div>
              <PageTitle pageTitle={"Notre Parc automobile"} />
              <div className='parc_auto_cars_switch_block'>
                  
                  <div className={'parc_auto_cars_section'}>   
              
                {cars.map((car, index) => <CarCard key={"parc-auto " + index + car.id} {...cars[index]} />)}
            </div>
                  <SwitchPageBlock dataLength={cars.length} />
            </div>
            
    </div>
  )
}

export default ParcAuto
