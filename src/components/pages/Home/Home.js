import React, { useEffect } from 'react'
import HeroHome from './HeroHome'

const Home = ({ pageTitle }) => {
  useEffect(() => {
    pageTitle("Garage Vincent Parrot")
  }, [])
  
  return (
    <div>
      <HeroHome />
        <h3 className='section_title'>Nos offres du mois</h3>
    </div>
  )
}

export default Home
