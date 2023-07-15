import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import Modal from '../../../Modal/Modal'
import toast, { Toaster } from 'react-hot-toast';

import CarHandlerGallery from './CarHandlerGallery';

const CarHandlerDetails = ({ carID, setCarID, setDataToUpdate, dataToUpdate,setNewCarDetailsArray, newCarDetailsArray ,isDetailUpdate, setIsDetailUpdate}) => {
    const [carDetails, setCarDetails] = useState([])
    const [carEquipments, setCarEquipements] = useState([])
    const [activeDetail, setActiveDetail] = useState(false)
    const [modalToggle, setModalToggle] = useState(false)
    const [allEquipments, setAllEquipments] = useState([])
    const [newEquipment,setNewEquipment] = useState(null)
    
    const detailsTitles = ["Boîte de vitesse", "Puissance DIN", "Puissance fiscale", "Couleur", "Portières", "Sièges", "Énergie"]
    const detailsColumn = ['gearbox', "din_power", "fiscal_power", "color", "doors", "seats", "energy"]

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);
 
 
    
    useEffect(() => {
        if (carID) {
            const detailsPath = "/pages/carDetails.php?details=true&id=" + carID
            axios.get(detailsPath)
                .then(response => {
                        const {
                            gearbox,
                            din_power,
                            fiscal_power,
                            color,
                            doors,
                            seats,
                            energy
                        } = response.data.details;
                        
                        const detailsArray = [
                            gearbox,
                            din_power ,
                            fiscal_power,
                            color,
                            doors,
                            seats,
                            energy
                        ];
                        
                        setCarDetails([...detailsArray])
                        setCarEquipements([...response.data.equipements])
                        setIsDetailUpdate(false)
                
            })
        }
        
    }, [carID])
    

    const handleActiveDetailBlock = (clicked_element) => {
        switch (clicked_element) {
           case "first":
                if (activeDetail === false) {
                   setActiveDetail(true) 
                } else {
                    
                    setActiveDetail(false)
               }
                break;
            
                 case "second":
                   if (activeDetail === true) {
                       setActiveDetail(false) 
                    } else {
                        setActiveDetail(true)
                   }
                    break;
        
           default:
               break;
        }
    }


    useEffect(() => {
       if (dataToUpdate?.table === "car_details") {
        let newDetailArray = []
        carDetails.forEach((detail,i) => {
            if (carDetails[dataToUpdate.index] !== detail) {
                newDetailArray.push(carDetails[i])
          
            } else {
                newDetailArray.push(dataToUpdate.value)
            }
                setNewCarDetailsArray([...newDetailArray])
        });
        }
        if (isDetailUpdate) {
            setCarDetails([...newCarDetailsArray])
        } 
    }, [dataToUpdate,carDetails,isDetailUpdate,newCarDetailsArray,setNewCarDetailsArray])
    

    function deleteEquipment(carID, equipID) {
        const equipmentPath = `/pages/admin/carHandler.php?car_id=${carID}&equip_id=${equipID}`
        axios.delete(equipmentPath)
            .then(response => {
                if (response.data.status === 1) {
                    setCarEquipements([...carEquipments.filter(equip => +equip.equip_id !== +equipID)])
                    notifySuccess(response.data.message)
                } else if(response.data.status === 0) {
                    notifyError(response.data.message)
                } else {
                    notifyError("Erreur: Un probleme est survenu, impossible de supprimer l'equipment")
                }
               
        })
    }

    useEffect(() => {
            const equipmentsPath = "pages/admin/carHandler.php?getAllEquipments=true"
            axios.get(equipmentsPath)
                .then(response => {
                if (response.data.status === 1) {
                       setAllEquipments([...response.data.equipments])
                    } else if (response.data.status === 0) {
                        notifyError("Erreur: Un probleme est survenu, impossible recuperer la liste des equipements")
                } 
            })
        
    }, [])




    function addEquipment(carID, equipID) {
       
        if (newEquipment) {
            if (carEquipments.some(e => +e.equip_id === parseInt(equipID))) {
                notifyError("Cet equipement existe deja")
            } else {
                const path = "pages/admin/carHandler.php?car_id=" + carID + "&equip_id=" + equipID
                axios.get(path)
                    .then(response => {
                        if (response.data.status === 1) {
                            carEquipments.push({ equip_id: parseInt(newEquipment.split(",")[0]), equipment: newEquipment.split(",")[1] })
                            setCarEquipements([...carEquipments])
                            setNewEquipment(null)
                            setModalToggle(false)
                            notifySuccess(response.data.message)
                        } else if (response.data.status === 0) {
                            notifyError(response.data.message)
                        } else {
                            notifyError("Erreur: un probleme est survenu, impossible de ajouter l'equipment")
                        }
                      
                    })
            }  
        }
    }


    

    return (
        <div className={`carHandler_details ${carID ? "carHandler_details--active" : ""}`}>
            <div className='carHandler_details_inner'>
            <Toaster/>
            {modalToggle &&
                <Modal type={"input"}
                    title={"Nouveau equipement pour la voiture ID : " + carID}
                    onClick={() => newEquipment !== null &&  addEquipment(+carID,parseInt(newEquipment.split(',')[0]))}
                    onExit={()=>setModalToggle(false)}
                >
                    <select className="modal_input" name="newEquip" id="newEquip_carHandler"
                        onChange={(e) => setNewEquipment(e.target.value)}>
                        <option value=""></option>
                        {
                            allEquipments &&
                            allEquipments.map((equip,i) =>
                                <option key={"equip_" + i} value={[+equip.id,equip.equipment]}>{equip.equipment}</option>)
                        }
                    </select>
                </Modal>
            }
            <div className='exitBtn' onClick={() => setCarID(null)}></div>
            <PageTitle pageTitle={"Details Voiture"}/>
            {/* Car Details */}
            
        <div>
            <div className={'container--center--row container--center--row--flex-end container--pad-top'}>
                    {carDetails &&
                    <div
                        className={'details_first_container details_container'}
                        style={activeDetail === true ? { border: "1px solid", backgroundColor: "#D64E54" } : { opacity: "0.3" }}
                        onClick={() => handleActiveDetailBlock("first")}
                    >
                    <span className={'details_title_header'}>Détails du vehicule</span>
                </div>}

                    {carEquipments &&
                    <div
                        className={'details_second_container details_container'}
                        style={activeDetail === false  ? { border: "1px solid", backgroundColor: "#D64E54" } : { opacity: "0.3" }}
                        onClick={() => handleActiveDetailBlock("second")}
                    >
                        <span className={'details_title_header'}>Equipements</span>
                    </div>
                    }
            </div>

            <div className={'detail_first_inner'}>
               
                    {
                        
                    activeDetail === true
                            ?
                            <ul className={"detail_first_inner_list"}>
                                {carDetails && detailsTitles.map((detail, index) =>
                                    <li style={{ cursor: "pointer" }}
                                        onClick={() => setDataToUpdate({ index, table: "car_details", id: +carID, column: [detailsColumn[index], detailsTitles[index]], value: carDetails[index] , type: [0,6].some(i => i === index) ? "select" : index === 3 ? "text" :  "number" })}
                                        key={"detail_" + index}><span className='detail_title'>{detail}</span>
                                        <span> {carDetails[index]}</span>
                                    </li>
                                )}
                                </ul>
                            :
                            <>
                                <ul className={"detail_first_inner_list"}>
                               { carEquipments && carEquipments.map((equipement, index) =>
                                    <li key={"equipement_" + index}>
                                        <span className='detail_title--black'>
                                           {equipement.equipment}
                                          
                                       </span>
                                       <span className='delete-icon'
                                           onClick={() => { deleteEquipment(+carID,+equipement.equip_id) }}
                                       >
                                           
                                       </span>
                                    </li>  
                                )}
                            </ul>
                            <div className='add_new_equipement mar-bot-50'>
                                    <span style={{ fontWeight: "600" }}>
                                        Ajouter un nouvel equipement
                                    </span> 
                                <span className='add_icon' onClick={()=>{ setModalToggle(true)}}></span>  
                            </div> 
                        </> 
                    }
                   
                </div>
            </div>
        </div>
            <CarHandlerGallery carID={carID} />
    </div>
  )
}

export default CarHandlerDetails
