import React, { useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import InputField from '../components/InputField'
import { MailIcon, Password } from '../assets/icons'
import Button from '../components/Button'
import LinkTemp from '../components/LinkTemp'

const SignupPage = () => {

    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
    <Container>
        <Heading data={"Signup"} />
        <InputField 
            type={"text"}
            value={username}
            onChangeFn={setUsername}
            placeholder={"Enter your name"}
            icon={<MailIcon width={30} height={30}/>}
        />
        <InputField 
            type={"email"}
            value={email}
            onChangeFn={setEmail}
            placeholder={"Enter the mail"}
            icon={<MailIcon width={30} height={30}/>}
        />
        <InputField 
            type={"text"}
            value={password}
            onChangeFn={setPassword}
            placeholder={"Enter the password"}
            icon={<Password width={30} height={30}/>}
        />
        <Button buttonName={"Signup"}/>
        <LinkTemp data={"Already Have"}/>
    </Container>
  )
}

export default SignupPage