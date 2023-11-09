import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import MenuButton from './MenuButton';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../Reducers/MenuToggleReducer';


const Header = ({login}) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate()
  const AdminMenuToggle = useSelector((state) => state.menuToggle.value)

 

  //menu Toggle function (used by menuButton and nav_links)
  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  }
 
   
  function returnToHome() {
    navigate('/')
  }

 

  useEffect(() => {
    if (AdminMenuToggle === true) {
        setMenuToggle(false)
    } 
  }, [AdminMenuToggle])
  

 

    return (
      <div className={'header_outer'} style={isSticky && menuToggle === false ? { position: "sticky" } : { position: "relative" }}>
    
        <header style={AdminMenuToggle ? {visibility:"hidden"}: {}} >
          <div className={"brand_logo"} onClick={()=>returnToHome()}>
            <img src={"/images/brand-logo.png"} alt={"Garage Vincent Parrot"} />
          </div>
  
          <Nav login={login} menuToggle={menuToggle ? menuToggle : null} setMenuToggle={()=>setMenuToggle(!menuToggle)} handleMenu={handleMenu} />
          <MenuButton className={`menu_button ${menuToggle ? "menu_button--open " : ""} `} onClick={handleMenu} />
        </header>
      </div>
    )
  }


export default Header
