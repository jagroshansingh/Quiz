import { Box, Button, Image } from '@chakra-ui/react'
import React from 'react'
import styles from './css/Admin.module.css'
import { useNavigate } from 'react-router-dom'

export const Admin = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem('quiz')
    navigate('/')
  }
  return (
    <div>
        <Box className={styles.container} >          
            <Image src="./BrainBurst_Logo.png"/>
            <Button size={'sm'} variant={'outline'} color={'teal'} onClick={handleLogout}>Logout</Button>
        </Box>
    </div>
  )
}
