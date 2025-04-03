import React from 'react'

const Button = ({
    buttonName,
    onClickFn = null,
}) => {
  return (
    <button 
    className="w-full bg-gray-200 text-black font-bold py-3 px-4 rounded mb-4 hover:bg-gray-300 transition-colors"
    onClick={onClickFn}
    >
    {buttonName}
    </button>
  )
}

export default Button;