import { Box, Button, Image, useToast } from '@chakra-ui/react'
import React from 'react'
import styles from './css/Navbar.module.css'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const toast=useToast()
  const navigate=useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem('quiz')
    navigate('/')
    toast({
      title:'Logout Success',
      status:'success',
      duration:2000,
      position:'top'
    })
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
