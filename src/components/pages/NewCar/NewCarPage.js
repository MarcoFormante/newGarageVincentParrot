import React from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'

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
                        <FormElement label={{ for: "make", text: "Marque" }} input={{ type: "text",name:"make",id:"make",required:true }} />
                        <FormElement label={{ for: "model", text: "Modèl" }} input={{ type: "text",name:"model",id:"model",required:true }} />
                        <FormElement label={{ for: "price", text: "Prix" }} input={{ type: "number",name:"price",id:"price",required:true }} />
                        <FormElement label={{ for: "year", text: "Année" }} input={{ type: "number",name:"year",id:"year",required:true }} />
                        <FormElement label={{ for: "km", text: "Kilometrage" }} input={{ type: "number",name:"km",id:"km",required:true }} />
                        <FormElement label={{ for: "seats", text: "Sièges" }} input={{ type: "number",name:"seats",id:"seats",required:true }} />
                        <FormElement label={{ for: "color", text: "Couleur" }} input={{ type: "text",name:"color",id:"color",required:true }} />
                        <FormElement label={{ for: "dni", text: "Puissance DIN" }} input={{ type: "number",name:"dni",id:"dni",required:true }} />
                        <FormElement label={{ for: "gearbox", text: "Boite de vitesse" }} input={{ type: "text",name:"color",id:"color",required:true }} />
                      </div>
                    </div>
                  </div>
                
            </form>
         
    </div>
  )
}

export default NewCarPage
