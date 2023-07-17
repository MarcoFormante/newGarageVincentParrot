import React, { useCallback, useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import SwitchPageBlock from '../../../SwitchPageBlock/SwitchPageBlock'
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../../../Modal/Modal';
import Resizer from "react-image-file-resizer"
import CarHandlerDetails from './CarHandlerDetails';
import CheckToken from '../../../../helpers/CheckToken';
import { useNavigate } from 'react-router-dom';
import notAuth from '../../../../helpers/NotAuth';
import Loading from '../../../Loading/Loading';

const CarsHandler = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [cars, setCars] = useState([])
    const [carsCount, seCarsCount] = useState(0)
    const [modalToggle, setModalToggle] = useState(false)
    const [carTarget, setCarTarget] = useState(null)
    const [dataToUpdate, setDataToUpdate] = useState(null)
    const [dataImageToUpdate,setDataImageToUpdate] = useState("")
    const [filters, setFilters] = useState("Tout")
    const [modalFilterValue, setmodalFilterValue] = useState("");
    const [newCarDetailsArray,setNewCarDetailsArray] = useState([])
    const [carID, setCarID] = useState(null)
    const [isDetailUpdate, setIsDetailUpdate] = useState(false);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    
    const table = React.useRef()

    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const getCars = useCallback(() => {
        setLoading(true)
        if (localStorage.getItem("token")) {
            CheckToken(localStorage.getItem("token"))
                .then(response => {
                if (response.data.role === "admin" || response.data.role === "employee") {
                    const path = "pages/admin/carHandler.php" 
                    const formData = new FormData()
                    formData.append("currentPage", currentPage * 9)
                    formData.append("getAllCars", true)
                    formData.append("filters", filters)
                    formData.append("filterValue",modalFilterValue)
                    axios.post(path, formData, {
                        headers: {
                            "Content-Type":"application/x-www-form-urlencoded"
                        }
                    }).then(response => {
                        if (response.data.status === 1) {
                           
                            setCars([...response.data.cars])
                            seCarsCount(response.data.count)
                            table.current.scrollLeft = 0
                            setmodalFilterValue("")
                            if (response.data.cars.length < 1) {
                                notifyError("Aucune voiture trouvée")
                            }
                        } else {
                            notifyError(response.data.message)
                        }
                    })
                } else {
                    notAuth()
                    navigate("/")
                }
            }).finally(setLoading(false))
        }
    },[currentPage,filters,modalFilterValue,navigate]) 
        
       
    


    useEffect(() => {
        getCars() 
    }, [currentPage])



    useEffect(() => {
        if (carTarget) {
            setModalToggle(true)
        }
    }, [carTarget])
    

    function deleteCar(id, thumbnail) {
        const path = `pages/admin/carHandler.php?id=${id}&thumbnail=${thumbnail}`
        axios.delete(path)
        .then(response => {
        
            if (response.data.status === 1) {
                notifySuccess(response.data.message)
                setCarTarget(null)
                setModalToggle(false)
                setCars(cars.filter(car => +car.id !== +id))

            } else if(response.data.includes("unlink")){
                setCarTarget(null)
                setModalToggle(false)
                setCars(cars.filter(car => +car.id !== id))
                notifyError("Erreur: La voiture a été supprimé mais impossible de trouver et supprimer les images dans le dossier uploads")
            } else {
                notifyError(response.data.message)
            }
        })
    }



    useEffect(() => {
        if (dataToUpdate !== null) {
            setModalToggle(true);
        }
      
    }, [dataToUpdate])


    const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
        file,
        1280,
        853,
        "WEBP",
            80,
        0,
        (uri) => {
            resolve(uri);
        },
        "file",
        246,
        199
        );
    });

   

    async function updateCar() {
        if (dataToUpdate.table && dataToUpdate.column && dataToUpdate.value && dataToUpdate.type) {
            const path = "pages/admin/carHandler.php"
            const formData = new FormData()
            formData.append("table", dataToUpdate.table)
            formData.append("column", dataToUpdate.column[0])
            formData.append("id", +dataToUpdate.id)
            if (dataImageToUpdate) {
                if (typeof (dataToUpdate.value) === "object") {
                     formData.append("value", await resizeFile(dataToUpdate.value))
                    await formData.append("imageData", dataImageToUpdate ? dataImageToUpdate : 0)
                } else {
                    notifyError("Choisissez une image")
                    return
                }
            } else {
                formData.append("value", dataToUpdate.value)
            }
            axios.post(path, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            }).then(response => {
                if (response.data.status === 1) {
                    if (response.data.imageData) {
                        setCars([...cars, { ...cars[dataToUpdate.index][dataToUpdate.column[0]] = response.data.imageData }])
                    } else {
                        setCars([...cars, { ...cars[dataToUpdate.index][dataToUpdate.column[0]] = dataToUpdate.value }])
                    }
                    if (dataToUpdate.table === "car_details") {
                        setIsDetailUpdate(true);
                    }
                   
                    setCars([...cars])
                    setDataImageToUpdate("");
                    setModalToggle(false)
                    setDataToUpdate(null)
                    notifySuccess(response.data.message)
                } else {
                    notifyError("Erreur: impossible d'effectuer la modification")
                }
                
            })
        } else {
            notifyError("La valeur n'est pas correcte")
        }
    }


    useEffect(() => {
        if (filters !== "Tout") {
            setModalToggle(true)
        } else {
            setModalToggle(false)
            getCars()
        }
    }, [filters,getCars])
    

  
    return (
        <div style={{position:"relative"}}>
            <Loading isLoading={loading}/>
            <Toaster />
            <CarHandlerDetails carID={carID}
                setCarID={(value) => setCarID(value)}
                dataToUpdate={dataToUpdate}
                setDataToUpdate={(value) => setDataToUpdate(value)}
                newCarDetailsArray={[...newCarDetailsArray]}
                setNewCarDetailsArray={(value) => setNewCarDetailsArray(value)}
                isDetailUpdate={isDetailUpdate}
                setIsDetailUpdate={(value)=>setIsDetailUpdate(value)}
            />

            {(modalToggle && dataToUpdate === null && carTarget) ?
                <Modal type={"alert"} title={"Vous êtes sûr de vouloir supprimer cette voiture?"} onExit={() => {
                    setModalToggle(modalToggle)
                    setCarTarget(null)
                   
                }}
                    onClick={() => deleteCar(carTarget.id, carTarget.thumbnail)}
                    isModalOn={true}
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
                    <Modal
                        type={"input"}
                        title={"Modifier ce champ"}
                        buttonText={"Modifier"}
                        onExit={() => {
                            setModalToggle(false);
                            setDataToUpdate(null);
                            setDataImageToUpdate("");
                           
                        }}
                        onClick={() => {
                            updateCar()
                        }}
                        isModalOn={modalToggle}
                    >
                        <span><b>{dataToUpdate.column[1]}</b></span>

                        {dataToUpdate.type !== "file"  &&  dataToUpdate.type !== "select"
                            ?
                            <input className="modal_input" type={dataToUpdate.type} value={dataToUpdate.value}
                                onChange={(e) =>
                                    setDataToUpdate({
                                        ...dataToUpdate,
                                        value: dataToUpdate.type === "text" ? e.target.value : dataToUpdate.type === "number" && (e.target.value.match("e") || e.target.value < 0 ) ? "" : e.target.value 
                                    })} />
                            :
                            dataToUpdate.type === "select"
                                
                                ?
                                <select className="modal_input" name="details_carHandler" id="detail_carHandler" onChange={(e)=>setDataToUpdate({...dataToUpdate,value: e.target.value})}>
                                    {
                                    dataToUpdate.column[0] === "gearbox"
                                        ?
                                    <>
                                        <option value=""></option>
                                        <option value="Manuelle">Manuelle</option>
                                        <option value="Automatique">Automatique</option>
                                    </>
                                        : 
                                            dataToUpdate.column[0] === "energy"
                                                
                                        ?
                                    <>
                                    <option value=""></option>
                                    <option value="Essence">Essence</option>
                                    <option value="Gazole">Gazole</option>
                                    <option value="Électrique">Électrique</option>
                                    <option value="GPL">GPL</option>
                                    </>
                                        :
                                        null
                                            
                                    }
                                </select>

                                :
                                
                            <div className='container--center--column gap-20'>
                                {typeof (dataToUpdate.value) !== "object"
                                    ?
                                    <img src={"/images/uploads/" + dataToUpdate.value} alt="" width={200} height={130} style={{ objectFit: "contain", border: "1px solid black" }} />
                                    :
                                    <img src={URL.createObjectURL(dataToUpdate.value)} alt="" width={200} height={130} style={{ objectFit: "contain", border: "1px solid black" }} />
                                }
                                <label htmlFor="new_image_toModify" className='cta' style={{borderRadius:4}}>Choisi une image </label>
                            <input hidden type="file" name='file'id='new_image_toModify' accept='image/jpeg, image/png'
                                    onChange={(e) => setDataToUpdate({ ...dataToUpdate, value: e.target.files[0] })} />
                            </div>
                            
                             
                        }
                    </Modal>
                    :

                    null}
            {!carID &&
                <>
                    <PageTitle pageTitle={"Gestion vehicules"} />
                    <div className='container--pad-top'>
                        <div className='input_center_handler'>
                            <div className='container--center--column inputs_container_filters_inner '>
                                <label htmlFor="gestionFilterCars">Filtrer par</label>
                                <select type="text" id='gestionFilterCars' onChange={(e) => setFilters(e.target.value)}>
                                    <option value="Tout">Tout</option>
                                    <option value="Numero VO">Numero Vo</option>
                                    <option value="ID">ID</option>
                                    <option value="Brand">Brand</option>
                                    <option value="Model">Model</option>
                                </select>
                        {
                            filters !== "Tout" 
                                ?
                                <div className='container--center--column gap-20'>
                                    <input type="text"
                                        className='mar-top-20 '
                                        value={modalFilterValue}
                                        onChange={(e) => setmodalFilterValue(e.target.value)}
                                    />
                                    <button type='button'
                                        className='cta cta--red cta-small'
                                        onClick={modalFilterValue !== "" ? () => getCars() : null}>Filtrer</button>
                                </div>
                                :
                                null
                        }
                    </div> 

        </div>
                <div ref={table} className='table_handler' style={{overflowY:"hidden",margin:10,paddingTop:10}}>
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
                          <th>Details</th>
                          <th>Effacer</th>
                      </tr>
                  </thead>

                  <tbody>
                        {cars && cars.map((car, index) =>
                        <tr key={"carsHandler_" + car.id} style={{border:"none"}} >
                                <td className='no-event'>{car.id}</td>
                                <td onClick={() => setDataToUpdate({index,table:"cars",id:+car.id,column:["make","Brand"],value:car.make,type:"text"})}>{car.make}</td>
                                <td onClick={() => setDataToUpdate({index,table:"cars",id:car.id,column:["model","Model"],value:car.model,type:"text"})}>{car.model}</td>
                                <td onClick={() => {
                                    setDataToUpdate({ index, table: "cars", id: +car.id, column: ["thumbnail", "Photo principale"], value: car.thumbnail, type: "file" })
                                    setDataImageToUpdate(car.thumbnail)
                                }
                                }
                                >
                                <img src={"/images/uploads/" + car.thumbnail} alt="" width={30} height={30} style={{ objectFit: "cover" }} /></td>
                                <td onClick={() => setDataToUpdate({index,table:"cars",id:+car.id,column:["year","Année"],value:car.year,type:"number"})}>{car.year}</td>
                                <td onClick={() => setDataToUpdate({index,table:"cars",id:+car.id,column:["km","Kilometre"],value:car.km,type:"number"})}>{car.km}</td>
                                <td onClick={() => setDataToUpdate({index,table:"cars",id:+car.id,column:["price","Prix"],value:car.price,type:"number"})}>{car.price}</td>
                                <td onClick={() => setDataToUpdate({index,table:"cars",id:+car.id,column:["offer","Offre"],value:car.offer,type:"number"})}>{car.offer}</td>
                                <td onClick={() => setDataToUpdate({index,table:"car_details",id:+car.id,column:["vo_number","Numero VO"],value:car.vo_number,type:"number"})}>{car.vo_number}</td>
                                <td  className='no-event'>{car.created_at}</td>
                               
                                <td className='view_icon' onClick={() => {
                                    setCarID(+car.id)
                                }}></td>
                                <td className='no-event'> <span className='delete-icon' style={{ margin: "auto" }} onClick={() => {
                                    setCarTarget({id:+car.id,thumbnail:car.thumbnail, vo:car.vo_number, make:car.make, model:car.model})
                                }}></span>
                                </td>
                        </tr>
                        )}
                  </tbody>
                </table>
                    
                <div style={{position:"absolute",left:"50%",transform:"translateX(-50%)"}}>
                    <SwitchPageBlock currentPage={currentPage} setCurrentPage={(value) => setCurrentPage(value)} handleCarPage={() => { }} dataLength={carsCount } /> 
                </div> 
          </div>
     
                </div>
                </> 
        }
            
    </div>
  )
}

export default CarsHandler
