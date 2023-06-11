import React, { useEffect, useState } from 'react'
import Modal from '../../../Modal/Modal'

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
    const [modal, setModal] = useState(false)
    const [modalInput, setModalInput] = useState("")
    
    function addEquipement() {
        if (modalInput) {
            setEquipments([...equipments, modalInput]);
            setModal(false)
        }
       
    }
    
    function handleModal() {
        setModal(!modal);
    }

    useEffect(() => {
        //fetch equipments from database
        setEquipments([...equipArray])
    }, [])
    
    return (
      <>
        <div className={'row_inputs_container'}>
        {/* change with object {equipName,id}  from database*/}
          {equipments && equipments.map((equip, index) =>
              <div className='row' style={{ justifyContent: "space-between" }} key={"equip_" + index + equip}>
                    <div>
                        <input type="checkbox"
                            name={`equipments[${index}]`}
                            id={`equipments[${index}]`} />
                        <label
                            htmlFor={`equipments[${index}]`}
                            style={{marginLeft:"10px"}}
                        >
                        {equip}   
                        </label>
                        </div>
              </div>)}
        </div>
        <div className='add_new_equipement container--marg-top'>
              Ajouter un nouvel equipement
              <span className='add_icon' onClick={handleModal}></span>  
        </div> 
            {
            modal &&
                <Modal title={"Nouvel equipement"} onClick={addEquipement} onExit={()=>setModal(false)} type={"input"}>
                    <div className='modal_input_container'>
                    <label htmlFor="modal_input">Equipement</label>
                            <input type="text" id='modal_input' value={modalInput} onChange={(e) => setModalInput(e.target.value)} />
                    </div>
                </Modal>}
     </>
  )
}

export default EquipmentsInputs
