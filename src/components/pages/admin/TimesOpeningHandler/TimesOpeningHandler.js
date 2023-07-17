import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import Modal from '../../../Modal/Modal'
import toast, { Toaster } from 'react-hot-toast';



const TimesOpeningHandler = () => {
  const [timeTable, setTimeTable] = useState([])
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const [modalToggle, setModalToggle] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalInputValue, setModalInputValue] = useState("");
  const [modalInputId, setModalInputId] = useState(null);
  const [modalInputIndex, setModalInputIndex] = useState(null);
  const [modalValueColumn, setModalValueColumn] = useState("");
 
  const [isClose, setIsClose] = useState(false);
  const [InputType, setInputType] = useState("")
  const [isInContinue,setIsInContinue] = useState(false)
  
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
    
    useEffect(() => {
        const timeTablePath = process.env.REACT_APP_HTTP + "pages/admin/timeTableHandler.php"  
        axios.get(timeTablePath + "?getTime=" + true)
          .then(response => {
            setTimeTable(response.data.timeTable)
          })
    }, [])
  
  
  function handleModal(type,title, id, value,index,column,close) {
    let inptValue = value.split(":");
    if (inptValue[0].length === 1) {
      inptValue = "0" + value;
    } else {
      inptValue = value;
    }
    setModalToggle(!modalToggle)
    setModalTitle(title)
    setModalInputValue(inptValue);
    setModalInputId(id)
    setModalInputIndex(index)
    setModalValueColumn(column)
    setIsClose(!close)
    setInputType(type)
    setIsInContinue(value ==="HC")
  }


  function resetValues() {
    setModalToggle(false)
    setModalTitle("")
    setModalInputValue("")
    setModalInputId(null)
    setModalInputIndex(null)
    setModalValueColumn("")
    
    setIsClose(false)
    setInputType("input")
    setIsInContinue(false)
  }

  function saveTimeValue() {
    const timeTablePath = process.env.REACT_APP_HTTP + "pages/admin/timeTableHandler.php"
    const formData = new FormData(); 
    formData.append("id", modalInputId);
    formData.append("column", modalValueColumn);
    formData.append("value",isInContinue ? "HC" : modalInputValue);
    if (isClose) {
      formData.append("close",0)
    } else {
      formData.append("close",1)
    }

    if (modalInputValue) {
      console.log(modalInputValue);

      axios.post(timeTablePath, formData, {

        headers: {
          "Content-Type": "application/www-x-urlencodeform"
        }
      })
        .then(response => {
          console.log(response.data);
          if (response.data.status === 1) {

            setLocalTimeValues();
            setTimeTable([...timeTable]);
           
            notifySuccess("Modifié avec succès");
          } else {
           
            notifyError("Un erreur est survenu, rententez.")
          }
        }
        ).finally(
          resetValues()
        )
    } else {
      notifyError("Un erreur est survenu, rententez.")
     
      resetValues();
    }
  }


  function setLocalTimeValues() {
    if (!isClose) {
      timeTable[modalInputIndex].close = 1;
    } else {
      timeTable[modalInputIndex].close = 0;
    }
      switch (modalValueColumn) {
        case "day_start_am":
          timeTable[modalInputIndex].day_start_am =  modalInputValue;
          break;
        
          case "day_end_am":
          timeTable[modalInputIndex].day_end_am = isInContinue ? "HC" : modalInputValue;
        
          break;
        
          case "day_start_pm":
          timeTable[modalInputIndex].day_start_pm = isInContinue ? "HC" : modalInputValue;
         
          break;
        
          case "day_end_pm":
            timeTable[modalInputIndex].day_end_pm =  modalInputValue;
            break;
      
        default:
          break;
      }
  }

  const styleSheet = {
    td_red: {
      color: "red",
      fontWeight:600
    },
    td_big:{
      fontWeight:600
    }
  }
 
  


  return (
    <div>
      <Toaster/>
      {modalToggle && <Modal type={"input"} title={modalTitle}
        buttonText={"Sauvegarder"}
        onExit={() => setModalToggle(!modalToggle)}
        onClick={() => saveTimeValue()}
      >
        <div className='container--center--column'>
          {
            InputType === "input"
              ?
              (
                <>
                  <div hidden={isInContinue} style={isInContinue ? {display:"none"} : {}}  className='container--center--column'>
                    <label htmlFor="time" style={{fontSize:18}}>Time</label>
                    <input  type="time" id="time" value={modalInputValue} onChange={(e) => {
                    setModalInputValue(e.target.value)
                    }}
                    />
                  </div>
                  {(modalValueColumn === "day_end_am" || modalValueColumn === "day_start_pm")
                    &&
                    <div className='container--center--column '>
                      <label htmlFor="close" style={{fontSize:18}}>En Continue</label>
                      <input type="checkbox" id="close" checked={modalInputValue === "HC" ? isInContinue :  isInContinue} onChange={() => setIsInContinue(!isInContinue)} />
                    </div>
                    }
                </>
              )
              :
              <>
                <label htmlFor="close" style={{fontSize:18}}>Fermé</label>
                <input type="checkbox"  id="close" checked={isClose} onChange={()=>setIsClose(!isClose)} />
              </>
          }
        </div>
        
      </Modal>}
      <PageTitle pageTitle={"Gestion des horaires d'ouverture"} />
      <div className='container--pad-top mar-auto '>* HC : Horaire en continue</div>
      
      <div className='container--pad-top table_handler' style={{overflowY:"hidden"}}>
        <table className='table_handler_container'>
          <thead >
            <tr >
              <th>Jour</th>
              <th>Ouverture matin</th>
              <th>Fermeture matin</th>
              <th>Ouverture aprem</th>
              <th>Fermeture aprem</th>
              <th>Fermé / Ouvert</th>
            </tr>
          </thead>

          <tbody>
            {timeTable && timeTable.map((t, index) =>
            
              <tr key={"time_table_" + index * t.id }>

                <td style={!parseInt(t.close) ? {...styleSheet.td_red,border:"1px solid black",cursor:"default"}: {border:"1px solid black",cursor:"default"}}> {days[t.id]} </td>

                <td style={!parseInt(t.close) ? styleSheet.td_red : {}}
                  onClick={() => handleModal("input", days[t.id] + " / Ouverture matin", t.id, t.day_start_am, index, "day_start_am", parseInt(t.close))}
                >
                  {t.day_start_am }                 
                </td>

                <td style={!parseInt(t.close) ? styleSheet.td_red : t.day_end_am === "HC" ? styleSheet.td_big : {}}
                  onClick={() => handleModal("input", days[t.id] + " / Fermeture matin", t.id, t.day_end_am, index, "day_end_am", parseInt(t.close))}
                >
                  { t.day_end_am } 
                </td>

                <td style={!parseInt(t.close) ? styleSheet.td_red : t.day_start_pm === "HC" ? styleSheet.td_big : {}}
                  onClick={() => handleModal("input", days[t.id] + " / Ouverture Aprem", t.id, t.day_start_pm, index, "day_start_pm",parseInt(t.close))}
                >
                  { t.day_start_pm }
                </td>

                <td style={!parseInt(t.close) ? styleSheet.td_red : {}}
                  onClick={() => handleModal("input",days[t.id] + " / Ouverture Aprem", t.id, t.day_end_pm, index, "day_end_pm", parseInt(t.close))}
                >
                  { t.day_end_pm }
                </td>

                <td style={!parseInt(t.close) ? styleSheet.td_red : { color: "green" }}
                  onClick={() => handleModal("checkbox",days[t.id] + " / Ouverture Aprem", t.id, t.day_end_pm, index, "day_end_pm", parseInt(t.close))}
                >
                  {!parseInt(t.close) ? "Fermé" : "Ouvert"}
                </td>

              </tr>
            )}
          </tbody>
        </table>
       
      </div>
          
    </div>
  )
}

export default TimesOpeningHandler
