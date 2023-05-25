import React from 'react'


const Footer = () => {
  return (
      <footer className={"footer"}>
          
        {/* telephone , email*/}
          <div className='footer_first_block footer_items_block'>
              <span className={"icon_footer_info tel"}>+334058876541</span>
              <a className={'icon_footer_info mail'} href="mailto:garageVP@gmail.com">garageVP@gmail.com</a>
          </div>

            {/* social media, politique de confidentialité*/}
          <div className='footer_second_block footer_items_block'>
              <div className='social_icons'>
                  <a href="https://www.facebook.com"><img src="/icons/facebook.svg" width={38} height={30} alt="Visitez notre page facebook" /></a>
                  <a href="https://www.instagram.com"><img src="/icons/instagram.svg" width={38} height={30} alt="Visitez notre page instagram" /></a>
                  <a href="https://www.twitter.com"><img src="/icons/twitter.svg" width={38} height={30} alt="Visitez notre page twitter" /></a>
              </div>
              <a href='pol'>Politique de confidentialité</a>
          </div>
      
    </footer>
  )
}

export default Footer
