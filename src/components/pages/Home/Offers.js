import React from 'react'
import CarCard from '../../CarCard/CarCard'

const Offers = () => {
    /* provisoire!! fetch data Count(card_offers)*/
    const offerCards = [
        {
            id: 1,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 6500,
            price: 7500
        },{
            id: 2,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 4900,
            price: 5200
        },{
            id: 3,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 6300,
            price: 6800
        }
    ]

    if (!offerCards.length > 0) {
        return
    }

  return (
    <div className='page_section page_section_offers'>
          <h3 className='section_title'>Nos offres du mois</h3>  
          {offerCards.map((car, index) => <CarCard key={index + car.id } {...offerCards[index]} />)}
    </div>
  )
}

export default Offers

