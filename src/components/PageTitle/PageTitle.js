import React from 'react'


const PageTitle = ({ pageTitle ,style}) => {
    
  return (
    <div className={'page_title'}>
      <h1 style={style}>{pageTitle}</h1>
    </div>
  )
}

export default PageTitle


