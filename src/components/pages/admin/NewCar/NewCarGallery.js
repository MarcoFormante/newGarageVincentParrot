import React, { useEffect, useState } from 'react'

const NewCarGallery = ({formValues,setFormValues}) => {
    const [gallery, setGallery] = useState([])
   
  
    function handleGallery(e) {  
    setGallery([...gallery, ...e.target.files]) 
}
        

  function deleteImg(img) {
      setGallery(gallery.filter(image => image !== img))
  }
  
  useEffect(() => {
    setFormValues({...formValues,gallery:[...gallery]})
  },[gallery])

  return (
    <>
        <div className='new_car_gallery'>
            {gallery?.map((img, index) => <div key={"gallery_img_" + index + img.name} className='new_car_gallery_img_container'>
              <img src={URL.createObjectURL(img)} alt="" />
              <div className='delete-icon ' style={{display:"block",margin:"auto"}} onClick={() => deleteImg(img)}></div>
            </div>)}
        </div>
            <div>
                <label htmlFor='galleryfileInput'> <span>Ajouter des images <span className='required'>*</span></span><span className='add_icon'></span></label>
                <input type="file" required hidden name="carGalleryImage" id="galleryfileInput" multiple accept='image/jpeg, image/png' onChange={(e)=> handleGallery(e)}/>
            </div>
    </>
  )
}

export default NewCarGallery
