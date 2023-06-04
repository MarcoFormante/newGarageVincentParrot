import React from 'react'

const FormElement = ({label, input, textarea }) => {
  return (
    <>
      {
                label && input &&
                <div>
                    {label && <label htmlFor={label.for}>{label.text} { input.required && <span style={{color:"red"}}>*</span>}</label>}
                    {input && <input {...input} required={input.required} />}
                </div>
            }
            
            {
                label && textarea && 
                <div>
                    {label && <label htmlFor={label.for}> {label.text} {textarea.required && <span style={{color:"red"}}>*</span>}</label>}
                    {textarea && <textarea {...textarea} required={textarea.required} />}
                </div>
            }


            {
                !label && input.type === "submit" &&
            
                <input type="submit" name="submit" value={input.value} className='cta cta--red' style={{padding:"8px 30px",marginTop:"20px"}} />
                
            }
    </>
  )
}

export default FormElement
