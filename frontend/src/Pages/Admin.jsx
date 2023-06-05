import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/Admin.module.css'

export const Admin = () => {
  return (
    <div>
        <Box className={styles.container} boxShadow={'lg'}>
            <Link to={'/signup'}>SignUp</Link>
            <Link to={'/signin'}>SignIn</Link>
            <Link to={'/dashboard'}>DashBoard</Link>
        </Box>
    </div>
  )
}
