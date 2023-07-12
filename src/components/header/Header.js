import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import MenuButton from './MenuButton';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../Reducers/MenuToggleReducer';


const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrolly] = useState(0);
  const navigate = useNavigate()
  const AdminMenuToggle = useSelector((state) => state.menuToggle.value)
  const dispatch = useDispatch()
 

  //menu Toggle function (used by menuButton and nav_links)
  const handleMenu = () => {
    setMenuToggle(!menuToggle);
    dispatch(toggle(false))
  }
 
   
  function returnToHome() {
    navigate('/')
  }

 
  


  useEffect(() => {
    if (AdminMenuToggle === true) {
        setMenuToggle(false)
    } else {
      dispatch(toggle(false))
    }
  }, [AdminMenuToggle])
  

 

    return (
      <div className={'header_outer'} style={isSticky && menuToggle === false ? { position: "sticky" } : { position: "relative" }}>
    
        <header style={AdminMenuToggle ? {visibility:"hidden"}: {}} >
          <div className={"brand_logo"} onClick={()=>returnToHome()}>
            <img src={"/images/brand-logo.png"} alt={"Garage Vincent Parrot"} />
          </div>
  
          <Nav menuToggle={menuToggle ? menuToggle : null} setMenuToggle={()=>setMenuToggle(!menuToggle)} handleMenu={handleMenu} />
          <MenuButton className={`menu_button ${menuToggle ? "menu_button--open " : ""} `} onClick={handleMenu} />
        </header>
      </div>
    )
  }


export default Header
