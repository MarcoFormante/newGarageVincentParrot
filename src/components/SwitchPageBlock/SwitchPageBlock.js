import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SwitchPageBlock = (props) => {
    const [dataLength, setDataLength] = useState();
    const [pages, setPages] = useState([])
    // const [currentPage, setCurrentPage] = useState(props.currentPage);

    useEffect(() => {
        ///fetch data , Count of cars 
        setDataLength(props.dataLength);
        const maxCarsforPage = 12;

        //if dataLength > maxCarsforPage set new array of pages and set pages ::  useState()
        if (dataLength > maxCarsforPage) {
            const pagesLength = Math.floor(dataLength / maxCarsforPage); 
            let pagesArray = [];
            for (let i = 0; i <= pagesLength ; i++) {
                pagesArray[i] = i ;
            }
                setPages([...pagesArray])
        } else {
            setPages([0])
        }
    }, [props.dataLength, dataLength])
    
    
    useEffect(() => {
        props.handleCarPage(props.currentPage);
        window.scrollTo({
            top: 0,
            left:0,
            behavior:"smooth"
        })
    }, [props.currentPage])
    

    

  return (
      <div className={'switch_page_block'}>
           <Link onClick={props.currentPage > 0 ? () => props.setCurrentPage(prev => (prev - 1)) : ""}  style={pages[0] === props.currentPage ? {opacity:"0.2"} : {}} className={"switch_page_block_arrow switch_page_block_arrow--left "}></Link>
            <div  className={'switch_page_block_numbers'}>
              {pages.map((page, index) => <Link key={"page_" + index} className={"page_number"} to={""} style={page === props.currentPage ? { textDecoration: "underline" } : {}} onClick={() => props.setCurrentPage(page)}>{page}</Link>)}
            </div>
            <Link onClick={props.currentPage < pages.length - 1 ? () => props.setCurrentPage(prev => (prev + 1) ) : ""} style={pages[pages.length - 1] === props.currentPage ? {opacity:"0.2"} : {}} className={"switch_page_block_arrow switch_page_block_arrow--right"}></Link>
        </div>
  )
}

export default SwitchPageBlock
