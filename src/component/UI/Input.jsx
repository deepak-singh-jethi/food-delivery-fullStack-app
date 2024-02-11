import React from 'react'


function Input({label,id ,...props}) {
  return (
    <p className='control'>
        <label htmlFor= {id}>{label}</label>
        <input type="text" id={id} name = {id} required {...props}/>
    </p>
  )
}

export default Input