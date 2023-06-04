import React from 'react'
import PageTitle from '../PageTitle/PageTitle'

const Contact = () => {
  return (
      <div>
          <PageTitle pageTitle={"Contactez-nous"}/>
          <form className='contact_form'>
                <div>
                    <label htmlFor="subject">Subject</label>
                    <input type="text" name='subject' id='subject'/>
                </div>

                <div>
                    <label htmlFor="surname">Nom</label>
                    <input type="text" name='surname' id='surname'required />
                </div>
              
                <div>
                    <label htmlFor="name">Prénom</label>
                    <input type="text" name='name' id='name' required/>
                </div>
              
                <div>
                    <label htmlFor="mail">Email</label>
                    <input type="email" name='mail' id='mail'required />
                </div>
              
                <div>
                    <label htmlFor="tel">Telephone</label>
                    <input type='tel' name='tel' id='tel' required/>
                </div>
              
                <div>
                    <label htmlFor="message">Message</label>
                    <textarea name='message' id='message' required/>
              </div>
              
                <input type="submit" name="submit" value="Envoyer" className='cta cta--red' style={{width:"",padding:"8px 30px",marginTop:"20px"}} />
        </form>
    </div>
  )
}

export default Contact
