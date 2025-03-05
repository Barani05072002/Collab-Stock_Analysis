import React, { useState } from 'react';
import InputField from '../components/InputField/InputField';
import Button from '../components/ButtonComp/Button';
import './page_styles/login.css';

const LoginForm = ()=>{
    
    const [formData, setFormData] = useState({email:"",password:""});
    const [error, setError] = useState({emailError:"", passwordError:""});

    console.log("rendered...")

    const handleSubmit = (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

    return(
    <div className='container'>
        <h3 className='headline'>Login</h3>
        <div className='flex-col mrgn-auto'>
        <InputField
        nameData={"email"}
        valueData={formData["email"]}
        labelData={"Enter the Email"}
        placeHolderData={"Enter the Email"}
        onChangeFn={handleSubmit}
        typeData={"email"}
        />
        <InputField
        nameData={"password"}
        valueData={formData["password"]}
        labelData={"Enter the password"}
        placeHolderData={"Enter the password"}
        onChangeFn={handleSubmit}
        typeData={"password"}
        />
        <Button 
        buttonName={"Submit"} 
        onClickFn={handleSubmit}/>
        </div>
    </div>)
}

export default LoginForm;