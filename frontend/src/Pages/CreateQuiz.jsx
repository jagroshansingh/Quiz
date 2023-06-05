import { Box, Button, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import styles from './css/CreateQuiz.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { QuizContext } from '../Contexts/QuizContext'

export const CreateQuiz = () => {
    const {edit}=useContext(QuizContext)
    console.log(edit)
    const navigate=useNavigate()
    let initialBank=[]
    const [questionBank,setQuestionBank]=React.useState(initialBank)
    console.log(questionBank)
    let ss=JSON.parse(sessionStorage.getItem('quiz'))

    let initialQuestion={
        question:edit?.questionBank[questionBank.length]?.question||"",
        incorrect_answers:edit?.questionBank[questionBank.length].incorrect_answers||[],
        correct_answer:edit?.questionBank[questionBank.length].correct_answer||""
    }
    const [question,setQuestion]=React.useState(initialQuestion)
    console.log(question)

    let initialDetails={
        creator:ss.player,
        title:edit?.title||"",
        description:edit?.description||"",
    }
    const [details,setDetails]=React.useState(initialDetails)
    // console.log(details)
    const handleChange=(e)=>{
        setDetails({...details,[e.target.name]:e.target.value})
    }

    const handleQuestion=(q)=>{
        if(q.target.name!='incorrect_answers') setQuestion({...question,[q.target.name]:q.target.value})
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
            navigate('/dashboard')
        })
        .catch(err=>console.log(err))
    }

  return (
    <div>
        <Box className={styles.formContainer}>
        <form action="">
            <Input placeholder='Quiz Creator' defaultValue={ss.player}></Input>
            <Input placeholder='Title' name='title' onChange={handleChange} defaultValue={edit?.title||""}></Input>
            <Input placeholder='Description' name='description' onChange={handleChange} defaultValue={edit?.description||""}></Input>
            <VStack className={styles.questionContainer}>
                <Heading size={'md'}>Question no.{questionBank.length+1}</Heading>
                <Input placeholder='Question Title' name='question' onChange={handleQuestion} value={edit?.questionBank[questionBank.length]?.question||question.question}></Input>
                <Input placeholder='Incorrect Options' name='incorrect_answers' onChange={handleQuestion} value={edit?.questionBank[questionBank.length]?.incorrect_answers||question.incorrect_answers}></Input>
                <Input placeholder='Correct Option' name='correct_answer' onChange={handleQuestion} value={edit?.questionBank[questionBank.length]?.correct_answer||question.correct_answer}></Input>
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
