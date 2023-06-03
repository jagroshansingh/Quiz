import React from 'react'
import { Admin } from './Admin'
import { Box, Heading, Input } from '@chakra-ui/react'
import styles from './css/Signup.module.css'
import axios from 'axios'

export const Signin = () => {
    let initial={
        email:"",
        password:""
    }
    const [credential,setCredential]=React.useState(initial)

    const handleChange=(e)=>{
        setCredential({...credential,[e.target.type]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios({
            method:'post',
            url:`${process.env.REACT_APP_URL}/auth/login`,
            data:credential
        })
        .then(res=>{
            alert(res.data.msg)
            let obj={
              token:res.data.token,
              player:res.data.player
            }
            if(res.data.msg='Login Successful')
            {
                localStorage.setItem('quiz',JSON.stringify(obj))
            }
        })
        .catch(err=>console.log(err))
    }
  return (
    <div>
      <Admin />
      <Box className={styles.container}>
        <Heading>Login</Heading>
        <form action="" onSubmit={handleSubmit}>
            <Input type='email' placeholder='Email' onChange={handleChange}/>
            <Input type='password' placeholder='Password' onChange={handleChange}/>
            <Input type='submit'/>
        </form>
      </Box>
    </div>
  )
}
