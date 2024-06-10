import React from 'react'
import Template from './Template'
import loginImg from "../assets/login.png"

const Login = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Welcome Back"
      image={loginImg}
      formType="login"
      setIsLoggedIn={setIsLoggedIn}
    />

  )
}

export default Login
