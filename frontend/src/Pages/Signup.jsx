import React from 'react'
import { Admin } from './Admin'
import { Box, Heading, Input } from '@chakra-ui/react'
import styles from './css/Signup.module.css'
import axios from 'axios'

export const Signup = () => {
    let initial={
        email:"",
        password:""
    }
    const [credential,setCredential]=React.useState(initial)
    console.log(credential)

    const handleChange=(e)=>{
        setCredential({...credential,[e.target.type]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios({
            method:'post',
            url:`${process.env.REACT_APP_URL}/auth/signup`,
            data:credential
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }
  return (
    <div>
      <Admin />
      <Box className={styles.container}>
        <Heading>Sign-up</Heading>
        <form action="" onSubmit={handleSubmit}>
            <Input type='email' placeholder='Email' onChange={handleChange}/>
            <Input type='password' placeholder='Password' onChange={handleChange}/>
            <Input type='submit'/>
        </form>
      </Box>
    </div>
  )
}
