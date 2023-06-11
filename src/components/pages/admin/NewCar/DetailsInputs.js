import React from 'react'
import FormElement from '../../../FormElement/FormElement'

const DetailsInputs = () => {
  return (
    <>
        <FormElement label={{ for: "make", text: "Marque" }} input={{ type: "text",name:"make",id:"make",}} required={true} />
        <FormElement label={{ for: "model", text: "Modèl" }} input={{ type: "text",name:"model",id:"model",}} required={true} />
        <FormElement label={{ for: "price", text: "Prix" }} input={{ type: "number",name:"price",id:"price",}} required={true} />
        <FormElement label={{ for: "year", text: "Année" }} input={{ type: "number",name:"year",id:"year",}} required={true} />
        <FormElement label={{ for: "km", text: "Kilometrage" }} input={{ type: "number",name:"km",id:"km",}} required={true} />
        <FormElement label={{ for: "seats", text: "Sièges" }} input={{ type: "number",name:"seats",id:"seats",}} required={true} />
        <FormElement label={{ for: "color", text: "Couleur" }} input={{ type: "text",name:"color",id:"color",}} required={true} />
        <FormElement label={{ for: "dni", text: "Puissance DIN" }} input={{ type: "number",name:"dni",id:"dni",}} required={true} />
        <FormElement label={{ for: "fiscalPower", text: "Puissance fiscale" }} input={{ type: "number",name:"fiscalPower",id:"fiscalPower",}} required={true} />
        <FormElement label={{ for: "gearbox", text: "Boite de vitesse" }} select={{ name: "gearbox", id: "gearbox" }} required={true}>
          <option value=""></option>
          <option value="Manuelle">Manuelle</option>
          <option value="Automatique">Automatique</option>
        </FormElement>
        <FormElement label={{ for: "fuel", text: "Energie" }} select={{name: "fuel", id: "fuel" }} required={true}>
          <option value=""></option>
          <option value="Essence">Essence</option>
          <option value="Gazole">Gazole</option>
          <option value="Électrique">Électrique</option>
          <option value="GPL">GPL</option>
        </FormElement>
        <FormElement label={{ for: "doors", text: "Portières" }} input={{ type: "number",name:"doors",id:"doors",}} required={true} />
        <FormElement label={{ for: "VO", text: "Numero VO" }} input={{ type: "number",name:"VO",id:"VO",}} required={true} />
        <FormElement label={{ for: "offer", text: "Offre?" }} input={{ type: "number",name:"offer",id:"offer"}} required={true} />
    </>
  )
}

export default DetailsInputs
