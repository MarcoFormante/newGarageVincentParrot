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
  const [isValid, setIsValid] = useState(null)
  const [isClose, setIsClose] = useState(false);
  const [InputType, setInputType] = useState("")
  const [isInContinue,setIsInContinue] = useState(false)
  
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
    
    useEffect(() => {
        const timeTablePath = process.env.REACT_APP_HTTP + "pages/admin/timeTableHandler.php"  
        axios.get(timeTablePath + "?getTime=" + true)
          .then(response => {
            console.log(response.data);
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
    setIsInContinue(value ==="NC")
  }


  function resetValues() {
    setModalToggle(false)
    setModalTitle("")
    setModalInputValue("")
    setModalInputId(null)
    setModalInputIndex(null)
    setModalValueColumn("")
    setIsValid(null)
    setIsClose(false)
    setInputType("input")
    setIsInContinue(false)
  }

  function saveTimeValue() {
    const timeTablePath = process.env.REACT_APP_HTTP + "pages/admin/timeTableHandler.php"
    const formData = new FormData(); 
    formData.append("id", modalInputId);
    formData.append("column", modalValueColumn);
    formData.append("value",isInContinue ? "NC" : modalInputValue);
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
            setIsValid(true);
            notifySuccess("Modifié avec succès");
          } else {
            setIsValid(false);
            notifyError("Un erreur est survenu, rententez.")
          }
        }
        ).finally(
          resetValues()
        )
    } else {
      notifyError("Un erreur est survenu, rententez.")
      setIsValid(false);
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
          timeTable[modalInputIndex].day_end_am = isInContinue ? "NC" : modalInputValue;
        
          break;
        
          case "day_start_pm":
          timeTable[modalInputIndex].day_start_pm = isInContinue ? "NC" : modalInputValue;
         
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
 
  

  console.log("value",modalInputValue);
  console.log("close",isClose);
  return (
    <div>
      <Toaster/>
      {modalToggle && <Modal type={"input"} title={modalTitle} buttonText={"Sauvegarder"} onExit={() => setModalToggle(!modalToggle)} onClick={()=>saveTimeValue()}>
        <div className='container--center--column'>
          {
            InputType === "input"
              ?
              (
                <>
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" value={modalInputValue} onChange={(e) => {
                  setModalInputValue(e.target.value)
                  }}
                  />
                  {(modalValueColumn === "day_end_am" || modalValueColumn === "day_start_pm")
                    &&
                    <div>
                      <label htmlFor="close">En Continue</label>
                      <input type="checkbox" id="close" checked={modalInputValue === "NC" ? isInContinue :  isInContinue} onChange={() => setIsInContinue(!isInContinue)} />
                    </div>
                    }
                </>
              )
              :
              <>
                <label htmlFor="close">Fermé </label>
                <input type="checkbox"  id="close" checked={isClose} onChange={()=>setIsClose(!isClose)} />
              </>
          }
        </div>
        
      </Modal>}
      <PageTitle pageTitle={"Gestion des horaires d'ouverture"} />
      <div className='container--pad-top table_timeTableHandler'>
        <table className='table_timeTableHandler_container'>
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
            
              <tr key={"time_table_" + index + Math.random()}>

                <td style={!t.close ? styleSheet.td_red : {}}> {days[t.id]} </td>

                <td style={!t.close ? styleSheet.td_red : {}}>
                  {t.day_start_am }
                  <span
                    className='edit_time'
                    onClick={() => handleModal("input",days[t.id] + " / Ouverture matin", t.id, t.day_start_am, index, "day_start_am", t.close)}
                  >
                    
                  </span>
                </td>

                <td style={!t.close  ? styleSheet.td_red : t.day_end_am === "NC" ? styleSheet.td_big : {}}>
                  { t.day_end_am }
                  <span
                    className='edit_time'
                    onClick={() => handleModal("input",days[t.id] + " / Fermeture matin", t.id, t.day_end_am, index, "day_end_am", t.close)}
                  >
                    
                  </span>
                </td>

                <td style={!t.close  ? styleSheet.td_red : t.day_start_pm === "NC" ? styleSheet.td_big : {}}>
                  { t.day_start_pm }
                  <span
                    className='edit_time'
                    onClick={() => handleModal("input",days[t.id] + " / Ouverture Aprem", t.id, t.day_start_pm, index, "day_start_pm", t.close)}
                  >
                    
                  </span>
                </td>

                <td style={!t.close ? styleSheet.td_red : {}}>
                  { t.day_end_pm }
                  <span
                    className='edit_time'
                    onClick={() => handleModal("input",days[t.id] + " / Ouverture Aprem", t.id, t.day_end_pm, index, "day_end_pm", t.close)}
                  >
                   
                  </span>
                </td>

                <td style={!t.close ? styleSheet.td_red : {color:"green"}}>
                  {!t.close ? "Fermé" : "Ouvert"}
                  <span
                    className='edit_time'
                    onClick={() => handleModal("checkbox",days[t.id] + " / Ouverture Aprem", t.id, t.day_end_pm, index, "day_end_pm", t.close)}
                  >
                   
                  </span>
                </td>
              </tr>)}
          </tbody>
        </table>
       
      </div>
          
    </div>
  )
}

export default TimesOpeningHandler
