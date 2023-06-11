import React, { useEffect, useRef, useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import DetailsInputs from './DetailsInputs'
import EquipmentsInputs from './EquipmentsInputs'




const NewCarPage = () => {




  return (
    <div>
        <PageTitle pageTitle={"Nouveau véhicule"} />
         
            <form className='form' encType={'multipart/form-data'}>
                
                  <div className='new_car'>
                    <div className='new_car_img-thumb'>
                      <FormElement
                        label={{ for: "img-thumb", text: "Choisir la photo principal" }}
                        input={{ type: "file", required: true, accept: "image/jpeg , image/png", name: "img-thumb", id: "img-thumb" }}
                      />
                    </div>
            
                    <div className='new_car_details container--pad-top'>
                      <span className='new_car_details_title'>Détails du vehicule</span>
                      <div className='row_inputs_container' >
                        <DetailsInputs/>
                      </div>
                    </div>

                    <div className={'new_car_details container--pad-top'}>
                        <span className={'new_car_details_title new_car_details_title--black'}>Equipements</span>
                        <div className={"new_car_equip_list"} >
                         <EquipmentsInputs />
                        </div>
                        
                    </div>

                  </div>
                
            </form>

    </div>
  )
}

export default NewCarPage
