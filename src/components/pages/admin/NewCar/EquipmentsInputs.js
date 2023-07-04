import React, { useEffect, useState } from 'react'
import Modal from '../../../Modal/Modal'
import axios from '../../../../api/axios';
import toast, { Toaster } from 'react-hot-toast';


// const equipArray=[
// "Vitres arrière surteintées",
// "Caméra de recul",
// "Pack B&O",
// "Haut parleurs",
// "ABS",
// "Accoudoir central AV",
// "AFIL",
// "Aide au démarrage en côte",
// "Airbag conducteur",
// "Airbag passager",
// "Airbags latéraux AV et AR",
// "Airbags rideaux AV et AR",
// "Antidémarrage électronique",
// "Appui-tête conducteur réglable hauteur",
// "Appui-tête passager réglable en hauteur",
// "Bacs de portes avant",
// "Banquette 60/40",
// "Banquette AR rabattable",
// "Boite à gants fermée",
// "Borne Wi-Fi",
// "Boucliers AV et AR couleur caisse",
// "Capteur de luminosité",
// "Capteur de pluie",
// "Clim automatique bi-zones",
// "Commande du comportement dynamique",
// "Commandes vocales",
// "Vitres avant électriques",
// "Volant cuir",
// "Volant multifonction",
// "Volant sport"
// ]

const EquipmentsInputs = ({formValues,setFormValues,formIsValid}) => {
    const [equipments, setEquipments] = useState([])
    const [modal, setModal] = useState(false)
    const [modalInput, setModalInput] = useState("")
    const [equipValues, setEquipValues] = useState([])

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);
    
    
    function addEquipement() {
        if (modalInput) {
            const carHandlerPage = "pages/admin/carHandler.php"
            const formData = new FormData()
            formData.append("newEquipment",modalInput)
            axios.post(carHandlerPage, formData, {
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(response => {
                
                if (response.data.status === 1) {
                    setEquipments([...equipments,{id: response.data.equipId, equipment: modalInput }])
                    notifySuccess(response.data.message)
                    handleModal()
                    setModalInput("")
                } else {
                    if (response.data.includes("Duplicate entry")) {
                        notifyError("Erreur: Cet équipement existe déjà")
                    } else {
                        notifyError("Erreur: Un problème est survenu, rententez")
                    }
                   

                }
            })
        }
       
    }


    function handleModal() {
        setModal(!modal);
    }



    useEffect(() => {
        const carHandlerPage ="pages/admin/carHandler.php?getAllEquipments=true"
        axios.get(carHandlerPage)
            .then(response => {
                if (response.data.status === 1) {
                    const data = response.data.equipments
                    setEquipments([...data])
            }
        })
      
    }, [])



    function handleValue(isChecked, id,value) {
        if (isChecked === true) {
            setEquipValues(prev => [...prev, id])
        } else {
            setEquipValues(prev => [...prev.filter((eqID, i) => id !== eqID)]) 
        }
    }

 

    useEffect(() => {
        setFormValues({...formValues,equipmentValues:[...equipValues]})
    }, [equipValues])

    
    useEffect(() => {
        if (formIsValid) {
            setEquipValues([])
            document.querySelectorAll('input[type=checkbox]').forEach(inpt => inpt.checked = false)
        }
      },[formIsValid])
     

    
    return (
      <>
        <div className={'row_inputs_container'}>
       
          {equipments && equipments.map((equip, index) =>
              <div className='row' style={{ justifyContent: "space-between" }} key={"equip_" + index + equip}>
                    <div>
                      <input type="checkbox"
                           
                            name={`equipments[${index}]`}
                            id={`equipments[${equip.id}]`}
                            onChange={(e)=> handleValue(e.target.checked,equip.id,equip.equipment)}
                      />
                         
                        <label
                            htmlFor={`equipments[${index}]`}
                            style={{marginLeft:"10px"}}
                        >
                        {equip.equipment}   
                        </label>
                        </div>
              </div>)}
        </div>
        <div className='add_new_equipement container--marg-top'>
                <span style={{fontWeight:"600"}}>Ajouter un nouvel equipement</span> 
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
