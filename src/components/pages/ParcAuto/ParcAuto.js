import React, { useState,useEffect } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import CarCard from '../../CarCard/CarCard'
import SwitchPageBlock from '../../SwitchPageBlock/SwitchPageBlock'

const ParcAuto = () => {
  const [cars, setCars] = useState([])

  
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
      <div>
      <PageTitle pageTitle={"Notre Parc automobile"} />
        <div className={'parc_auto_cars_section'}>
        {cars.map((car, index) => <CarCard key={"parc-auto " + index + car.id} {...cars[index]} />)}
          </div>
          <SwitchPageBlock dataLength={cars.length}/>
    </div>
  )
}

export default ParcAuto
