import React, { useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import CheckUser from '../../../helpers/CheckUser'
import { setAuthToken } from '../../../helpers/SetAuth'
import { add, remove } from '../../Reducers/RoleReducer'
import { useDispatch } from 'react-redux'

const ReservedArea = ({ setLogin }) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const location = useLocation() 
  const [errorMessage, setErrorMessage] = useState("");
  const  dispatch = useDispatch()

  function handleSubmit(e) {
   //send form data to validate admin account
    // replace this function to axios  request when front is finished
    e.preventDefault();
    if (email && password) {
      CheckUser(email, password).then((response) => {
        let isValid = response.data.status;
        if (isValid === 1) {
          const token = response.data.token;
          window.localStorage.setItem("token", token);
          setAuthToken(token);
          dispatch(add(response.data.role))
          setLogin(true)
          navigate("/", { replace:true ,state:{from:location}})
        } else {
          setErrorMessage(response.data.message)
          
        }
      }
      );
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
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default ReservedArea
