import React from 'react'

const FormElement = ({label, input, textarea, select, required,children, value}) => {
  return (
    <>
      {
                label && input &&
                <div className='inputs_container'>
                    {label && <label style={label.style} htmlFor={label.for}>{label.text} {required && <span style={{color:"red"}}>*</span>}</label>}
            {input && <input  {...input} required={required} value={value} />}
                </div>
            }
            
            {
                label && textarea && 
                <div className='inputs_container'>
                    {label && <label  style={label.style} htmlFor={label.for}> {label.text} {required && <span style={{color:"red"}}>*</span>}</label>}
                    {textarea && <textarea {...textarea} required={required} value={value} />}
                </div>
            }


            {
                !label && input.type === "submit" &&
            
                <input type="submit" name="submit" value={input.value} className='cta cta--red cta--wh-70vw' style={{padding:"8px 30px",marginTop:"20px"}} />
                
          }
      
      {
        label && select &&
                  <div className='inputs_container'>
                    {label && <label style={label.style} htmlFor={label.for}> {label.text} {required && <span style={{color:"red"}}>*</span>}</label>}
                    <select id={select.id} name={select.name} onChange={select.onChange} value={select.value} required={required}>
                    {children}
                    </select>
                  </div>        
      }
      
    </>
  )
}

export default FormElement
