import React from 'react'

import { Link, useLocation} from 'react-router-dom'

const Nav = ({menuToggle,handleMenu}) => {
    const location = useLocation();
   //public Routes (all users)
    const publicRoutes = [{
            page: "Acceuil",
            path: "/"
        },
        {
            page: "Parc auto",
            path: "/Parc-auto"
        },
        {
                page: "Contact",
                path: "/Contact"
        },
        {
                page: "Area Reservé",
                path: "/Area-Reserve"
        },
    ]
    //check if link Name is equal to location.pathname
    let isActive = (path) => location.pathname === path ? " nav_link--active" : "";

    //check if Menu is Open (menuToggle active) then play transition(sass)
    let menuisOpen = menuToggle ? " nav--open" :"";

  return (
      <nav className={'nav' + menuisOpen }>
          <div className='nav_container'>
            {publicRoutes.map((route, index) =>
        
        <Link 
            className={`nav_link${isActive(route.path)}`}
            key={index + new Date().getMilliseconds()}
            to={route.path}
            onClick={handleMenu}      
        >
            {route.page}
        </Link>)}
        </div>
    </nav>
  )
}

export default Nav
