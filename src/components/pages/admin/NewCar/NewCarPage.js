import React, { useCallback, useEffect, useState } from 'react'
import PageTitle from '../../../PageTitle/PageTitle'
import FormElement from '../../../FormElement/FormElement'
import DetailsInputs from './DetailsInputs'
import EquipmentsInputs from './EquipmentsInputs'
import NewCarGallery from './NewCarGallery'
import axios from '../../../../api/axios'
import Resizer from "react-image-file-resizer";




const NewCarPage = () => {
  const [thumb, setThumb] = useState(null);

  const [resizedGallery,setResizedGallery] = useState([])
  const [formValues, setFormValues] = useState({ detailValues: {}, equipmentValues:[],thumbnail:{}, gallery:[]})
 

  useEffect(() => {
    setFormValues({...formValues,thumbnail:thumb})
  }, [thumb])

  async function handleSubmit(e) {

    e.preventDefault();
    let formIsValid = false;
    let thumbnailIsValid = false;
    let galleryIsValid = false;
    let detailsAreValids = false;

    if (thumb) {
      thumbnailIsValid = true;
    }
    
    if (formValues.gallery[0]) {
        galleryIsValid = true;
    } 

    let detailsCheck = [];
    for (const key in formValues.detailValues) {
      if (formValues.detailValues[key] === "") {
          detailsCheck.push("");
      } else {
        detailsCheck.push("valid");
      }
    }

    if (detailsCheck.every(d => d === "valid")) {
      detailsAreValids = true;
    }

    formIsValid = detailsAreValids && thumbnailIsValid && galleryIsValid;

    if (formIsValid) {
      console.log("form is valid");
    } else {
      console.log("not valid");
    }

    const resizedThumbnail = await resizeThumb(thumb);
    const resizedGallery = await resizeGalleryImages(formValues.gallery);



    // if (resizedGallery && resizedThumbnail) {
    
    // }
    // const formData = new FormData();
    // formData.append("thumbnail",resizedThumbnail)
    // axios.post(process.env.REACT_APP_HTTP + "pages/admin/carHandler.php")
  }


  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      600,
      400,
      "JPEG",
        75,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      600,
      400
    );
  });

  const resizeThumb = async (file) => {
    try {
      const image = await resizeFile(file)
      return await image
    } catch (error) {
      console.log(error);
      return
    }
  } 
    
  

  const resizeGalleryImages = async (images) => {
    let a = [];
    try {
      for (let i = 0; i < images.length; i++) {
        a.push(await resizeFile(images[i]));
      }
      return  a
    } catch (error) {
      console.log(error);
      return
    }
   
  } 
  


  
  
  
  return (
    <div>    
        <PageTitle pageTitle={"Nouveau véhicule"} />
            <form className='form' encType={'multipart/form-data'} onSubmit={handleSubmit} >
              {resizedGallery && resizedGallery.map(img => <img src={img} alt=''></img>)}
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
                  <input className={"cta cta--red mar-bot-20"} type="submit" onClick={handleSubmit} value="Envois"/>
            </form>

    </div>
  )
}

export default NewCarPage
