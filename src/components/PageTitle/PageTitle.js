import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({ pageTitle ,style}) => {
    
  return (
    <div className={'page_title'}>
          <h1 style={style}>{pageTitle}</h1>
    </div>
  )
}

export default PageTitle


