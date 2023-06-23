import React, { useEffect, useState } from 'react'
import HeroHome from './HeroHome'
import Offers from './Offers'
import Services from './Services'
import AvisSection from './AvisSection'
import PageTitle from '../../PageTitle/PageTitle'





const Home = ({handleOpeningTimes}) => {
  
  return (
    <div>
    <PageTitle pageTitle={"Garage Vincent Parrot"} />
      <HeroHome />
      <Offers  />
      <Services />
      <AvisSection />
    </div>
  )
}

export default Home
