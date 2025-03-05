import React from 'react';

const Button = ({buttonName,onClickFn})=>{
    return(<>
    <button onClick={onClickFn} type='submit'>{buttonName}</button>
    </>)
}

export default Button;