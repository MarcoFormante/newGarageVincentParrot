import React, { useEffect } from 'react'
import HeroHome from './HeroHome'
import Offers from './Offers'
import Services from './Services'
import AvisSection from './AvisSection'


const Home = ({ pageTitle }) => {
  useEffect(() => {
    pageTitle("Garage Vincent Parrot")
  }, [pageTitle])
  
  return (
    <div>
      <HeroHome />
      <Offers />
      <Services />
      <AvisSection />
    
    </div>
  )
}

export default Home
