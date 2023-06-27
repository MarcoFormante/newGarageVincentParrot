import React from 'react'


const Modal = ({ title, children, onClick, onExit, type, buttonText }) => {
  
  if (type === "input") {
    return (
      <div className='modal'>
        <div className='modal_container'>
        <div className='modal_exit' onClick={onExit}></div>
          <span className='modal_title'>{title}</span>
          {children}
          <div role='button'onClick={onClick} className='cta cta--red cta--padding-plus'>{!buttonText ? "Ajouter" : buttonText}</div>
        </div>
      </div>
    )
  }

  if (type === "alert") {
    return (
      <div className='modal'>
        <div className='modal_container'>
        <div className='modal_exit' onClick={onExit}></div>
          <span className='modal_title'>{title}</span>
          {children}
          <div className='row'>
              <div role='button' onClick={onExit} className='cta cta--red cta--padding-plus'>Annuler</div>
              <div role='button' onClick={onClick}  className='cta cta--white cta--padding-plus'>OK</div>
          </div>
          
        </div>
      </div>
    )
  }
  
}

export default Modal
