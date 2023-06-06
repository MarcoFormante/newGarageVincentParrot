import React from 'react'
import { Link } from 'react-router-dom'
import { Navigate,useLocation } from 'react-router-dom'

const AdminNav = ({ role="employee" }) => {
    const location = useLocation()
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
            to: "admin/timeTable",
            linkName : "Horaires"
        }, 
    ]

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
    <div>
          <nav className='admin_nav'>
              
              {role && role === "admin"
                ? adminLinks.map((link, index) => <Link to={link.to} key={link.linkName + "_" + index}>{link.linkName}</Link>)
                  : role && role === "employee"
                        ? employeeLinks.map((link, index) => <Link to={link.to} key={link.linkName + "_" + index}>{link.linkName}</Link>)
                        : <Navigate to={"/"} replace state={{from:location}} />
                }
      </nav>
    </div>
  )
}

export default AdminNav
