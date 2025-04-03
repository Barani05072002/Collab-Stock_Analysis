import React from 'react'

const InputField = ({
    value,
    type,
    icon=null,
    placeholder,
    onChangeFn,
    error=null
}) => {
  return (
    // <div className="mb-4">
    <div className="flex items-center bg-gray-800 rounded px-3 py-2 mb-4">
      {icon && (<div className='mr-3'>
        {icon}
      </div>)}
      <input 
        type={type} 
        className="bg-transparent text-gray-300 w-full focus:outline-none" 
        placeholder={placeholder}
        value={value}
        onChange={e => onChangeFn(e.target.value)}
      />
    </div>
    // </div>
  )
}

export default InputField;