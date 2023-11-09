import React, { useEffect,useMemo,useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggle } from '../Reducers/MenuToggleReducer'
import CheckToken from '../../helpers/CheckToken'
import NotAuth from '../../helpers/NotAuth'


const AdminNav = ({ checkToken }) => {
    const roleInStore = useSelector(state => state.role.value)
    const [role,setRole] = useState((""))
    const [adminNavToggle, setAdminNavToggle] = useState(false)
    const dispatch = useDispatch()
    
  
console.log(roleInStore);
    useEffect(() => {
        window.addEventListener("storage", () => {
            
            if (sessionStorage.getItem("token") || sessionStorage.getItem("role") === "admin"|"employee") {
                sessionStorage.getItem("token")
                    ? CheckToken(sessionStorage.getItem("token")).then(res => setRole(res.data.role))
                    : NotAuth()
            } else {
                NotAuth()
            }
            console.log("ciao");
        })

        return ()=>  window.addEventListener("storage", () => {
            
            if (sessionStorage.getItem("token") || sessionStorage.getItem("role") === "admin"|"employee") {
                sessionStorage.getItem("token")
                    ? CheckToken(sessionStorage.getItem("token")).then(res => setRole(res.data.role))
                    : NotAuth()
            } else {
                NotAuth()
            }
            console.log("ciao");
        })

     
    }, [])
    
    useEffect(() => {
        if (roleInStore === "admin"|"employee" || (sessionStorage.getItem("token") || sessionStorage.getItem("role") === "admin"|"employee" )) {
            if (sessionStorage.getItem("token") || sessionStorage.getItem("role") === "admin" | "employee") {
                sessionStorage.getItem("token")
                ? CheckToken(sessionStorage.getItem("token")).then(res => setRole(res.data.role))
                : NotAuth()
            } else {
                NotAuth()
            }
        } else {
            NotAuth()
        }
    }, [roleInStore])
    

    
    const adminLinks = useMemo( () => [
        {
            to: "admin/new-car",
            linkName : "Nouveau véhicule"
        },
        {
            to: "admin/carsHandler",
            linkName : "Gestion vehicules"
        },
        {
            to: "admin/services",
            linkName : "Services"
        },
        {
            to: "admin/accounts",
            linkName : "Gestion Accounts"
        },
        {
            to: "admin/reviews",
            linkName : "Gestion Avis"
        },
        {
            to: "admin/timeTable",
            linkName : "Horaires"
        },],[])
    
    const employeeLinks = useMemo(()=>[
        {
            to: "admin/new-car",
            linkName : "Nouveau véhicule"
        },
        {
            to: "admin/reviews",
            linkName : "Gestion Avis"
        },
        
    ],[])


    useEffect(() => {
        window.addEventListener("resize",()=> {
            if (window.innerWidth > 769) {
               if (adminNavToggle) {
                    setAdminNavToggle(false)
               }
            }
        })

        return window.removeEventListener("resize", () => {
            if (window.innerWidth > 769) {
                if (adminNavToggle) {
                     setAdminNavToggle(false)
                }
             }
        })
    },[adminNavToggle])

    useEffect(() => {
        if (window.innerWidth < 769) {
            if (adminNavToggle === true) {
                document.body.style.overflowY = adminNavToggle ? "hidden" : ""
                dispatch(toggle(true))
            } else {
                document.body.style.overflowY = adminNavToggle ? "hidden" : ""
                dispatch(toggle(false))
            }
        }
},[adminNavToggle,dispatch])
    
   
    return (

       role && sessionStorage.getItem("token")
            ? 
            <div style={{display:"unset"}}>
                <nav className={`admin_nav ${adminNavToggle ? "admin_nav--active" : ""}`}>
                    
                {role && role === "admin"
                        ? adminLinks.map((link, index) =>
                            <NavLink onClick={() => {
                                checkToken()
                                setAdminNavToggle(false)
                            }} end className={`nav_link `} to={link.to}
                                key={link.linkName + "_" + index}>
                                {link.linkName}
                            </NavLink>
                        )   

                : role && role === "employee"
                            ? employeeLinks.map((link, index) =>
                                <NavLink onClick={() => {
                                checkToken()
                                setAdminNavToggle(false)
                            }} end
                                className={`nav_link`}
                                to={link.to}
                                key={link.linkName + "_" + index}>
                                {link.linkName}
                            </NavLink>
                        )
                            : " "}
                    
                </nav>
                <div className={`admin_nav_toggle ${adminNavToggle ? "admin_nav_toggle--active" : ""}`}
                    onClick={() => setAdminNavToggle(!adminNavToggle)}>
                </div>
            </div>
            : ""
        
        
      
  )
}

export default AdminNav


