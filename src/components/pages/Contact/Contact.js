import React, { useEffect, useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useLocation } from 'react-router-dom'

const Contact = () => {
  const location = useLocation();
  const [formInputs, setFormInputs] = useState({subject:"",surname:"",name:"",email:"",tel:"",message:""})
  
  useEffect(() => {
    if (location.state.id) {
      setFormInputs({...formInputs,subject:`${location.state.make} ${location.state.model} , Année : ${location.state.year}, VoitureID: ${location.state.id}`})
    }
  }, [])

  function handleChange(name,value) {
    setFormInputs({...formInputs,[name]:value})
  }
  

  return (
      <div>
          <PageTitle pageTitle={"Contactez-nous"} />
          
          <form className='form'>
              
              <FormElement label={{ for: "subject", text: "Subject" }}  input={{ type: "text", name: "subject", id: "subject", value:formInputs.subject, onChange:(e)=> handleChange(e.target.name,e.target.value)}} />
              
              <FormElement label={{ for: "surname", text: "Nom" }} input={{ type: "text", name: "surname", id: "surname",required:true,value:formInputs.surname, onChange:(e)=> handleChange(e.target.name,e.target.value) }} />
              
              <FormElement label={{ for: "name", text: "Prénom" }} input={{ type: "text", name: "name", id: "name",required:true,value:formInputs.name, onChange:(e)=> handleChange(e.target.name,e.target.value) }} />
              
              <FormElement label={{for:"email",text:"Email"}} input={{type:"email",name:"email",id:"email",required:true,value:formInputs.email, onChange:(e)=> handleChange(e.target.name,e.target.value)}} />
              
              <FormElement label={{for:"tel",text:"Telephone"}} input={{type:"tel",name:"tel",id:"tel",required:true,value:formInputs.tel, onChange:(e)=> handleChange(e.target.name,e.target.value)}}/>

              <FormElement label={{for:"message",text:"Message"}} textarea={{name:"message",id:"message",required:true,value:formInputs.message, onChange:(e)=> handleChange(e.target.name,e.target.value)}} />
             
              <FormElement input={{type:"submit",value:"Envoyer"}}/>
              
          </form>
          
        
    </div>
  )
}

export default Contact

