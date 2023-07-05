import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import SwitchPageBlock from '../../../SwitchPageBlock/SwitchPageBlock'

const CarsHandler = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [cars, setCars] = useState([])
    const [carsCount,seCarsCount] = useState(0)

    useEffect(() => {
        const path = "pages/admin/carHandler.php" 
        const formData = new FormData()
        formData.append("currentPage", currentPage * 8)
        formData.append("getAllCars",true)
        axios.post(path, formData, {
            headers: {
                "Content-Type":"application/x-www-form-urlencoded"
            }
        }).then(response => {
            console.log(response.data);
            if (response.data.status === 1) {
                setCars([...response.data.cars])
                seCarsCount(response.data.count)
            }
            
        })
        
    }, [currentPage])
    

    function handleCarPage(page) {
        
    }

    return (
        <div>
            <PageTitle pageTitle={"Gestion vehicules"}/>
      <div className='container--pad-top'>
       
          <div className='table_handler container--pad-top' style={{overflowY:"hidden",padding:20}}>
              <table className='mar-auto  table_handler_container ' style={{overflowY:"hidden",minWidth:1000,textAlign:"center"}}>
                  <thead >
                      <tr >
                          <th>CarID</th>
                          <th>Brand</th>
                          <th>Model</th>
                          <th>Thumbnail</th>
                          <th>Année</th>
                          <th>Km</th>
                          <th>Prix</th>
                          <th>Offre</th>
                          <th>Numero VO</th>
                          <th>Date creation</th>
                          <th>Effacer</th>
                      </tr>
                  </thead>

                  <tbody>
                        {cars && cars.map((car, index) =>
                        <tr key={"carsHandler_" + car.id} >
                                <td>{car.id}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td><img src={"/images/Maps.jpg"} alt="" width={30} height={30} style={{ objectFit: "cover" }} /></td>
                                <td>{car.year}</td>
                                <td>{car.km}</td>
                                <td>{car.price}</td>
                                <td>{car.offer}</td>
                                <td>{car.vo_number}</td>
                                <td>{car.created_at}</td>
                                <td> <span className='delete-icon' style={{margin:"auto"}}></span></td>
                        </tr>
                        )}
                  </tbody>
                </table>
                    
                <div style={{position:"fixed",bottom: 0 ,left:"50%",transform:"translateX(-50%)"}}>
                <SwitchPageBlock currentPage={ currentPage} setCurrentPage={(value)=>setCurrentPage(value)} handleCarPage={(value)=>handleCarPage(value)} dataLength={carsCount} />
                </div>
          </div>
     
        </div>
            
    </div>
  )
}

export default CarsHandler
