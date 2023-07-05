import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import SwitchPageBlock from '../../../SwitchPageBlock/SwitchPageBlock'
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../../Modal/Modal';

const CarsHandler = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [cars, setCars] = useState([])
    const [carsCount, seCarsCount] = useState(0)
    const [modalToggle, setModalToggle] = useState(false)
    const [carTarget, setCarTarget] = useState(null)
    const [dataToUpdate,setDataToUpdate] = useState(null)
    const table = React.useRef()

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    useEffect(() => {
        const path = "pages/admin/carHandler.php" 
        const formData = new FormData()
        formData.append("currentPage", currentPage * 9)
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
                table.current.scrollLeft = 0
            } else {
                notifyError(response.data.message)
            }
        })
        
    }, [currentPage])

    useEffect(() => {
        if (carTarget) {
            setModalToggle(true)
        }
    }, [carTarget])
    

    function deleteCar(id,thumbnail){
        const path = `pages/admin/carHandler.php?id=${id}&thumbnail=${thumbnail}`
        axios.delete(path)
        .then(response => {
         console.log(response.data);
            if (response.data.status === 1) {
                notifySuccess(response.data.message)
                setCarTarget(null)
                setModalToggle(false)
                setCars(cars.filter(car => car.id !== id))

            } else if(response.data.includes("unlink")){
                notifyError("Erreur: impossible de supprimer la voiture, impossible de trouver les images dans le dossier uploads")

            } else {
                notifyError(response.data.message)
            }
        })
    }


    useEffect(() => {
        if (dataToUpdate !== null) {
            setModalToggle(true);
        }
       
    },[dataToUpdate])

    function updateCar() {
        
    }

console.log(dataToUpdate);
    
    return (
        <div>
            <Toaster />
            {(modalToggle && dataToUpdate === null) ?
                <Modal type={"alert"} title={"Vous êtes sûr de vouloir supprimer cette voiture?"} onExit={() => {
                    setModalToggle(false)
                    setCarTarget(null)
                }}
                    onClick={()=> deleteCar(carTarget.id,carTarget.thumbnail)}
                >
                    <div className='text-center container--center--column pad-20'>
                        <p><b>Numero Vo:</b></p>
                        <p>{carTarget.vo}</p>
                        <p className='mar-top-20'><b>Voiture:</b></p>
                        <p>{carTarget.make}, {carTarget.model}</p>
                    </div>
                    
                </Modal>
                :
                modalToggle && dataToUpdate !== null ?
                <Modal type={"input"} title={"Modifier"}
                    onExit={() => {
                    setModalToggle(false);
                    setDataToUpdate(null);
                }}
                    onClick={() => {
                        updateCar()
                    }}
                    >
                        <span><b>{dataToUpdate.column[1]}</b></span>

                        {dataToUpdate.type !== "file"
                            ?
                            <input type={dataToUpdate.type} value={dataToUpdate.value} onChange={(e) => setDataToUpdate({ ...dataToUpdate, value: e.target.value })} />
                            
                            :

                            <input type="file" name='file' accept='image/jpeg, image/png'/>
                        }
                    </Modal>
                    :

                    null
                }

            <PageTitle pageTitle={"Gestion vehicules"}/>
      <div className='container--pad-top'>
       
                <div ref={table} className='table_handler container--pad-top' style={{overflowY:"hidden",padding:20}}>
              <table className='mar-auto  table_handler_container ' style={{overflowY:"hidden",minWidth:1000,textAlign:"center"}}>
                  <thead >
                      <tr>
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
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["make","Brand"],value:car.make,type:"text"})}>{car.make}</td>
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["model","Model"],value:car.model,type:"text"})}>{car.model}</td>
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["thumbnail","Image Card"],value:car.thumbnail,type:"file"})}><img src={"/images/uploads/"+ car.thumbnail} alt="" width={30} height={30} style={{ objectFit: "cover" }} /></td>
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["year","Année"],value:car.year,type:"number"})}>{car.year}</td>
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["km","Kilometre"],value:car.km,type:"number"})}>{car.km}</td>
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["price","Prix"],value:car.price,type:"number"})}>{car.price}</td>
                                <td onClick={() => setDataToUpdate({table:"carCard",id:car.id,column:["offer","Offre"],value:car.offer,type:"number"})}>{car.offer}</td>
                                <td onClick={() => setDataToUpdate({table:"details",id:car.id,column:["vo_number","Numero VO"],value:car.vo_number,type:"number"})}>{car.vo_number}</td>
                                <td>{car.created_at}</td>
                                <td> <span className='delete-icon' style={{ margin: "auto" }} onClick={() => {
                                    setCarTarget({id:car.id,thumbnail:car.thumbnail, vo:car.vo_number, make:car.make, model:car.model})
                                }}></span></td>
                        </tr>
                        )}
                  </tbody>
                </table>
                    
                <div style={{position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
                <SwitchPageBlock currentPage={ currentPage} setCurrentPage={(value)=>setCurrentPage(value)} handleCarPage={()=>{}} dataLength={carsCount} />
                </div>
          </div>
     
        </div>
            
    </div>
  )
}

export default CarsHandler
