import React, { useState } from 'react'

const NewCarGallery = () => {
    const [gallery, setGallery] = useState([])
   
    function handleGallery(e) {  
    setGallery([...gallery, ...e.target.files]) 
}
        
    
    
    function deleteImg(img) {
        setGallery(gallery.filter(image => image !== img))
    }

  return (
    <>
        <div className='new_car_gallery'>
            {gallery?.map((img, index) => <div key={"gallery_img_" + index + img.name} className='new_car_gallery_img_container'>
              <img src={URL.createObjectURL(img)} alt="" />
              <div className='delete_icon' onClick={() => deleteImg(img)}></div>
            </div>)}
        </div>
            <div>
                <label htmlFor='galleryfileInput'> Ajouter des images <span className='add_icon'></span></label>
                <input type="file" hidden name="carGalleryImage" id="galleryfileInput" multiple accept='image/jpeg, image/png' onChange={(e)=> handleGallery(e)}/>
            </div>
    </>
  )
}

export default NewCarGallery
