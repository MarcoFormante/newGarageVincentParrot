import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({ pageTitle }) => {
    
  return (
    <div className='page_title'>
          <h1>{pageTitle}</h1>
    </div>
  )
}

export default PageTitle

PageTitle.propTypes = {
    pageTitle: PropTypes.string
}
