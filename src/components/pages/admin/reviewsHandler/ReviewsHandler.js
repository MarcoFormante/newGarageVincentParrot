import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import { AvisCard } from '../../Home/AvisSection'
import toast, { Toaster } from 'react-hot-toast';

const ReviewsHandler = () => {
    const [avis,setAvis]=useState([])
    const [filters, setFilters] = useState("");
    const [filterName, setFilterName] = useState("");
    const [filterReview, setFilterReview] = useState(5);
  


    const notifySuccess = (text) => toast.success(text);
    const notifyError = (text) => toast.error(text);

    const filterPrenom = (
        <>
            <label htmlFor="gestionReviewNameFilter">Filtrer par prènom</label>
            <input type="text" value={filterName}  onChange={(e)=> setFilterName(e.target.value)} id='gestionReviewNameFilter' />
        </>
    );
    
    const filterNote =(
        <>
            <label htmlFor="gestionReviewAvisFilter">Filtrer par Note</label>
            <select type="text"  id='gestionReviewAvisFilter' value={filterReview} onChange={(e)=> setFilterReview(+e.target.value)}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
            </select>
        </>
    )
    
  

    useEffect(() => {
        const homepagePath = process.env.REACT_APP_HTTP + "pages/homePage.php?reviews=true";
            axios.get(homepagePath)
            .then(response => {
                let reviews = [];
                response.data.reviews.forEach((review,index)=> {
                        reviews.push(response.data.reviews[index])
                });
                setAvis([...reviews])
            })
    }, [])

   
    useEffect(() => {
        setFilterName("");
        setFilterReview(5)
    }, [filters])

    
    
    function toggleReviewValidation(avisId, av) {
        let newValidationNumber = +!av.is_validate;
        const formData = new FormData();
        formData.append("reviewValidationValue", newValidationNumber);
        formData.append("reviewValidationId", avisId);
        axios.post(process.env.REACT_APP_HTTP + "pages/admin/reviewHandler.php", formData, {

            headers: {
                    "Content-Type": "application/www-x-urlencodeform"
            }
        }
        ).then(response => {
            if (response.status === 200 && response.data.status === 1) {
                setAvis([...avis], av.is_validate = av.is_validate === 0 ? 1 : 0);
                notifySuccess("Modifié avec succès");
            } else {
                notifyError("Un erreur est survenu, rententez.")
            }
        })
      
    }
    

    return (
      
        <div>
             <Toaster />
            <PageTitle pageTitle={"Gestion des avis "} />
           
            <div className='container--pad-top ' >
                <div className='mar-top-20 mar-bot-50'>
                    <p className='text-center'>Dans cette page vous pouvez <span className='c-red text-bold'>Moderer</span> ou <span className='c-green text-bold'>Valider</span> les Avis</p>
                </div>
                <div className='sticky_element'>
                    <div className='container--center--column inputs_container_filters_inner '>
                        <label htmlFor="gestionReviewFilters">Filtrer par</label>
                        <select type="text" id='gestionReviewFilters' onChange={(e)=> setFilters(e.target.value)}>
                            <option value=""></option>
                            <option value="prenom">Prènom</option>
                            <option value="review">Note</option>
                            <option value="validate">A' valider</option>
                        </select>
                    </div>      
                
                    <div className='inputs_container_filters_inner'>
                        <div className='mar-top-20 container--center--column '>{filters === "prenom" ? filterPrenom : filters === "review" ? filterNote : ""}</div>
                    </div>
                </div>
            </div>
                
            <div className='list-flex-wrap container--pad-bottom gap-50' style={{padding:50}}>
                {!filters
                    ?
                    avis.map((av, index) => <div> <div style={av.is_validate ? {backgroundColor:"red",color:"white"} : {backgroundColor:"lightgreen",color:"black"}} onClick={()=>toggleReviewValidation(av.id,av)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div>)
                    :
                    filters === "prenom" 
                        ?
                        avis.map((av, index) => { return av.name.toLowerCase().includes(filterName.toLowerCase()) && <div> <div style={av.is_validate ? {backgroundColor:"red",color:"white"} : {backgroundColor:"lightgreen",color:"black"}} onClick={()=>toggleReviewValidation(av.id,av)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div>})
                        :
                        filters === "review" 
                            ?
                            avis.map((av, index) => { return av.review === filterReview && <div> <div style={av.is_validate ? {backgroundColor:"red",color:"white"} : {backgroundColor:"lightgreen",color:"black"}} onClick={()=>toggleReviewValidation(av.id,av)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div>})
                            :
                            filters === "validate" 
                            ?
                            avis.map((av, index) => { return av.is_validate === 0 &&<div> <div style={av.is_validate ? {backgroundColor:"red",color:"white"} : {backgroundColor:"lightgreen",color:"black"}} onClick={()=>toggleReviewValidation(av.id,av)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div>    })
                            :
                            "" 
                }
            </div>
    </div>
     
  )
}

export default ReviewsHandler
