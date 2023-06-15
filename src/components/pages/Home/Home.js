import React, { useEffect, useState } from 'react'
import HeroHome from './HeroHome'
import Offers from './Offers'
import Services from './Services'
import AvisSection from './AvisSection'
import PageTitle from '../../PageTitle/PageTitle'
import axios from '../../../api/axios'




const Home = () => {

  const [offerCards, setofferCards] = useState([])
  const [offerLimit, setOfferLimit] = useState(0);
  const [carCount, setcarCount] = useState(0);
  const [services, setServices] = useState([])
  
  useEffect(() => {
    const homepagePath = process.env.REACT_APP_HTTP + "pages/homePage.php";
    const formData = new FormData();
        formData.append('limit', offerLimit)
        axios.post(homepagePath, formData, {
            headers: {"Content-Type": "application/x-www-form-urlencoded"}})
            .then(response => {
                if (response?.data?.status !== 0 && response.status === 200) {
                  if (response?.data?.cars[0]?.length > 0) {
                      console.log("si");
                        setcarCount(response?.data?.cars[1]) 
                        setofferCards(response?.data?.cars[0])
                    }
                    if (response?.data?.services.length > 0) {
                      
                    }
                } else {
                    console.warn(response.data.message)
                }
            
            }).catch(error => console.warn(error))  
       
 }, [])
   

  
  return (
    <div>
    <PageTitle pageTitle={"Garage Vincent Parrot"} />
      <HeroHome />
      <Offers />
      <Services />
      <AvisSection />
    </div>
  )
}

export default Home
