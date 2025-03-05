import React from 'react';
import './InputField.css';

const InputField = ({labelData, nameData, valueData, typeData, placeHolderData, onChangeFn})=>{

    console.log(`rendered ${nameData} component`)

    return(<div className='dark-mode input-container flex-col '>
        {labelData && <label htmlFor={nameData}
        className='pad-left'
        >{labelData}</label>}
        <input
        name={nameData}
        value={valueData}
        type={typeData}
        placeholder={placeHolderData}
        onChange={onChangeFn}
        className='block'
        ></input>
    </div>)
}

export default InputField;