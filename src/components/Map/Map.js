import React from 'react'

const Map = () => {
  return (
    <div className='map_container'>
          <h3 className={'section_title section_title_map'}>Où sommes-nous ?</h3> 
          <div className='map_container'>
              <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92457.01789417554!2d1.350442158844883!3d43.60067365919835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aebb6fec7552ff%3A0x406f69c2f411030!2sToulouse!5e0!3m2!1sen!2sfr!4v1684960380081!5m2!1sen!2sfr" width="800" height="600" style={{ border:0}} title='Où nous sommes'></iframe>
        </div>
    </div>
  )
}

export default Map
