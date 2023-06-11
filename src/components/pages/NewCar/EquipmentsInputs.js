import React, { useEffect, useState } from 'react'

const equipArray=[
"Vitres arrière surteintées",
"Caméra de recul",
"Pack B&O",
"Haut parleurs",
"ABS",
"Accoudoir central AV",
"AFIL",
"Aide au démarrage en côte",
"Airbag conducteur",
"Airbag passager",
"Airbags latéraux AV et AR",
"Airbags rideaux AV et AR",
"Antidémarrage électronique",
"Appui-tête conducteur réglable hauteur",
"Appui-tête passager réglable en hauteur",
"Bacs de portes avant",
"Banquette 60/40",
"Banquette AR rabattable",
"Boite à gants fermée",
"Borne Wi-Fi",
"Boucliers AV et AR couleur caisse",
"Capteur de luminosité",
"Capteur de pluie",
"Clim automatique bi-zones",
"Commande du comportement dynamique",
"Commandes vocales",
"Vitres avant électriques",
"Volant cuir",
"Volant multifonction",
"Volant sport"
]

const EquipmentsInputs = () => {
    const [equipments, setEquipments] = useState([])
    
    useEffect(() => {
        //fetch equipments from database
        setEquipments([...equipArray])
    }, [])
    
    return (
      <>
        <div className={'row_inputs_container'}>
        {/* change with object {equipName,id}  from database*/}
          {equipments && equipments.map((equip, index) =>
              <div className='row'>
                  <input type="checkbox"
                      name={`equipments[${index}]`}
                      id={`equipments[${index}]`} />
                  <label
                      htmlFor={`equipments[${index}]`}>{equip}
                  </label>
              </div>)}
        </div>
        <div className='container--marg-top'>
              Ajouter un nouvel equipement
              <span className='add_icon'></span>  
        </div> 
     </>
  )
}

export default EquipmentsInputs
