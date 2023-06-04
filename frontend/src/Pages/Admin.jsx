import { Box } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './css/Admin.module.css'

export const Admin = () => {
  return (
    <div>
        <Box className={styles.container}>
            <Link to={'/admin/signup'}>SignUp</Link>
            <Link to={'/admin/signin'}>SignIn</Link>
            <Link to={'/admin/dashboard'}>DashBoard</Link>
        </Box>
    </div>
  )
}
