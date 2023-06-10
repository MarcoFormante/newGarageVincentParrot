import React, { useEffect, useRef, useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import DetailsInputs from './DetailsInputs'




const NewCarPage = () => {
  const equipListContainer = useRef()
  const [equipList, setEquipeList] = useState([])
  const [equipValue, setEquipValue] = useState("")
  

  useEffect(() => {
    
  },[])
  
  function handleEquipValue() {
    if (equipValue ) {
      setEquipeList(
        prev => [...prev, equipValue]
      )
      setEquipValue("")
    }
   
  }

  function deleteEquipment(index) {
    let equipements = equipList.filter(equip => equip !== equipList[index])
    setEquipeList([...equipements])
  }


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
                        <ul  className={"new_car_equip_list"} ref={equipListContainer}>
                          {equipList && equipList.map((equip, index) =>
                            <li
                              key={"equip_item" + index + "i" + Math.floor(Math.random() * 200)}>- {equip}
                              <span className={'delete_icon'} onClick={() => deleteEquipment(index)}></span>
                            </li>  
                          )}
                           </ul>
                                 {/** Add equipement array from database */}
                            <FormElement
                              label={{
                                for: "equipment",
                                text: "Equipement"
                              }}
                            select={{
                              name: "equipment",
                              id: "equipment",
                              value: equipValue,
                              onChange: (e) => setEquipValue(e.target.value)
                          }} required={true}>
            
                          {/** Add equipement array from database */}
                          {["","Essence", "Gazole", "Électrique", "GPL"].filter(equip => !equipList.includes(equip)).map((equip,index) => <option key={"option_select_" + index } value={equip}>{equip}</option>)}
                          </FormElement>
            
                        { equipValue && <div className={"new_car_add-equipement"} onClick={handleEquipValue}>
                            <span>Ajoute</span>
                        </div>}
                       
                    </div>

                  </div>
                
            </form>

    </div>
  )
}

export default NewCarPage
