import React, { useEffect } from 'react'
import HeroHome from './HeroHome'
import Offers from './Offers'
import Services from './Services'

const Home = ({ pageTitle }) => {
  useEffect(() => {
    pageTitle("Garage Vincent Parrot")
  }, [])
  
  return (
    <div>
      <HeroHome />
      <Offers />
      <Services />
    </div>
  )
}

export default Home
