import React from 'react'
import fbIcon from '../../icons/facebook.svg'
import instagramIcon from '../../icons/instagram.svg'
import twitterIcon from '../../icons/twitter.svg'

const Footer = () => {
  return (
      <footer className={"footer"}>
          
        {/* telephone , email*/}
          <div className='footer_first_block footer_items_block'>
              <span className={"icon_footer_info tel"}>+334058876541</span>
              <a className={'icon_footer_info mail'} href="mailto:garageVP@gmail.com">garagevincentparrot@gmail.com</a>
          </div>

            {/* social media, politique de confidentialité*/}
          <div className='footer_second_block footer_items_block'>
              <div className='social_icons'>
                  <a href="https://www.facebook.com"><img src={fbIcon} width={38} height={30} alt="Visitez notre page facebook" /></a>
                  <a href="https://www.instagram.com"><img src={instagramIcon} width={38} height={30} alt="Visitez notre page instagram" /></a>
                  <a href="https://www.twitter.com"><img src={twitterIcon} width={38} height={30} alt="Visitez notre page twitter" /></a>
              </div>
              <a target="_blank" rel="noreferrer" href="https://garagevincentparrot.marcoformante.com/politiquedeconfidentialit%C3%A8.pdf">Politique de confidentialité</a>
          </div>
      
    </footer>
  )
}

export default Footer
