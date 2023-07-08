import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'

const CarHandlerDetails = ({ carID, setCarID, setDataToUpdate, dataToUpdate}) => {
    const [carDetails, setCarDetails] = useState([])
    const [carEquipments, setCarEquipements] = useState([])
    const [activeDetail, setActiveDetail] = useState(false)
    
    const detailsTitles = ["Boîte de vitesses", "Puissance DIN", "Puissance fiscale", "Couleur", "Portières", "Sièges", "Énergie"]
    const detailsColumn = ['gearbox', "din_power", "fiscal_power", "color", "doors", "seats", "energy"]
    
    console.log(dataToUpdate);
    
    useEffect(() => {
        if (carID) {
            const detailsPath = "/pages/carDetails.php?details=true&id=" + carID
            axios.get(detailsPath)
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {

                        const {
                            gearbox,
                            din_power,
                            fiscal_power,
                            color,
                            doors,
                            seats,
                            energy
                        } = response?.data[0];
                        
                        const detailsArray = [
                            gearbox,
                            din_power + "cv",
                            fiscal_power + "ch",
                            color,
                            doors,
                            seats,
                            energy
                        ];
                        
                        setCarDetails([...detailsArray])
                        setCarEquipements([...response?.data[1]])
                    } else {
                        console.error("Erreur:Impossible de recuperer les données(details voiture)");
                    }
                
            })
        }
        
    },[carID])

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
    


    return (
    <div className={`carHandler_details ${carID  ? "carHandler_details--active" : ""}`}>
            <div className='carHandler_details_exitBtn' onClick={() => setCarID()} />
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
                <ul className={"detail_first_inner_list"}>
                    {
                    activeDetail === true
                        ?
                                carDetails && detailsTitles.map((detail, index) => <li style={{ cursor: "pointer" }}
                                    onClick={() => setDataToUpdate({ index, table: "car_details", id: carID, column: [detailsColumn[index], detailsTitles[index]], value: carDetails[index] , type: [0,6].some(i => i === index) ? "select" : index === 3 ? "text" :  "number" })}
                                    key={"detail_" + index}><span className='detail_title'>{detail}</span>
                                    <span> {carDetails[index]}</span>
                                </li>
                                )
                        :
                                carEquipments && carEquipments.map((equipement, index) =>
                                    <li key={"equipement_" + index}>
                                        <span className='detail_title--black'>
                                            {equipement}
                                        </span>
                                    </li>)
                        
                    }
                    </ul>
                </div>
        </div>
    </div>
  )
}

export default CarHandlerDetails
