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
            offer: 1000,
            price: 7500
        },{
            id: 2,
            imgPath:"/images/bkhome-mb.jpg",
            model: "Mazda steng 98k",
            km: 80000,
            year: 2001,
            offer: 400,
            price: 5200
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
            offer: 700,
            price: 6800
        }
    ]

    if (!offerCards.length > 0) {
        return
    }

    return (
    <>
        <h3 className='section_title'>Nos offres du mois</h3> 
            <div className='test'>
            <div className='page_section page_section_offers card_carousel_flex'>
                
                {offerCards.map((car, index) => <CarCard key={index + car.id } {...offerCards[index]} />)}
            </div>
        </div>
    </>
  )
}

export default Offers

