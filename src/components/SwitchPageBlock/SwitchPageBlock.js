import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const SwitchPageBlock = (props) => {
    const [dataLength, setDataLength] = useState();
    const [pages, setPages] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        ///fetch data , Count of cars 
        setDataLength(props.dataLength);
        const maxCarsforPage = 10;

        //if dataLength > maxCarsforPage set new array of pages and set pages ::  useState()
        if (dataLength > maxCarsforPage) {
            const pagesLength = Math.floor(dataLength / maxCarsforPage); 
            let pagesArray = [];
        
            for (let i = 0; i <= pagesLength; i++) {
                pagesArray[i] = i + 1;
            }
                setPages([...pagesArray])
        } else {
            setPages([1])
        }


    }, [props.dataLength, dataLength])
    
    useEffect(() => {
        props.handleCarPage(currentPage)
    },[currentPage])
    
    

  return (
        <div className={'switch_page_block'}>
           <Link onClick={currentPage > 1 ? () => setCurrentPage(prev => (prev - 1)) : ""}  style={pages[0] === currentPage ? {opacity:"0.2"} : {}} className={"switch_page_block_arrow switch_page_block_arrow--left "}></Link>
            <div  className={'switch_page_block_numbers'}>
              {pages.map((page, index) => <Link key={"page_" + index} className={"page_number"} to={""} style={page === currentPage ? { textDecoration: "underline" } : {}} onClick={() => setCurrentPage(page)}>{page}</Link>)}
            </div>
            <Link onClick={currentPage < pages.length ? () => setCurrentPage(prev => (prev + 1) ) : ""} style={pages[pages.length - 1] === currentPage ? {opacity:"0.2"} : {}} className={"switch_page_block_arrow switch_page_block_arrow--right"}></Link>
        </div>
  )
}

export default SwitchPageBlock
