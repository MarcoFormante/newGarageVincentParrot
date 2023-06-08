import React from 'react'

const FormElement = ({label, input, textarea, select, required}) => {
  return (
    <>
      {
                label && input &&
                <div>
                    {label && <label htmlFor={label.for}>{label.text} {required && <span style={{color:"red"}}>*</span>}</label>}
                    {input && <input {...input} required={required} />}
                </div>
            }
            
            {
                label && textarea && 
                <div>
                    {label && <label htmlFor={label.for}> {label.text} {textarea.required && <span style={{color:"red"}}>*</span>}</label>}
                    {textarea && <textarea {...textarea} required={required} />}
                </div>
            }


            {
                !label && input.type === "submit" &&
            
                <input type="submit" name="submit" value={input.value} className='cta cta--red' style={{padding:"8px 30px",marginTop:"20px"}} />
                
          }
      
      {
        label && select &&
                  <div>
                    {label && <label htmlFor={label.for}> {label.text} {required && <span style={{color:"red"}}>*</span>}</label>}
                    <select id={select.id} name={select.name} >
                        {select.options.map((opt) => <option value={opt.toLowerCase()}>{opt}</option>)}
                    </select>
                  </div>        
      }
      
    </>
  )
}

export default FormElement
