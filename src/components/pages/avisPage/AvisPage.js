import React, { useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import StarsBlock from '../../Stars/StarsBlock'
import axios from '../../../api/axios'
import toast ,{Toaster} from "react-hot-toast"

const AvisPage = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [review, setReview] = useState(5)
  const [formSent, setFormSent] = useState(false);
   
    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);
  

  function handleSubmit(e) {
    e.preventDefault();
    const avisPagePath = "pages/newReview.php";
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
    }).then(response => {
        if (response.data.status === 1) {
          notifySuccess(response.data.message)
          setName("")
          setMessage("")
          setReview(5)
          setFormSent(true);

        } else {
          notifyError("Probleme pendant l'envois des données, rententez plus tard")
        }
      }).catch(error => {
        notifyError("Probleme pendant l'envois des données, rententez plus tard")
      }).finally(setFormSent(false))
  }
    

  return (
    <div>
      <PageTitle pageTitle={"Votre avis nous interesse"} />
      <Toaster/>
      <form className='form' onSubmit={handleSubmit} >
            <FormElement label={{ for: "name", text: "Prénom" }} input={{className:"width-formInpt_noFlex", type: "text", name: "name", id: "name", onChange:(e)=> setName(e.target.value.slice(0,18)) }} maxLength={18} value={name} required={true} />
            <FormElement label={{ for: "message", text: "Commentaire" }} textarea={{className:"width-formInpt_noFlex", name: "message", id: "message",  onChange: (e) => setMessage(e.target.value.slice(0,255)) }}  maxLength={255}  value={message} required={true}/>
              <span style={{fontSize:"20px"}}>Laissez une note</span>
              <StarsBlock numberOfActiveStars={review} clickable={true} formSent={formSent} setReview={(value) => setReview(value)} />
        <FormElement input={{ type: "submit", value: "Envoyer" }} />
          </form>
          

    </div>
  )
}

export default AvisPage
