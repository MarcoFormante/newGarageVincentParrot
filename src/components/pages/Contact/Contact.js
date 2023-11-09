import React, { useEffect, useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useLocation } from 'react-router-dom'
import emailjs from "@emailjs/browser"
import toast, { Toaster } from 'react-hot-toast'

const Contact = () => {
  const location = useLocation();
  const [formInputs, setFormInputs] = useState({ subject: "", surname: "", name: "", email: "", tel: "", message: "" })
  const notifySuccess = (text) => toast.success(text)
  const notifyError = (text) => toast.error(text)
  
  useEffect(() => {
    if (location.state) {
      setFormInputs({...formInputs,subject:`${location.state.make} ${location.state.model} , Année : ${location.state.year}`})
    }
  }, [])

  function handleChange(name,value) {
    setFormInputs({...formInputs,[name]:value})
  }

  function checkFormInputs(surname, name, email, tel, message) {
    let errors = [];
    if (surname.match(/[^a-z A-Z]+/g) || (surname.length < 2 || surname.length > 20) ) {
      errors.push("surname");
    }
    if (name.match(/[^a-z A-Z]+/g) || (surname.length < 2 || surname.length > 20)) {
      errors.push("name");
    }

    if (!email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
        errors.push("email")
    }

    if (!tel.match(/^((?!|"\+\.)[\d+])$/)) {
      errors.push("tel")
  }
     
    if (message.match(/!|<|>|&/gi)) {
      errors.push("message")
    }

  }

  function submitForm(e) {
    e.preventDefault()
    if (formInputs.surname && formInputs.name && formInputs.email && formInputs.tel && formInputs.message) {
      checkFormInputs(formInputs.surname, formInputs.name, formInputs.email, formInputs.tel, formInputs.message)
      if ( emailjs.sendForm("service_23l3ul5", "template_vsffnz7", e.target, "dQufTu-6qCghfGD3w")) {
        notifySuccess("Message envoyé avec succès")
        setFormInputs({ subject: "", surname: "", name: "", email: "", tel: "", message: "" })
      } else {
        notifyError("Un problème est survenu")
      }
    } else {
      notifySuccess("Remplir les champs obligatoires (nom,prènom,email,telephone,message")
    }

  }
  

  return (
    <div>
      <Toaster/>
          <PageTitle pageTitle={"Contactez-nous"} />
          
      <form className='form' onSubmit={(e) => submitForm(e)}>

        <FormElement
          label={{ for: "carID", text: "" }}
          input={
            {
              className: "width-formInpt_noFlex",
              hidden: true,
              type: "text",
              name: "carID",
              id: "carID",
              onChange: () => { }
            }}
          value={location?.state?.id && `VoitureID: ${location?.state?.id}`}
        />

        <FormElement
          label={{ for: "subject", text: "Subject" }}
          input={
            {
              className: "width-formInpt_noFlex",
              type: "text",
              name: "subject",
              id: "subject",
              onChange: (e) => handleChange(e.target.name, e.target.value)
            }}
          value={formInputs.subject.slice(0, 100)}
          maxLength={100}
        />
              
        <FormElement
          label={
            { for: "surname", text: "Nom" }}
          input={
            {
              className: "width-formInpt_noFlex",
              type: "text",
              name: "surname",
              id: "surname",
              required: true,
              value: formInputs.surname,
              onChange: (e) => handleChange(e.target.name, e.target.value.slice(0, 50))
            }}
          maxLength={20} value={formInputs.surname}
          required={true}
        />
              
        <FormElement
          label={{ for: "name", text: "Prénom" }}
          input={{ className: "width-formInpt_noFlex", type: "text", name: "name", id: "name", required: true, value: formInputs.name, onChange: (e) => handleChange(e.target.name, e.target.value.slice(0, 20)) }}
          maxLength={50}
          value={formInputs.name}
          required={true}
        />
              
        <FormElement
          label={{ for: "email", text: "Email" }}
          input={{ className: "width-formInpt_noFlex", type: "email", name: "email", id: "email", required: true, value: formInputs.email, onChange: (e) => handleChange(e.target.name, e.target.value.slice(0, 50)) }}
          maxLength={50}
          value={formInputs.email}
          required={true}
        />
              
        <FormElement
          label={{ for: "tel", text: "Telephone" }}
          input={{ className: "width-formInpt_noFlex", type: "number", name: "tel", id: "tel", required: true, value: formInputs.tel, onChange: (e) => handleChange(e.target.name, e.target.value.slice(0, 10)) }}
          value={formInputs.tel}
          required={true}
        />

        <FormElement
          label={{ for: "message", text: "Message" }}
          textarea={{ className: "width-formInpt_noFlex", name: "message", id: "message", required: true, value: formInputs.message, placeholder: "max 255 characters", onChange: (e) => handleChange(e.target.name, e.target.value) }}
          maxLength={255}
          value={formInputs.message.slice(0, 255)}
          required={true}
        />
             
        <FormElement
          input={{ type: "submit", value: "Envoyer" }}
        />
              
          </form>
          
          
    </div>
  )
}

export default Contact

