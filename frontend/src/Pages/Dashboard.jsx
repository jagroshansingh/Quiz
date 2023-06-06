import React from 'react'
import { Admin } from './Admin'
import { Box, Button, useToast } from '@chakra-ui/react'
import styles from './css/Dashboard.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CreateQuizCard } from '../Components/CreateQuizCard'

export const Dashboard = () => {
  const toast=useToast()
  const navigate=useNavigate()
  const [data,setData]=React.useState()

  const FetchAllQuizes=()=>{
    axios({
      method:'get',
      url:`${process.env.REACT_APP_URL}/quiz`
    })
    .then(res=>setData(res.data))
    .catch(err=>console.log(err))
  }

  const handleDelete=(index)=>{
    axios({
      method:'delete',
      url:`${process.env.REACT_APP_URL}/quiz/delete`,
      headers:{quizId:data[index]._id}
    })
    .then(res=>{
      FetchAllQuizes()
      toast({
        title: res.data,
        status: "success",
        duration: 2000,
      });
    })
    .catch(err=>console.log(err))
  }

  React.useEffect(()=>{
    FetchAllQuizes()
  },[])
  return (
    <div className={styles.dashboard}>
        <Admin/>
        <Box className={styles.createButton}>
          <Button colorScheme='blue' onClick={()=>navigate('/createQuiz')}>Create Quiz</Button>
        </Box>
        <Box className={styles.cardContainer}>
          {data?.map((each,index)=><CreateQuizCard key={each._id} index={index} details={each} handleDelete={handleDelete}/>)}
        </Box>
    </div>
  )
}
