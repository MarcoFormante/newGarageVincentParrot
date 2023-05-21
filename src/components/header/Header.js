import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import MenuButton from './MenuButton';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  
  //menu Toggle function (used by menuButton and nav_links)
  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  }


// if screen width < 769 and menu is open , this function closes the menu (see useEffect)
  const handleResizeScreen = () => {
    if (window.innerWidth < 769) {
        setMenuToggle(false)
    }
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResizeScreen)

    return () => {
      window.removeEventListener("resize", handleResizeScreen)
    }
  
  }, [])

  return (
    <div>
      <header>
        <div className="brand_logo">
          <img src="/images/brand-logo.png" alt="Garage Vincent Parrot" />
        </div>
    {menuToggle.toString()}
        <Nav menuToggle={menuToggle} handleMenu={handleMenu} />
        <MenuButton className={`menu_button ${menuToggle ? "menu_button--open":""} `} onClick={handleMenu} />
      </header>
    </div>
  )
}

export default Header
