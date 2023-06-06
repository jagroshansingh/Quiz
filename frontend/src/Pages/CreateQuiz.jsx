import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import styles from "./css/CreateQuiz.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../Contexts/QuizContext";

export const CreateQuiz = () => {
  const { edit } = useContext(QuizContext);
  const navigate = useNavigate();
  let initialBank = [];
  const [questionBank, setQuestionBank] = React.useState(initialBank);
  let ss = JSON.parse(sessionStorage.getItem("quiz"));

  let initialDetails = {
    creator: ss.player,
    title: edit?.title || "",
    description: edit?.description || "",
  };
  const [details, setDetails] = React.useState(initialDetails);

  let initialQuestion = {
    question: edit?.questionBank[questionBank.length]?.question || "",
    incorrect_answers:
      edit?.questionBank[questionBank.length]?.incorrect_answers || [],
    correct_answer:
      edit?.questionBank[questionBank.length]?.correct_answer || "",
  };
  const [question, setQuestion] = React.useState(initialQuestion);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleQuestion = (q) => {
    if (q.target.name != "incorrect_answers")
      setQuestion({ ...question, [q.target.name]: q.target.value });
    else {
      setQuestion({ ...question, [q.target.name]: q.target.value.split(",") });
    }
  };

  const handleNextQuestion = () => {
    setQuestionBank([...questionBank, question]);
  };

  const handleCreate = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/quiz/create`,
      data: { ...details, questionBank },
    })
      .then((res) => {
        alert(res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    let bigger=edit.questionBank.length>questionBank.length?edit.questionBank:questionBank
    let collect = bigger.map((each, i) =>
      questionBank[i] ? questionBank[i] : edit.questionBank[i]
    );

    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/quiz/update`,
      data: {...details,questionBank:collect},
      headers: { quizId: edit._id },
    })
      .then((res) =>{
        navigate('/dashboard')
        alert(res.data)
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    setQuestion(initialQuestion);
  }, [questionBank]);

  return (
    <div>
      <Box className={styles.formContainer}>
        <form action="">
          <VStack>
            <FormControl>
              <FormLabel>Quiz Creator</FormLabel>
              <Input
                placeholder="Quiz Creator"
                value={ss.player}
                isReadOnly
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter Quiz Title"
                name="title"
                onChange={handleChange}
                defaultValue={edit?.title || ""}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Enter Quiz Description"
                name="description"
                onChange={handleChange}
                defaultValue={edit?.description || ""}
              ></Input>
            </FormControl>
          </VStack>
          <VStack className={styles.questionContainer}>
            <Heading size={"md"}>Question no.{questionBank.length + 1}</Heading>
            <FormControl>
              <FormLabel>Question Title</FormLabel>
              <Input
                placeholder="Enter the Question Title"
                name="question"
                onChange={handleQuestion}
                value={question.question}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Incorrect Options</FormLabel>
              <Input
                placeholder="option1,option2,option3"
                name="incorrect_answers"
                onChange={handleQuestion}
                value={question.incorrect_answers}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Correct Option</FormLabel>
              <Input
                placeholder="Correct Option"
                name="correct_answer"
                onChange={handleQuestion}
                value={question.correct_answer}
              ></Input>
            </FormControl>
            <Button onClick={handleNextQuestion}>Next</Button>
          </VStack>
          <VStack>
            {edit ? (
              <Button colorScheme="blue" onClick={handleEdit}>
                Submit
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleCreate}>
                Create Quiz
              </Button>
            )}
          </VStack>
        </form>
      </Box>
    </div>
  );
};
