import { Box, Button, HStack, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import styles from './css/CreateQuizCard.module.css'
import { useNavigate } from 'react-router-dom'

export const CreateQuizCard = ({details}) => {
    const navigate=useNavigate()
    const {_id,creator,title,description,questionBank}=details

    const handleQuiz=()=>{
        let quiz=JSON.parse(sessionStorage.getItem('quiz'))
        quiz.quizId=_id;
        quiz.quizTitle=title;
        sessionStorage.setItem('quiz',JSON.stringify(quiz))
        navigate(`/quiz`)
    }
  return (
    <div>
        <Box className={styles.cardContainer}>
            <Heading size={'md'}>{title}</Heading>
            <Text>{description}</Text>
            <Text>Created By: {creator}</Text>
            <Text>Questions: {questionBank.length}</Text>
            <Box className={styles.buttonContainer}>
                <Button size={'sm'} onClick={handleQuiz}>Take Quiz</Button>
                <Button size={'sm'}>LeaderBoard</Button>
            </Box>
        </Box>
    </div>
  )
}
