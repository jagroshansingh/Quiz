import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import styles from "./css/CreateQuizCard.module.css";
import {useNavigate } from "react-router-dom";
import { QuizContext } from "../Contexts/QuizContext";

export const CreateQuizCard = ({ index,details,handleDelete }) => {
  const { setQuizTitle, setEdit } = useContext(QuizContext);
  const navigate = useNavigate();
  const { _id, creator, title, description, questionBank } = details;

  const handleQuiz = () => {
    let quiz = JSON.parse(sessionStorage.getItem("quiz"));
    quiz.quizId = _id;
    quiz.quizTitle = title;
    sessionStorage.setItem("quiz", JSON.stringify(quiz));
    navigate(`/quiz`);
  };

  const handleLeaderBoard = () => {
    setQuizTitle(title);
    navigate("/leaderBoard");
  };

  const handleEdit=()=>{
    setEdit(details)
    navigate('/createQuiz')
  }

  let ss = JSON.parse(sessionStorage.getItem("quiz"));
  return (
    <div>
      <VStack className={styles.cardContainer} boxShadow={'outline'}>
        <Heading size={"md"}>{title}</Heading>
        <Text>{description}</Text>
        <Text>Created By: {creator}</Text>
        <Text>Questions: {questionBank.length}</Text>

        {ss.player == creator ? (
          <Box className={styles.buttonContainer}>
            <Button size={"sm"} colorScheme="teal" onClick={handleQuiz}>
              Take Quiz
            </Button>
            <Button size={"sm"} colorScheme="blue" onClick={handleEdit}>
              Edit
            </Button>
            <Button size={"sm"} colorScheme="red" onClick={()=>handleDelete(index)}>
              Delete
            </Button>
          </Box>
        ) : (
          <Box className={styles.buttonContainer}>
            <Button colorScheme="teal" size={"sm"} onClick={handleQuiz}>
              Take Quiz
            </Button>
            <Button size={"sm"} onClick={handleLeaderBoard}>
              LeaderBoard
            </Button>
          </Box>
        )}
      </VStack>
    </div>
  );
};
