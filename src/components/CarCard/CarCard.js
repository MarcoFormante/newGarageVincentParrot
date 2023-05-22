import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ButtonCta from '../Buttons/ButtonCta'

const CarCard = ({ id, imgPath, model, km, year, offer, price }) => {
    
  return (
    
      <figure className='car_card'>
            <img src={imgPath} alt={model}/>
              <figcaption className="car_card_model">{model}</figcaption>
              <div className='car_card_details'>
                  {/*card_details_left*/}
                <div className='car_card_details--left'>
                    <span className='car_card_details--left_km'>{km}km</span>
                    <span className='car_card_details--left_year'>Année:{year}</span>
                </div>
                   {/*card_details_right (price)*/}
                  <div className='car_card_details--right'>
                      {offer && offer > 0
                        ?
                          <span className='car_card_details_offer_price'>{price - offer} $</span>
                        :
                          ""
                      }
                      <span className="car_card_details_price" style={offer > 0 ?{textDecoration:"line-through"}:{}}>{price} $</span>
                </div>
              </div>

              <div className='car_card_buttons'>
                  <ButtonCta className="car_card_cta" inner="Contacter" type="button"/>
                  <ButtonCta className="car_card_cta"  inner="Details" type="link" style={{color:"black"}}  to={"parc-auto/details/"+ id} />
              </div>

      </figure>
    
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
