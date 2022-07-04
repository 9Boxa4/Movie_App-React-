import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const { settingTokenItem } = props;
    const [isValidInput,setIsValidInput]=useState({user:true,pass:true})
    const [loginData,setLoginData]=useState({
    username:''
    ,password:''})
    
    const users=[{username: `example@boopro.tech`, password:`123123`}]

    const errors={
        uname:'Invalid username',
        pass:'invalid password'
    }

    // The http request is returning a error, something must be wrong with the backend
    const handleLogin = () => {
        axios.post('http://dev.api.kabox.io/api/auth/login', {
            email: 'example@boopro.tech',
            password: '123123'
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error.response.status);
          });
    } 

    const handleSubmit=(e)=>{
        e.preventDefault();
       
        const userData= users.find(user=>user.username === loginData.username);
        if(userData)
        {
            userData.password !== loginData.password 
            ? 
            setIsValidInput(state=>({...state,pass:!state.pass}))
            : 
            settingTokenItem('token','token')
        }
        else 
        {        
                setIsValidInput(state=>({...state,user:!state.user}))          
        }
    }

  return (
    <div className='login__container'>
        <form className='login__form' onSubmit={handleSubmit} action="">
                <h1>Sign in</h1>
                <div className='form__group username__group'>
                    <input placeholder="Username *" onChange={e=> setLoginData(state=>({...state,username:e.target.value}))} type="email" name="" id=""/>
                </div>
                <p className={isValidInput.user?"hidden":null} style={{color:'red'}}>{errors.uname}</p>

                <div className='form__group password__group'>    
                    <input placeholder="Password *" type="password" onChange={e=>setLoginData(state=>({...state,password:e.target.value}))} />
                </div>
                <p className={isValidInput.pass?"hidden":null}  style={{color:'red'}}>{errors.pass}</p>

                <div className='form__group'>
                    <input type="submit" value="Sign in"/>
                </div>
        </form>
    </div>
  )
}

export default Login
