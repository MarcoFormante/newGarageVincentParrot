import React, { useEffect } from 'react'
import HeroHome from './HeroHome'
import Offers from './Offers'

const Home = ({ pageTitle }) => {
  useEffect(() => {
    pageTitle("Garage Vincent Parrot")
  }, [])
  
  return (
    <div>
      <HeroHome />
      <Offers />
    </div>
  )
}

export default Home
