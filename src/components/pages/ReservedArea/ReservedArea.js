import React, { useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import CheckUser from '../../../helpers/CheckUser'
import { setAuthToken } from '../../../helpers/SetAuth'

const ReservedArea = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const location = useLocation() 
  const [errorInputMessage, setErrorInputMessage] = useState("");


  function handleSubmit(e) {
   //send form data to validate admin account
    // replace this function to axios  request when front is finished
    e.preventDefault();

    if (email && password) {
      CheckUser(email, password).then((response) => {
        let isValid = response.data.status;
        if (isValid) {
          const token = response.data.token;
          window.localStorage.setItem("token", token);
          setAuthToken(token);
          navigate("/admin", { replace:true ,state:{from:location}})
        } else {
          setErrorInputMessage("Que des lettres et de nombre sont admisent")
        }
      });
    }
  }
  
  return (
    <div>
      <PageTitle pageTitle={"Area Reservé au personnel"} />
      <form className='form' onSubmit={handleSubmit}>
        <FormElement label={{ for: "email", text: "Email" }} input={{ type: "email", name: "email", id: "email", required: true, value: email,onChange: (e) => setEmail(e.target.value)  }} />
        <FormElement label={{ for: "password", text: "Password" }} input={{ type: "password", name: "password", id: "password", required: true , value: password, onChange: (e) => setPassword(e.target.value) }} />
        <FormElement input={{type:"submit",value:"Acceder"}}/>
      </form>
      {errorInputMessage && <p>{errorInputMessage}</p>}
    </div>
  )
}

export default ReservedArea
