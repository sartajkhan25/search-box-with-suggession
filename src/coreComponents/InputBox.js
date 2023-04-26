import React from 'react'

const Input = (props) => {


  const handleChange = (e)=>{
    props.handleChange(e)
  }


  return (
    <div>
      <div class="group">
        <input
          type="text"
          placeholder="Please search here"
          id="name"
          onChange={handleChange}
          value = {props.value}
          onKeyDown={props.handleKeyDown}
        />
      </div>
    </div>
  )
}

export default Input