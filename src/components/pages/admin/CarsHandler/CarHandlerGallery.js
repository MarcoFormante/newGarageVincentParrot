import React, { useEffect, useState } from 'react'
import Modal from '../../../Modal/Modal'
import axios from '../../../../api/axios'
import toast, { Toaster } from 'react-hot-toast'
import Resizer from "react-image-file-resizer"
import Loading from '../../../Loading/Loading'

const CarHandlerGallery = ({carID}) => {
    const [gallery, setGallery] = useState([])
    const [newGallery,setNewGallery] = useState([])
    const [modalToggle, setModalToggle] = useState(false)
    const [loading, setLoading] = useState(false);
    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);
    
    console.log(gallery);
    console.log(newGallery);
    useEffect(() => {
       
        if (carID) {
            setLoading(true)
            const path = "pages/carDetails.php?carImages=true&id=" + carID
            axios.get(path)
            .then(response => { 
                    setGallery([...response.data])
                   
            }).catch(error => {
                notifyError("Erreur: Impossible recuperer les images (Gallerie)")

            }).finally(error => {
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
        } else {
            setGallery([])
            setNewGallery([])
        }
    },[carID])
    
    function deleteImg(img) {
        setNewGallery(newGallery.filter(image => image !== img))
    }

    


   
    function deleteImage(imgID,carid, imgPath) {
        if (gallery.length > 1) {
            const path = `pages/admin/carHandler.php?car_id=${carid}&carImage=${imgPath}`
             axios.delete(path)
                 .then(response => {
                     console.log(response.data);
                    notifySuccess("Image supprimè avec succès");
                    setGallery(gallery.filter(image => parseInt(image.id) !== +imgID))
            })
        } else {
            notifyError("La gallerie de photo de la voiture doit avoir aumoins une photo")
        }
    }


    useEffect(() => {
        if (newGallery) {
            newGallery.forEach(img => {
                if (img.size > 8194701) {
                    notifyError("Attention: Les images doivent etre de maximum 8MB") 
                    newGallery.pop()
                    setGallery([...newGallery])
                }
            });
        }
    },[newGallery])


    async function addNewImages() {
         setLoading(true)
        if (newGallery.length > 0) {
           
            const path = "pages/admin/carHandler.php"
            const formData = new FormData()
            const resizedGallery = await resizeGalleryImages(newGallery);

            if (resizedGallery) {
                resizedGallery.forEach((img) => {
                    formData.append("gallerie[]",img)
                })
                console.log(resizedGallery);
                formData.append("car_id",+carID)
                axios.post(path, formData, {
                headers: {
                    "Content-Type":"application/x-www-form-urlencoded"
                }
            }).then(response => {
                if (response.data.status === 1) {
                    console.log(response.data);
                    response.data.imagePaths.forEach(path => {
                        gallery.push({ id: +carID, path: path })
                       
                    });
                    setGallery([...gallery])
                    setNewGallery([])
                }
                
            }).finally(setLoading(false))
        }
        }   
    }

   


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
          <Loading isLoading={loading}/>
          <Toaster/>
              <h3 className={'section_title section_title_offres'}>{"Gallerie Photo"}</h3>
                <div className='new_car_gallery car_gallery'>
                {gallery && 
                    gallery.map((img, index) => <div key={"gallery_img_" + index } className='new_car_gallery_img_container'>
                    <img src={"/images/uploads/"+img.path} alt="" />
                    <div className='delete-icon ' style={{display:"block",margin:"auto"}} onClick={() => deleteImage(+img.id,+carID,img.path)}></div>
                    </div>)
                  }
                </div>
              {modalToggle && <Modal title={"Vous etes sur de vouloir effacer cette photo?"} type={"alert"} onExit={() => {
                  setModalToggle(false)
                 
              }} />}
          <hr />
          <h3 className={'section_title section_title_offres'}>{"Ajoutez des nouvelles photos"}</h3>
          <div hidden={loading} className='new_car_gallery car_gallery'>
                {
                    newGallery?.map((img, index) => <div key={"gallery_img_" + index + img.name}
                    className='new_car_gallery_img_container'>
                    <img src={URL.createObjectURL(img)} alt="" />
                    <div className='delete-icon ' style={{display:"block",margin:"auto"}} onClick={() => deleteImg(img)}></div>
                    </div>)
                }
                 
          </div>
            <div className='container--center--column' style={{paddingBottom:50}}>
                <div className='pad-bot-20'>
                    <label htmlFor='galleryfileInput'> <span>Ajouter des images </span><span className='add_icon'></span></label>
                  <input type="file" required hidden name="carGalleryImage" id="galleryfileInput" multiple accept='image/jpeg, image/png' onChange={(e) => {
                      setNewGallery([...newGallery, ...e.target.files])
                  }} />
                </div>
                {newGallery.length > 0 && <div className='mar-auto pad-top-20 pad-bot-20'>
                    <button hidden={loading} className='cta cta--red ' onClick={()=> addNewImages()}>Ajouter</button>
                </div>}
            </div>
    </div>
  )
}

export default CarHandlerGallery
