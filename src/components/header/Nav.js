import React from 'react'

import { NavLink } from 'react-router-dom'

const Nav = ({menuToggle,handleMenu}) => {
   
   //public Routes (all users)
    const publicLinks = [{
            page: "Acceuil",
            path: "/"
        },
        {
            page: "Parc auto",
            path: "/parc-auto"
        },
        {
                page: "Contact",
                path: "/contact"
        },
        {
                page: "Area Reservé",
                path: "/area-reserve"
        },
    ]
    

    //check if Menu is Open (menuToggle active) then play transition(sass)
    let menuisOpen = menuToggle ? " nav--open" :"";

  return (
      <nav className={'nav' + menuisOpen }>
          <div className='nav_container'>
            {publicLinks.map((link, index) =>
        
        <NavLink 
            className={`nav_link`}
            key={index + new Date().getMilliseconds()}
            to={link.path}
            onClick={handleMenu}      
        >
            {link.page}
        </NavLink>)}
        </div>
    </nav>
  )
}

export default Nav
