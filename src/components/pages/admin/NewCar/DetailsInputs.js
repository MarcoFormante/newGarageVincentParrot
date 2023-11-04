import React, { useEffect, useState } from 'react'
import FormElement from '../../../FormElement/FormElement'

const DetailsInputs = ({ formValues ,setFormValues,formIsValid }) => {

  const [detailValues, setDetailValues] = useState(
    {
      make: "",
      model: "",
      price: "",
      year: "",
      km: "",
      seats: "",
      color: "",
      dni: "",
      fiscalPower: "",
      gearbox: "",
      fuel: "",
      doors: "",
      VO: "",
      offer: "0"
    })

  
  useEffect(() => {
    setFormValues({...formValues,detailValues:{...detailValues}})
  }, [detailValues])
  
  useEffect(() => {
      if (formIsValid) {
        setDetailValues({
          make: "",
          model: "",
          price: "",
          year: "",
          km: "",
          seats: "",
          color: "",
          dni: "",
          fiscalPower: "",
          gearbox: "",
          fuel: "",
          doors: "",
          VO: "",
          offer: "0"
        })
    }
    document.querySelectorAll("select").forEach(inpt => inpt.value = "")
    
  },[formIsValid])

  return (
      <>
        <FormElement label={{ for: "make", text: "Marque" }} input={{ type: "text", name: "make", id: "make",  onChange: (e) => setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.make} required={true} />
        <FormElement label={{ for: "model", text: "Modèl" }} input={{ type: "text",name:"model",id:"model",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.model} required={true} />
        <FormElement label={{ for: "price", text: "Prix" }} input={{ type: "number",name:"price",id:"price", onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.price} required={true} />
        <FormElement label={{ for: "year", text: "Année" }} input={{ type: "number",name:"year",id:"year", onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.year} required={true} />
        <FormElement label={{ for: "km", text: "Kilometrage" }} input={{ type: "number",name:"km",id:"km", onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.km} required={true} />
        <FormElement label={{ for: "seats", text: "Sièges" }} input={{ type: "number",name:"seats",id:"seats", onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.seats}  required={true} />
        <FormElement label={{ for: "color", text: "Couleur" }} input={{ type: "text",name:"color",id:"color",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.color} required={true} />
        <FormElement label={{ for: "dni", text: "Puissance DIN" }} input={{ type: "number",name:"dni",id:"dni", onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.dni} required={true} />
        <FormElement label={{ for: "fiscalPower", text: "Puissance fiscale" }} input={{ type: "number",name:"fiscalPower",id:"fiscalPower",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.fiscalPower} required={true} />
        <FormElement label={{ for: "gearbox", text: "Boite de vitesse" }} select={{ name: "gearbox", id: "gearbox",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value}) }} required={true}>
          <option value=""></option>
          <option value="Manuelle">Manuelle</option>
          <option value="Automatique">Automatique</option>
        </FormElement>
        <FormElement label={{ for: "fuel", text: "Energie" }} select={{name: "fuel", id: "fuel",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value})}} value={detailValues.fuel}  required={true}>
          <option value=""></option>
          <option value="Essence">Essence</option>
          <option value="Gazole">Gazole</option>
          <option value="Électrique">Électrique</option>
          <option value="GPL">GPL</option>
        </FormElement>
        <FormElement label={{ for: "doors", text: "Portières" }} input={{ type: "number",name:"doors",id:"doors",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value}) }} value={detailValues.doors}  required={true} />
      <FormElement label={{ for: "VO", text: "Numero VO" }} input={{ type: "number", name: "VO", id: "VO" ,onChange:(e) =>  setDetailValues({ ...detailValues, [e.target.name]: e.target.value})}} value={detailValues.VO.length > 9 ? detailValues.VO.slice(0,9): detailValues.VO} required={true} />
        <FormElement label={{ for: "offer", text: "Offre?" }} input={{ type: "number",name:"offer",id:"offer",onChange:(e)=>setDetailValues({...detailValues,[e.target.name]:e.target.value}) }} value={detailValues.offer} required={true} />
    </>
  )
}

export default DetailsInputs
