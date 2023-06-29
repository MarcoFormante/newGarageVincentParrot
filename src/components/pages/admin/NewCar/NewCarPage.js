import React, { useEffect, useState } from 'react'
import PageTitle from '../../../PageTitle/PageTitle'
import FormElement from '../../../FormElement/FormElement'
import DetailsInputs from './DetailsInputs'
import EquipmentsInputs from './EquipmentsInputs'
import NewCarGallery from './NewCarGallery'




const NewCarPage = () => {
  const [thumb, setThumb] = useState(null);
  const [formValues, setFormValues] = useState({ detailValues: {}, equipmentValues:[],thumbnail:{}, gallery:[]})
  console.log(thumb);
  console.log(formValues);
  

  useEffect(() => {
    setFormValues({...formValues,thumbnail:thumb})
  }, [thumb])
  
  
  return (
    <div>
        <PageTitle pageTitle={"Nouveau véhicule"} />
            <form className='form' encType={'multipart/form-data'} >
                
                    <div className='new_car inputs_container'>
                    {/* car img-thumb  */}
                    <div className='new_car_img-thumb '>
                      <FormElement
                        label={{ for: "img-thumb", text: "Choisir la photo principal"}} 
                        input={{ type: "file", required: true, accept: "image/jpeg , image/png", name: "img-thumb", id: "img-thumb" , onChange:(e)=> setThumb(e.target.files[0])}}
                        required={true}
                      />
                    </div>
                    <div className='new_car_img-thumb_display'>
                      <img style={{objectFit:"cover",margin:"auto"}} src={thumb && URL.createObjectURL(thumb)} width={300} height={300} alt='' />
                    </div>
                  {/* car details */}
                    <div className='new_car_details container--pad-top inputs_container'>
                        <span className='new_car_details_title'>Détails du vehicule</span>
                        <div className='row_inputs_container inputs_container' >
                          <DetailsInputs formValues={formValues} setFormValues={(values)=>setFormValues({...formValues,...values})}/>
                        </div>
                    </div>
          
                    {/* car equipments */}
                    <div className={'new_car_details container--pad-top inputs_container'}>
                        <span className={'new_car_details_title new_car_details_title--black'}>Equipements</span>
                        <div className={"new_car_equip_list inputs_container"} >
                          <EquipmentsInputs formValues={formValues} setFormValues={(values) => setFormValues({ ...formValues, ...values })} />
                        </div>
                    </div>
          
                    {/* car gallery */}
                    <div className={'new_car_details container--pad-top inputs_container'}>
                    <span className={'new_car_details_title'}>Gallerie images</span>
                      <NewCarGallery formValues={formValues} setFormValues={(values) => setFormValues({ ...formValues, ...values })}/>
                  </div>
          
                  </div>
                  <input className={"cta cta--red mar-bot-20"} type="submit" value="Envois"/>
            </form>

    </div>
  )
}

export default NewCarPage
