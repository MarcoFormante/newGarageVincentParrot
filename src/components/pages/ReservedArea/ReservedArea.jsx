import React, {useState } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'
import { useNavigate } from 'react-router-dom'
import { setAuthToken } from '../../../helpers/SetAuth'
import { add } from '../../Reducers/RoleReducer'
import axios from '../../../api/axios'
import { useDispatch } from 'react-redux'

const   ReservedArea = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch()
  


  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      axios.post(`user/login`, formData).then((response) => {
        if (response.data.status === 1) {
          const token = response.data.token;
          window.sessionStorage.setItem("token", token);
          window.sessionStorage.setItem("role", response.data.role);
          dispatch(add(response.data.role))
          setAuthToken(token);
          setLogin(true);
          navigate("/");
        } else {
          setErrorMessage(response.data.message);
        }
      });
    }
  }

  return (
    <div>
      <PageTitle pageTitle={"Area Reservé au personnel"} />
      <form className="form" onSubmit={handleSubmit}>
        <FormElement
          label={{ for: "email", text: "Email" }}
          input={{
            type: "email",
            name: "email",
            id: "email",
            required: true,
            value: email,
            onChange: (e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            },
            style: { width: "80vw" },
          }}
        />
        <FormElement
          label={{ for: "password", text: "Password" }}
          input={{
            type: "password",
            name: "password",
            id: "password",
            required: true,
            value: password,
            onChange: (e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            },
            style: { width: "80vw" },
          }}
        />
        <FormElement input={{ type: "submit", value: "Acceder" }} />
      </form>
      {errorMessage && (
        <span className="error-message text-center pad-top-20">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default ReservedArea
