import React, { useLayoutEffect } from 'react'
import gsap from 'gsap'

const HeroHome = () => {
  const comp = React.useRef()
  const el = React.useRef()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(el.current, { opacity: 0, x:100 }, {
        opacity: 1,
        duration: 1,
        x:0,
       })

    }, comp.current);

    return () => ctx.revert()
    
  }, [])



  return (
    <div>
       <figure className='hero_home' style={{overflow:"hidden"}}>
        <h2 className="page_title_home" ref={el}>Vehicules d'occasion au <span>meilleurs</span> prix</h2>
        <figcaption className='hero_home_caption'>La voiture de vos rêves au prix le moins cher du marché.</figcaption>
      </figure>
    </div>
  )
}

export default HeroHome
