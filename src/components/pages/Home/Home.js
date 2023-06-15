import React, { useEffect, useState } from 'react'
import HeroHome from './HeroHome'
import Offers from './Offers'
import Services from './Services'
import AvisSection from './AvisSection'
import PageTitle from '../../PageTitle/PageTitle'
import axios from '../../../api/axios'




const Home = ({handleOpeningTimes}) => {

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
                        setcarCount(response?.data?.cars[1]) 
                        setofferCards(response?.data?.cars[0])
                    }
                    if (response?.data?.services.length > 0) {
                      setServices(...[response?.data?.services])
                    }
                    if (response?.data?.openingTimes.length > 0) {
                      handleOpeningTimes([...response?.data?.openingTimes])
                    }
              
                  } else {
                    //create component for error page
                    console.warn(response.data.message)
                }
            
            }).catch(error => console.warn(error))  
       
 }, [])
   

  
  return (
    <div>
    <PageTitle pageTitle={"Garage Vincent Parrot"} />
      <HeroHome />
      <Offers cars={offerCards} count={carCount} />
      <Services services={services} />
      <AvisSection />
    </div>
  )
}

export default Home
