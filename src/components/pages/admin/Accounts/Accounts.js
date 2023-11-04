import React, { useState } from 'react'
import PageTitle from '../../../PageTitle/PageTitle'
import FormElement from '../../../../components/FormElement/FormElement'
import axios from '../../../../api/axios'
import ListAllAccounts from './ListAllAccounts'
import CheckToken from '../../../../helpers/CheckToken'
import toast,{Toaster} from 'react-hot-toast'


const Accounts = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [newUser, setNewUser] = useState({});
  
  
  const notifySuccess = (text) => toast.success(text);
  const notifyError = (text) => toast.error(text);
  

  function handleEmail(e) {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setEmailError("");
    
  }


  function handlePassword(e) {
    const passwordInput = e.target.value;
    setPassword(passwordInput);
    setPasswordError("");
  }

  

  function checkInputs(email, password) {
    // eslint-disable-next-line no-empty-character-class
    
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
      formData.append("password", password)
     
      axios.post('user/new', formData).then(response => {
              console.log(response.data);
                if (response.data.status === 1) {
                  setNewUser({id:response.data.userId, email:email})
                  notifySuccess("Ajoutè avec succès")
                  setEmail("");
                  setPassword("");
                } else {

                  if (response.data.status === 0 && response.data.message.match(/Duplicate entry/)) {
                      notifyError("Erreur: cet utilisateur existe deja")
                  } else {
                      notifyError("Erreur: un probleme est survenu, impossible d'ajouter un nouveau compte")
                  }
                    
                }
              }).catch(error => {
                  notifyError("Erreur: un probleme est survenu, impossible de ajouter un nouveau compte")
                })
       
    }
}
  
 
  return (
    <div>
      <div>
        <Toaster/>
      <PageTitle pageTitle={"Créer un nouvel account"}/>
      <form className='form' onSubmit={handleSubmit}>
        <FormElement
          label={{ for: "email", text: "Email" }}
          input={{ type: "text", name: "email", id: "email",  style : {width:"80vw"},  onChange: (e) => handleEmail(e), maxLength:60 }} value={email} required={true}
        />
        <span className='error-message text-center'>{emailError}</span>

        <FormElement
          label={{ for: "password", text: "Password" }}
          input={{ type: "password", name: "password", id: "password", style : {width:"80vw"}, onChange: (e) => handlePassword(e),maxLength:60}}   value={password} required={true}
        />
        <span className='error-message text-center'>{passwordError}</span>
        <input type="submit" className='cta cta--red mar-top-20' value={"Crèer"} />
       
      </form>
      <br />
      <br />
      
      </div>

      {/* List of all account */}
      <ListAllAccounts  newUser={newUser} />
      </div>
  )
}

export default Accounts
