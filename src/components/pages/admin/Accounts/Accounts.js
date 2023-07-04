import React, { useState } from 'react'
import PageTitle from '../../../PageTitle/PageTitle'
import FormElement from '../../../../components/FormElement/FormElement'
import axios from '../../../../api/axios'
import ListAllAccounts from './ListAllAccounts'


const Accounts = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverMessage, setServerMessage] = useState({ status: "", message: "" });
  const [newUser, setNewUser] = useState({});
  

  function handleEmail(e) {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setEmailError("");
    setServerMessage("");
  }


  function handlePassword(e) {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    setPasswordError("");
  }

  

  function checkInputs(email, password) {
    let isEmailValid = email.match(/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/)
    let isPasswordValid = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,61}$/gm)
    if (!isPasswordValid) {
      setPasswordError("Le password doit contenir minimum 8 character avec au moins une lettre majuscule et un chiffre")
    } else {
     setPasswordError("")
    }
    if (!isEmailValid) {
      setEmailError("L'email n'est pas correct")
    } else {
     setEmailError("")
    }

    return isEmailValid && isPasswordValid
  } 


  function handleSubmit(e) {
    e.preventDefault();
    
    if (checkInputs(email, password)) {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password",password)
      axios.post('pages/admin/accounts.php',
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        
      ).then(response => {
        setServerMessage(response.data)
        if (response.data.status === 1) {
          setNewUser({id:response.data.userId, email:email})
          setTimeout(() => {
            setServerMessage("");
          }, 5000)
          setEmail("");
          setPassword("");
        }
      })
      .catch(error =>  setServerMessage(error.data))
    }
}
  
 
  return (
    <div>
    <div>
      <PageTitle pageTitle={"Créer un nouvel account"}/>
      <form className='form' onSubmit={handleSubmit}>
        <FormElement
          label={{ for: "email", text: "Email" }}
          input={{ type: "text", name: "email", id: "email",  onChange: (e) => handleEmail(e), maxLength:60 }} value={email} required={true}
        />
        <span className='error-message text-center'>{emailError}</span>

        <FormElement
          label={{ for: "password", text: "Password" }}
          input={{ type: "password", name: "password", id: "password", onChange: (e) => handlePassword(e),maxLength:60 }}  value={password} required={true}
        />
        <span className='error-message text-center'>{passwordError}</span>
        <input type="submit" className='cta cta--red mar-top-20' value={"Crèer"} />
       
      </form>
      <br />
      
      <span className={`${serverMessage.status === 1 ? "success-message" : "error-message"}  text-center`}>{serverMessage.message}</span>
      
      </div>

      {/* List of all account */}
      <ListAllAccounts  newUser={newUser} />
      </div>
  )
}

export default Accounts
