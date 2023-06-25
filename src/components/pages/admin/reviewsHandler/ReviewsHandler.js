import React, { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import PageTitle from '../../../PageTitle/PageTitle'
import { AvisCard } from '../../Home/AvisSection'


const ReviewsHandler = () => {
    const [avis,setAvis]=useState([])
    const [filters, setFilters] = useState("");
    const [filterName, setFilterName] = useState("");
    const [filterReview, setFilterReview] = useState(5);
    console.log(filterReview);

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
                    console.log(response.data.reviews);
                    
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
    
    function toggleReviewValidation(avisId,av) {
        let newValidationNumber = +!av.is_validate;
        const formData = new FormData();
        formData.append("reviewValidationNumber", newValidationNumber);
        axios.post(process.env.REACT_APP_HTTP + "pages/admin/reviewHandler.php", formData, {
            headers: {
                    "Content-Type": "application/www-x-urlencodeform"
            }
        })
            .then(response => {
                setAvis([...avis], av.is_validate = av.is_validate === 0 ? 1 : 0)
                console.log(response.data);
            })
      
    }
    
    
// setAvis([...avis],av.is_validate = av.is_validate === 0 ? 1 : 0

    return (
      
    <div>
            <PageTitle pageTitle={"Gestion des avis "} />

        <div className='container--pad-top ' >
        <div className='container--center--column inputs_container_filters_inner '>
            <label htmlFor="gestionReviewFilters">Filtrer par</label>
            <select type="text" id='gestionReviewFilters' onChange={(e)=> setFilters(e.target.value)}>
                <option value=""></option>
                <option value="prenom">Prènom</option>
                <option value="review">Note</option>
                <option value="validate">A' valider</option>
            </select>
        </div>      
        </div>
            
            <div className='inputs_container_filters_inner'>
                <div className='mar-top-20 container--center--column '>{filters === "prenom" ? filterPrenom : filters === "review" ? filterNote :""}</div>
            </div>
            <div className='list-flex-wrap container--pad-bottom gap-20' style={{padding:50}}>
                {!filters
                    ?
                    avis.map((av, index) => <div> <div onClick={()=>toggleReviewValidation(av.id,av)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div>)
                    :
                    filters === "prenom" 
                        ?
                        avis.map((av, index) => { return av.name.includes(filterName) && <div> <div onClick={()=>setAvis([...avis],av.is_validate = av.is_validate === 0 ? 1 : 0)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div> })
                        :
                        filters === "review" 
                            ?
                            avis.map((av, index) => { return av.review === filterReview && <div> <div onClick={()=>setAvis([...avis],av.is_validate = av.is_validate === 0 ? 1 : 0)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div> })
                            :
                            filters === "validate" 
                            ?
                            avis.map((av, index) => { return av.is_validate === 0 && <div> <div onClick={()=>setAvis([...avis],av.is_validate = av.is_validate === 0 ? 1 : 0)} className='reviewValidatorSwitch'>{av.is_validate ? "Moderer" : "Valider"} </div> <AvisCard key={"avis_" + index + "_card"} name={av.name} message={av.message} review={av.review} style={av.is_validate === 1 ? {border: "2px solid lightgreen" } : { border: "2px solid red" }} /> </div> })
                            :
                            "" 
                }
            </div>
    </div>
     
  )
}

export default ReviewsHandler
