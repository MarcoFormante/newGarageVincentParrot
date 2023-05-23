import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <div className={'section_page section_page_services'}>
        <h3 className={'section_title section_title_services'}>Decouvrez nos services</h3> 
        <figure className={'container--flex'}>
            <img src={"/images/bkhome-mb.jpg"} alt="" width={530} height={447}/>
          <p className={'txt-services txt-services--lineheight'}>Dans notre centre,
            nous nous engageons à fournir des services
            de haute qualité pour assurer que votre véhicule
            soit dans les meilleures conditions possibles.
            Des controles de routine à la résolution de problèmes complexes,
            notre équipe possède l’expérience et les compétences nécessaires
            pour prendre soin de votre véhicule avec attention et précision.
          </p>
      </figure>
      
          <ul className={"services_list"}>
              <li>service</li>
              <li>service</li>
              <li>service</li>
              <li>service</li>
              <li>service</li>
              <li>service</li>
              <li>service</li>
          </ul>

      <p className='txt-services'>N’hésitez pas à nous <Link to={"contact"}>contacter</Link> si vous souhaitez obtenir plus d’informations. Notre équipe se tient à votre disposition pour répondre à toutes vos questions et vous fournir les reinseignements dont vous avez besoin</p>
        
    </div>
  )
}

export default Services
