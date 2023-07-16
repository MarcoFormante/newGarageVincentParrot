import React from 'react'
import { Link } from 'react-router-dom'

const ButtonCta = ({ state,type,inner,to,...rest}) => {
    
    if (type === "button") {
        return (
                <button {...rest}>{inner}</button>
        )
    } else if(type ==="link"){
      return (
        <button {...rest}><Link className='container--center--row' style={{width:"100%"}} to={to} state={{...state}} >{inner}</Link></button>
      )
    } else if (type === "carCard") {
      return (
        <Link  {...rest} to={to} state={{...state}} >{inner}</Link>
      )
    }
 
}

export default ButtonCta
