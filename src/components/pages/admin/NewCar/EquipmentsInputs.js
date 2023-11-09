import React, { useEffect, useState } from 'react'
import Modal from '../../../Modal/Modal'
import axios from '../../../../api/axios';
import toast from 'react-hot-toast';




const EquipmentsInputs = ({formValues,setFormValues,formIsValid}) => {
    const [equipments, setEquipments] = useState([])
    const [modal, setModal] = useState(false)
    const [modalInput, setModalInput] = useState("")
    const [equipValues, setEquipValues] = useState([])

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);
    
    
    function addEquipement() {
        if (modalInput) {
            const formData = new FormData()
            formData.append("newEquipment",modalInput)
            axios.post(`equipment/new/${modalInput}`, {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                  }
            }).then(response => {
                
                if (response.data.status === 1) {
                    setEquipments([...equipments,{id: response.data.equipId, equipment: modalInput }])
                    notifySuccess(response.data.message)
                    handleModal()
                    setModalInput("")
                } else {
                    if (response.data.message.match(/Duplicate entry/)) {
                        notifyError("Erreur: Cet équipement existe déjà")
                    } else {
                        notifyError("Erreur: Un problème est survenu, rententez")
                    }
                   

                }
            })
        }
        return () => {}
    }


    function handleModal() {
        setModal(!modal);
    }



    useEffect(() => {
        const carHandlerPage ="equipment/all"
        axios.get(carHandlerPage, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
              }
        })
            .then(response => {
                if (response.data.status === 1) {
                    const data = response.data.equipments
                    setEquipments([...data])
            }
        })
        return () => {}
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
