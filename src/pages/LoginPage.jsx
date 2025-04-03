import React, { useState } from 'react';
import Heading from '../components/Heading';
import InputField from '../components/InputField';
import Button from '../components/Button';
import LinkTemp from '../components/LinkTemp';
import Container from '../components/Container';
import { MailIcon, Password } from '../assets/icons';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <Container>
        <Heading data={"Login"}/>
        <InputField
            value={email}
            placeholder={"Enter the email"}
            onChangeFn={setEmail}
            type={"email"}
            icon={<MailIcon width={25} height={25}/>}
        />
        <InputField
            value={password}
            placeholder={" password"}
            onChangeFn={setPassword}
            type={"text"}
            icon={<Password width={25} height={25}/>}
        />
        <Button buttonName={"Login"}/>
        <LinkTemp data={"Create Account"}/>
    </Container>
  );
};

export default LoginPage;