import React, { useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import StarsBlock from '../../Stars/StarsBlock'
import axios from '../../../api/axios'

const AvisPage = () => {
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
  const [review, setReview] = useState(5)
  const [serverMessage, setServerMessage] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();
    const avisPagePath = process.env.REACT_APP_HTTP + "/pages/newReview.php";
    const formData = new FormData();
    formData.append("newReview", true);
    formData.append("name", name);
    formData.append("message", message);
    formData.append("review", review);
    axios.post(avisPagePath, formData, {
      headers:
      {
        "Content-Type": "application/x-www-form-urlencoded"
      }
      
      
    })
      .then(response => {
        if (response.data.status) {
          setServerMessage(response.data.message)
        } else {
          setServerMessage("Probleme pendant l'envois des données, rententez plus tard")
        }
      })
    
  }
    

  return (
    <div>
    
      <PageTitle pageTitle={"Votre avis nous interesse"} />
      
      <form className='form' onSubmit={handleSubmit} >
      {serverMessage && <div className='error-message'>{serverMessage}</div>}
            <FormElement label={{ for: "name", text: "Prénom" }} input={{  type: "text", name: "name", id: "name", value:name, onChange:(e)=> setName(e.target.value) }} required={true} />
            <FormElement label={{ for: "message", text: "Commentaire" }} textarea={{ name: "message", id: "message",  value: message, onChange: (e) => setMessage(e.target.value) }}  required={true}/>
              <span style={{fontSize:"20px"}}>Laissez une note</span>
              <StarsBlock numberOfActiveStars={5} clickable={true} setReview={(value) => setReview(value)} />
              <FormElement input={{type:"submit",value:"Envoyer"}}/>
          </form>
          

    </div>
  )
}

export default AvisPage
