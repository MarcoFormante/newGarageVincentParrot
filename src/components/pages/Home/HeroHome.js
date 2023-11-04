import React, { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const HeroHome = () => {

  const comp = React.useRef()

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let ctx = gsap.context(() => {
      gsap.to(".scrollAnim ", {
        opacity: 1,
        duration: 0.5,
        y: 0,
        scrollTrigger: {
          trigger: "",
          start:"top bottom"
       }
      })
    }, comp.current)
    
    return ()=>ctx.revert()
  },[])

  
  return (
    <div>
       <figure className='hero_home' style={{overflow:"hidden"}}>
        <h2 className="page_title_home scrollAnim">Vehicules d'occasion au <span>meilleurs</span> prix</h2>
        <figcaption className='hero_home_caption'>La voiture de vos rêves au prix le moins cher du marché.</figcaption>
      </figure>
    </div>
  )
}

export default HeroHome
