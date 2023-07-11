import React, { useEffect, useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useLocation } from 'react-router-dom'

const Contact = () => {
  const location = useLocation();
  const [formInputs, setFormInputs] = useState({subject:"",surname:"",name:"",email:"",tel:"",message:""})
  
  useEffect(() => {
    if (location.state) {
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
              
              <FormElement label={{ for: "subject", text: "Subject" }} input={{ className:"width-formInpt_noFlex", type: "text", name: "subject", id: "subject", onChange: (e) => handleChange(e.target.name, e.target.value) }} value={formInputs.subject} />
              
              <FormElement label={{ for: "surname", text: "Nom" }} input={{className:"width-formInpt_noFlex", type: "text", name: "surname", id: "surname",required:true,value:formInputs.surname, onChange:(e)=> handleChange(e.target.name,e.target.value) }} />
              
              <FormElement label={{ for: "name", text: "Prénom" }} input={{className:"width-formInpt_noFlex", type: "text", name: "name", id: "name",required:true,value:formInputs.name, onChange:(e)=> handleChange(e.target.name,e.target.value) }} />
              
              <FormElement label={{for:"email",text:"Email"}} input={{className:"width-formInpt_noFlex", type:"email",name:"email",id:"email",required:true,value:formInputs.email, onChange:(e)=> handleChange(e.target.name,e.target.value)}} />
              
              <FormElement label={{for:"tel",text:"Telephone"}} input={{className:"width-formInpt_noFlex" , type:"tel",name:"tel",id:"tel",required:true,value:formInputs.tel, onChange:(e)=> handleChange(e.target.name,e.target.value)}}/>

              <FormElement label={{for:"message",text:"Message"}} textarea={{className:"width-formInpt_noFlex",  name:"message",id:"message",required:true,value:formInputs.message, onChange:(e)=> handleChange(e.target.name,e.target.value)}} />
             
              <FormElement input={{type:"submit",value:"Envoyer"}}/>
              
          </form>
          
        
    </div>
  )
}

export default Contact

