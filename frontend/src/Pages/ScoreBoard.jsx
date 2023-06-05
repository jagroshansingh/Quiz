import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import styles from "./css/ScoreBoard.module.css";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../Contexts/QuizContext";

export const ScoreBoard = () => {
  const {quickQuestions}=useContext(QuizContext)
  const navigate = useNavigate();
  const [totalq, setTotalq] = React.useState(null);
  let ss = JSON.parse(sessionStorage.getItem("quiz"));

  React.useEffect(() => {
    if (quickQuestions) setTotalq(quickQuestions.length);
    else {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/quiz/single`,
        headers: { id: ss.quizId },
      })
        .then((res) => setTotalq(res.data[0].questionBank.length))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className={styles.scoreBoard}>
      <Box className={styles.scoreContainer}>
        <Heading>Score Board</Heading>
        <VStack shadow={"dark-lg"}>
          <Heading size={"md"}>Quiz name: {ss.quizTitle || 'Quick'}</Heading>
          <Heading size={"md"}>Total Questions: {totalq}</Heading>
          <Heading size={"md"}>Correct Answer: {ss.score}</Heading>
          <Heading size={"md"}>Incorrect Answer: {totalq - ss.score}</Heading>
        </VStack>
        <VStack shadow={"dark-lg"}>
          <Heading size={"md"}>Total Score: {ss.score * 10}</Heading>
          <Heading size={"md"}>
            Percentage: {Math.floor((ss.score / totalq) * 100)}%
          </Heading>
        </VStack>
      </Box>
      <Box className={styles.buttonContainer}>
        <Button
          colorScheme="messenger"
          variant="outline"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          colorScheme="messenger"
          variant="outline"
          onClick={() => navigate(quickQuestions?"/play":"/admin/dashboard")}
        >
          {quickQuestions?'Play Again':'Dashboard'}
        </Button>
      </Box>
    </div>
  );
};
