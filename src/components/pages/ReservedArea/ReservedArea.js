import React from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import FormElement from '../../FormElement/FormElement'

const ReservedArea = () => {
  return (
    <div>
      <PageTitle pageTitle={"Area Reservé au personnel"} />
      <form className='form'>
        <FormElement label={{ for: "email", text: "Email" }} input={{ type: "email", name: "email", id: "email", required: true }} />
        <FormElement label={{ for: "password", text: "Password" }} input={{ type: "password", name: "password", id: "password", required: true }} />
        <FormElement input={{type:"submit",value:"Acceder"}}/>
      </form>
    </div>
  )
}

export default ReservedArea
