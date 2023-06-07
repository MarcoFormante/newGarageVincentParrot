import React, { useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AdminNav = () => {
 const role = useSelector((state) => state.role.value)
    const adminLinks = [
        {
            to: "admin/new-car",
            linkName : "Nouveau véhicule"
        },
        {
            to: "admin/modify-car",
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
            to: "admin/feedback",
            linkName : "Gestion Avis"
        },
        {
            to: "admin/time-table",
            linkName : "Horaires"
        }, ]
    const employeeLinks = [
        {
            to: "admin/new-car",
            linkName : "Nouveau véhicule"
        },
        {
            to: "admin/feedback",
            linkName : "Gestion Avis"
        },
        

    ]

    return (

       role
            ? 
            <div>
                <nav className='admin_nav'>
                {role && role === "admin"
                ? adminLinks.map((link, index) => <NavLink  end className={`nav_link `} to={link.to} key={link.linkName + "_" + index}>{link.linkName}</NavLink>)
                : role && role === "employee"
                        ? employeeLinks.map((link, index) => <NavLink  end className={`nav_link`} to={link.to} key={link.linkName + "_" + index}>{link.linkName}</NavLink>)
                            : " "}
                    
                </nav>
            </div>
            : ""
        
        
      
  )
}

export default AdminNav


{/* <div>
{
 <nav className='admin_nav'>
 {role && role === "admin"
    ? adminLinks.map((link, index) => <NavLink  end className={`nav_link `} to={link.to} key={link.linkName + "_" + index}>{link.linkName}</NavLink>)
      : role && role === "employee"
            ? employeeLinks.map((link, index) => <NavLink  end className={`nav_link`} to={link.to} key={link.linkName + "_" + index}>{link.linkName}</NavLink>)
                : " "}
          <input type="checkbox"  id="toggleEdit" onChange={setEditMode} />view mode
    </nav>
    
}

</div> */}