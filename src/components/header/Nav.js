import React from 'react'

<<<<<<< HEAD
import { NavLink} from 'react-router-dom'

const Nav = ({menuToggle,handleMenu}) => {
  
=======
import { NavLink } from 'react-router-dom'

const Nav = ({menuToggle,handleMenu}) => {
   
>>>>>>> contact
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
<<<<<<< HEAD
=======
    
>>>>>>> contact

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
            end
            onClick={handleMenu}      
        >
            {link.page}
        </NavLink>)}
        </div>
    </nav>
  )
}

export default Nav
