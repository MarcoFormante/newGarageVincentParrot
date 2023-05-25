import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import MenuButton from './MenuButton';

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSticky,setIsSticky] = useState(false);

  //menu Toggle function (used by menuButton and nav_links)
  const handleMenu = () => {
    setMenuToggle(!menuToggle);
  }


// if screen width < 769 and menu is open , this function closes the menu (see useEffect)
  const handleResizeScreen = () => {
    if (window.scrollY > 769) {
        setMenuToggle(false)
    }
  }

//on scroll header becomes sticky when user scoll Up
  const handleScroll = () => {

    if ( window.scrollY > scrollY + 200) {
      setScrollY(window.scrollY);
      setIsSticky(false);
    } else if (window.scrollY < scrollY - 200) {
      setScrollY(window.scrollY);
      setIsSticky(true);
    }
  }
  

//resize event
  useEffect(() => {
    window.addEventListener("resize", handleResizeScreen)

    return () => {
      window.removeEventListener("resize", handleResizeScreen)
    }
  
  }, [])

  //Scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  
  }, [scrollY])

  return (
    <div className={'header_outer'} style={isSticky ? { position: "sticky" } : {}}>
    
      <header>
        <div className={"brand_logo"}>
          <img src={"/images/brand-logo.png"} alt={"Garage Vincent Parrot"} />
        </div>
  
        <Nav menuToggle={menuToggle} handleMenu={handleMenu} />
        <MenuButton className={`menu_button ${menuToggle ? "menu_button--open":""} `} onClick={handleMenu} />
      </header>
    </div>
  )
}

export default Header
