import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import styles from "./css/CreateQuiz.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../Contexts/QuizContext";

export const CreateQuiz = () => {
  const { edit } = useContext(QuizContext);
  const toast = useToast();
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
    let flag = false;
    for (let key in question) {
      if (!question[key].length) {
        flag = true;
        break;
      }
    }
    if (!flag) setQuestionBank([...questionBank, question]);
    else
      toast({
        title: "Empty Fields!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
  };

  const handleCreate = () => {
    let flag = false;
    for (let key in details) {
      if (!details[key].length) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_URL}/quiz/create`,
        data: { ...details, questionBank },
      })
        .then((res) => {
          navigate("/CustomPlayDashboard");
          toast({
            title: res.data,
            status:"success",
            duration: 2000,
            position:'top'
          });
        })
        .catch((err) => console.log(err));
    } else toast({
        title: "Empty Fields!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
  };

  const handleEdit = () => {
    let bigger =
      edit.questionBank.length > questionBank.length
        ? edit.questionBank
        : questionBank;
    let collect = bigger.map((each, i) =>
      questionBank[i] ? questionBank[i] : edit.questionBank[i]
    );

    axios({
      method: "put",
      url: `${process.env.REACT_APP_URL}/quiz/update`,
      data: { ...details, questionBank: collect },
      headers: { quizId: edit._id },
    })
      .then((res) => {
        navigate("/CustomPlayDashboard");
        toast({
          title:res.data,
          status:"success",
          duration:2000,
          position:'top'
        })
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    setQuestion(initialQuestion);
  }, [questionBank]);

  return (
    <div className={styles.wholeBody}>
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
                maxLength={'15'}
                onChange={handleChange}
                defaultValue={edit?.title || ""}
              ></Input>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Enter Quiz Description"
                name="description"
                maxLength={'25'}
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
          <Box className={styles.buttonContainer}>
          <Button onClick={()=>navigate('/CustomPlayDashboard')}>CANCEL</Button>
            {edit ? (
              <Button colorScheme="blue" onClick={handleEdit}>
                SUBMIT
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleCreate}>
                CREATE
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </div>
  );
};
