import React from 'react'
import PropTypes from 'prop-types'

const CarCard = ({ id, imgPath, model, km, year, offer, price }) => {
    
  return (
    <div>
      <figure className='car_card'>
            <img src={imgPath} alt={model}/>
              <figcaption car_card_model>{model}</figcaption>
              <div className='car_card_details'>
                  {/*card_details_left*/}
                <div className='car_card_details--left'>
                    <span>{km}km</span>
                    <span>Année:{year}</span>
                </div>
                   {/*card_details_right (price)*/}
                  <div className='car_card_details--right'>
                      {offer && offer > 0
                        ?
                          <span className='car_card_details_offer_price'>{offer} $</span>
                        :
                          ""
                      }
                      <span className="car_card_details_price" style={offer > 0 ?{textDecoration:"line-through"}:{}}>{price} $</span>
                </div>
              </div>

              <div className='car_card_buttons'>
                <button>Contacter</button>
                <button>Details{id}</button>
              </div>

      </figure>
    </div>
  )
}

export default CarCard

CarCard.propTypes = {
    id: PropTypes.number.isRequired,
    imgPath:PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    km: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    offer: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
}
