import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { remove } from '../Reducers/RoleReducer'

const Nav = ({menuToggle,handleMenu,setMenuToggle}) => {
    const role = useSelector((state) => state.role.value)
    const dispatch = useDispatch()
    
    const logout = () => {
        window.localStorage.removeItem("token");
        dispatch(remove())
        setMenuToggle()
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

    useEffect(() => {
        if (menuToggle) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = ""
        }
    },[menuToggle])

    


  return (
      <nav className={`nav ${menuToggle ? "nav--open" : ""}`}>
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
