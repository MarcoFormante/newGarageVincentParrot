import React, { useState,useEffect } from 'react'
import PageTitle from '../../PageTitle/PageTitle'
import CarCard from '../../CarCard/CarCard'

const ParcAuto = () => {
  const [cars, setCars] = useState([])
  
  useEffect(() => {
  
  }, [])
  
  return (
      <div>
          <PageTitle pageTitle={"Notre Parc automobile"}/>

    </div>
  )
}

export default ParcAuto
