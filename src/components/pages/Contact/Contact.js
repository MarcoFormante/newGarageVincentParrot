import React from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useLocation } from 'react-router-dom'

const Contact = () => {
  const location = useLocation();
 
  return (
      <div>
          <PageTitle pageTitle={"Contactez-nous"} />
          
          <form className='form'>
              
              <FormElement label={{ for: "subject", text: "Subject" }} input={{ type: "text", name: "subject", id: "subject",value: location.state && `${location.state.make} ${location.state.model} , Année : ${location.state.year}, VoitureID: ${location.state.id}`}} />
              
              <FormElement label={{ for: "surname", text: "Nom" }} input={{ type: "text", name: "surname", id: "surname",required:true }} />
              
              <FormElement label={{ for: "name", text: "Prénom" }} input={{ type: "text", name: "name", id: "name",required:true }} />
              
              <FormElement label={{for:"email",text:"Email"}} input={{type:"email",name:"email",id:"email",required:true}} />
              
              <FormElement label={{for:"tel",text:"Telephone"}} input={{type:"tel",name:"tel",id:"tel",required:true}}/>

              <FormElement label={{for:"message",text:"Message"}} textarea={{name:"message",id:"message",required:true}} />
             
              <FormElement input={{type:"submit",value:"Envoyer"}}/>
              
          </form>
          
        
    </div>
  )
}

export default Contact

