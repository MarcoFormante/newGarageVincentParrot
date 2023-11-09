import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import Modal from '../../../Modal/Modal'
import toast, { Toaster } from 'react-hot-toast';
import CarHandlerGallery from './CarHandlerGallery';


const CarHandlerDetails = ({ carIndex, carProps, setCarProps, setDataToUpdate,setIsDetailUpdate}) => {
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
        if (carProps) {
            axios.get(`equipment/id/${carProps.id}`, {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                  }
            })
                .then(response => {
                    if (response.data?.status === 1) {
                        
                        const {
                            gearbox,
                            din_power,
                            fiscal_power,
                            color,
                            doors,
                            seats,
                            energy
                        } = carProps;
                        
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
                    if (response?.data?.equipments) {
                        setCarEquipements([...response.data.equipments])
                    } else {
                        setCarEquipements([])
                    }
                      
                        setIsDetailUpdate(false)
                    } else {
                        setCarProps(null)
                    }
            })
        }
        
    }, [carProps,setCarProps,setIsDetailUpdate])
    

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


   

    function deleteEquipment(carID, equipID) {
      
        axios.delete(`equipment/delete/${carID}/${equipID}`, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
              }
        })
            .then(response => {
                if (response?.data?.status === 1) {
                    setCarEquipements([...carEquipments.filter(equip => +equip.equip_id !== +equipID)])
                    notifySuccess(response?.data?.message)
                } else if(response?.data?.status === 0) {
                    notifyError(response?.data?.message)
                } else {
                    notifyError("Erreur: Un probleme est survenu, impossible de supprimer l'equipment")
                }
               
        })
    }

    useEffect(() => {
            const equipmentsPath = "equipment/all"
        axios.get(equipmentsPath, {
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
              }
            })
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
                const path = `equipment/add/${carID}/${equipID}`;
                axios.post(path, {
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem("token")
                      }
                })
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
        <div className={`carHandler_details ${carProps?.id ? "carHandler_details--active" : ""}`}>
            <div className='carHandler_details_inner'>
            <Toaster/>
            {modalToggle &&
                <Modal type={"input"}
                    title={"Nouveau equipement pour la voiture ID : " + carProps.id}
                    onClick={() => newEquipment !== null &&  addEquipment(+carProps.id,parseInt(newEquipment.split(',')[0]))}
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
            <div className='exitBtn' style={{top:80}} onClick={() => setCarProps(null)}></div>
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
                                        onClick={() => setDataToUpdate({ index: carIndex, table: "cars", id: +carProps.id, column: [detailsColumn[index], detailsTitles[index]], value: carDetails[index] , type: [0,6].some(i => i === index) ? "select" : index === 3 ? "text" :  "number" })}
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
                                           onClick={() => { deleteEquipment(+carProps.id,+equipement.equip_id) }}
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
            <CarHandlerGallery carID={carProps?.id} />
    </div>
  )
}

export default CarHandlerDetails
