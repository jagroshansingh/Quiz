import React from 'react'
import { Admin } from './Admin'
import { Box, Button } from '@chakra-ui/react'
import styles from './css/Dashboard.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CreateQuizCard } from '../Components/CreateQuizCard'

export const Dashboard = () => {
  const navigate=useNavigate()
  const [data,setData]=React.useState()

  React.useEffect(()=>{
    axios({
      method:'get',
      url:`${process.env.REACT_APP_URL}/quiz`
    })
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
        <Admin/>
        <Box className={styles.createButton}>
          <Button onClick={()=>navigate('/admin/createQuiz')}>Create Quiz</Button>
        </Box>
        <Box className={styles.cardContainer}>
          {data?.map((each)=><CreateQuizCard key={each._id} details={each}/>)}
        </Box>
    </div>
  )
}
