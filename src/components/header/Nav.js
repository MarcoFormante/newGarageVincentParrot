import React, { useEffect, useLayoutEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector,useDispatch} from 'react-redux'
import { remove } from '../Reducers/RoleReducer'



const Nav = ({menuToggle,handleMenu,setMenuToggle}) => {

    
  const role = window.sessionStorage.getItem("role")
   const dispatch = useDispatch()
  
    
    const logout = () => {
       
        dispatch(remove())
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("role");
        setMenuToggle(false)
        
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

   
 //resize event : check if menu is open when screen width > 768 and setMenuToggle to False
    useEffect(() => {
        window.addEventListener("resize",()=> {
            if (window.innerWidth > 768) {
               if (menuToggle) {
                    setMenuToggle(false)
               }
            }
        })

        return window.removeEventListener("resize", () => {
            if (window.innerWidth > 768) {
                if (menuToggle) {
                    setMenuToggle(false)
                }
             }
        })
    }, [menuToggle, setMenuToggle])
    

useEffect(() => {
        if (window.innerWidth < 769) {
            if (menuToggle === true) {
                document.body.style.overflowY = menuToggle ? "hidden" : ""
            } else {
                document.body.style.overflowY = menuToggle ? "hidden" : ""
            }
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
                            {"Espace Reservé"}
                        </NavLink>
                      
                      :
                        <NavLink 
                        className={`nav_link nav_link_logout`}
                        onClick={()=> logout()}      
                        >
                        {"Logout"}
                    </NavLink>
                      
        }      
        
        </div>
    </nav>
  )
}

export default Nav
