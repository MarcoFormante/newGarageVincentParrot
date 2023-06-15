import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../Reducers/RoleReducer'

const Nav = ({menuToggle,handleMenu}) => {
    const role = useSelector((state) => state.role.value)
    const dispatch = useDispatch()

    const logout = () => {
        window.localStorage.removeItem("token");
        dispatch(remove())
    }

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
    ]

    //check if Menu is Open (menuToggle active) then play transition(sass)
    let menuisOpen = menuToggle ? " nav--open" :"";

  return (
      <nav className={'nav' + menuisOpen }>
          <div className='nav_container'>
              {/**dynamic NavLinks */}
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

              {/**static NavLink , changes when admin is logged */}

              {
                  !role 
                      ?
                        <NavLink 
                            className={`nav_link`}
                            to={"/area-reserve"}
                            end
                            onClick={handleMenu}    
                            >
                            {"Area Reservé"}
                        </NavLink>
                      
                      :
                        <NavLink 
                        className={`nav_link nav_link_logout`}
                        onClick={logout}      
                        >
                        {"Logout"}
                    </NavLink>
                      
        }      
        
        </div>
    </nav>
  )
}

export default Nav
