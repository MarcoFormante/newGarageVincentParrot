import React, { useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import StarsBlock from '../../Stars/StarsBlock'
import ButtonCta from '../../Buttons/ButtonCta'


const AvisPage = () => {
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [feedback, setFeedback] = useState(0)
    

  return (
    <div>
          <PageTitle pageTitle={"Votre avis nous interesse"} />
          <form className='form'>
            <FormElement label={{ for: "name", text: "Prénom" }} input={{ required: true, type: "text", name: "name", id: "name", value:name, onChange:(e)=> setName(e.target.value) }} />
            <FormElement label={{ for: "message", text: "Commentaire" }} textarea={{ name: "message", id: "message", required: true, value: comment, onChange: (e) => setComment(e.target.value) }} />
              <span style={{fontSize:"20px"}}>Laissez une note</span>
              <StarsBlock numberOfActiveStars={5} clickable={true} setFeedback={(value) => setFeedback(value)} />
              <FormElement input={{type:"submit",value:"Envoyer"}}/>
             
          </form>
          

    </div>
  )
}

export default AvisPage
