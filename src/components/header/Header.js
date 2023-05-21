import React, { useState } from 'react'
import Nav from './Nav'

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  
  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  }

  return (
    <div>
      <header>
        <div className="brand_logo">
          <img src="/images/brand-logo.png" alt="Garage Vincent Parrot" />
        </div>
    {menuToggle.toString()}
        <Nav menuToggle={menuToggle} handleMenu={handleMenu} />
        <div className={`menu_button ${menuToggle ? "menu_button--open":""} `} onClick={handleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

      </header>
    </div>
  )
}

export default Header
