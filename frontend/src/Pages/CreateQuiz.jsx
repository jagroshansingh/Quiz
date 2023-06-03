import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import styles from './css/CreateQuiz.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const CreateQuiz = () => {
    const navigate=useNavigate()
    let initialBank=[]
    const [questionBank,setQuestionBank]=React.useState(initialBank)
    // console.log(questionBank)

    let initialQuestion={
        questionTitle:"",
        answerOptions:[],
        correctOption:""
    }
    const [question,setQuestion]=React.useState(initialQuestion)
    // console.log(question)

    let initialDetails={
        creator:"temporary",
        title:"",
        description:"",
    }
    const [details,setDetails]=React.useState(initialDetails)
    const handleChange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }

    const handleQuestion=(q)=>{
        if(q.target.name!='answerOptions') setQuestion({...question,[q.target.name]:q.target.value})
        else
        {
            setQuestion({...question,[q.target.name]:q.target.value.split(",")})
        }
    }

    const handleNextQuestion=()=>{
        setQuestionBank([...questionBank,question])
        setQuestion(initialQuestion)
    }

    const handleCreate=()=>{
        axios({
            method:'post',
            url:`${process.env.REACT_APP_URL}/quiz/create`,
            data:{...details,questionBank}
        })
        .then(res=>{
            alert(res.data)
            navigate('/admin/dashboard')
        })
        .catch(err=>console.log(err))
    }

  return (
    <div>
        <Box className={styles.formContainer}>
        <form action="">
            <Input placeholder='Quiz Creator' defaultValue='temporary'></Input>
            <Input placeholder='Title' name='title' onChange={handleChange}></Input>
            <Input placeholder='Description' name='description' onChange={handleChange}></Input>
            <VStack className={styles.questionContainer}>
                <Heading size={'md'}>Question no.{questionBank.length+1}</Heading>
                <Input placeholder='Question Title' name='questionTitle' onChange={handleQuestion} value={question.questionTitle}></Input>
                <Input placeholder='Answer Options' name='answerOptions' onChange={handleQuestion} value={question.answerOptions}></Input>
                <Input placeholder='Correct Option' name='correctOption' onChange={handleQuestion} value={question.correctOption}></Input>
                <Button onClick={handleNextQuestion}>Next</Button>
            </VStack>
            <VStack>
            <Button colorScheme='blue' onClick={handleCreate}>Create Quiz</Button>
            </VStack>
        </form>
        </Box>
    </div>
  )
}
