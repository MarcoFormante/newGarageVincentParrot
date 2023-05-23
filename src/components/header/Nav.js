import React from 'react'

import { Link, useLocation} from 'react-router-dom'

const Nav = ({menuToggle,handleMenu}) => {
    const location = useLocation();
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
    //check if link Name is equal to location.pathname
    let isActive = (path) => location.pathname === path ? " nav_link--active" : "";

    //check if Menu is Open (menuToggle active) then play transition(sass)
    let menuisOpen = menuToggle ? " nav--open" :"";

  return (
      <nav className={'nav' + menuisOpen }>
          <div className='nav_container'>
            {publicLinks.map((link, index) =>
        
        <Link 
            className={`nav_link${isActive(link.path)}`}
            key={index + new Date().getMilliseconds()}
            to={link.path}
            onClick={handleMenu}      
        >
            {link.page}
        </Link>)}
        </div>
    </nav>
  )
}

export default Nav
