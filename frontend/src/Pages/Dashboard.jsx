import React from 'react'
import { Admin } from './Admin'
import { Box, Button } from '@chakra-ui/react'
import styles from './css/Dashboard.module.css'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
  const navigate=useNavigate()
  return (
    <div>
        <Admin/>
        <Box className={styles.createButton}>
          <Button onClick={()=>navigate('/admin/createQuiz')}>Create Quiz</Button>
        </Box>
    </div>
  )
}
