import React, { useEffect } from 'react'


const Home = ({ pageTitle }) => {
  useEffect(() => {
    pageTitle("Garage Vincent Parrot")
  }, [])
  
  return (
    <div>
    
      <figure className='hero_home'>
        <h2 className="page_title_home">Vehicules d'occasion au <span>meilleurs</span> prix</h2>
        <figcaption className='hero_home_caption'>La voiture de vos rêves au prix le moins cher du marché.</figcaption>
      </figure>
      
    </div>
  )
}

export default Home
