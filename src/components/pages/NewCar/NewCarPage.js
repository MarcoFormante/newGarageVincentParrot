import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import DetailsInputs from './DetailsInputs'




const NewCarPage = () => {
  const equipListContainer = useRef()
  const [equipList,setEquipeList]=useState([])
  
  function createEquipementInput() {
    setEquipeList(
      prev => [...prev,
        <FormElement label={{ for: "fuel", text: "Energie" }}
          select={{
            options: ["Essence", "Gazole", "Électrique", "GPL"],
            name: "fuel", id: "fuel"
          }} required={true}
        />
  ])
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

                    <div className='new_car_details container--pad-top'>
                    <span className='new_car_details_title new_car_details_title--black'>Equipements</span>
                    <span  className={"new_car_add-equipement"} onClick={createEquipementInput}>+</span>
                        <ul ref={equipListContainer}>
                          {equipList && equipList.map((equip, index) =>
                            <li key={"equip_list" + index + "i" + Math.floor(Math.random() * 200)}>{equip} <span onClick={()=>deleteEquipment(index)}>Supprime</span></li>  
                           
                           )}
                        </ul>
                    </div>

                  </div>
                
            </form>

    </div>
  )
}

export default NewCarPage
