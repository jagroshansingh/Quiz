import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import styles from "./css/Quiz.module.css";
import { MCQ } from "../Components/MCQ";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState(0);              //for tracking current question number of quiz
  const [allquestions, setAllQuestions] = React.useState([]);
  const [remember, setRemember] = React.useState([]);           //for keeping attempted quiz answers so that prev button can render previous attempts
  const [score, setScore] = React.useState(0);

  const ss = JSON.parse(sessionStorage.getItem("quiz"));

  const handlePage = (e) => {
    if (e.target.innerText == "Submit") {
      if (!ss.quickQuestions)                                            //if in custom mode, store the score in database
      {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/score/push`,
          data: { player: ss.player, quiz: ss.quizTitle, score },
        })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
      ss.score = score;                                                   //store the score in sessionStorage
      sessionStorage.setItem("quiz", JSON.stringify(ss));
      navigate("/scoreBoard");
    } else
      setCurrent((prev) =>
        e.target.innerText == "Next" ? prev + 1 : prev - 1                 //whether 'Next' or 'Prev' is clicked, set the current page accordingly
      );
  };

  //handles the clicked option and functions related to it
  const handleOption = (e) => {
    setRemember([...remember, e.target.innerText]);
    if (allquestions[current].correct_answer == e.target.innerText)
      setScore((prev) => prev + 1);
  };

  React.useEffect(() => {
    //if quickQuestion is available in session storgage, use the questions from it else fetch the custom quiz and use its questions
    if (ss.quickQuestions) setAllQuestions(ss.quickQuestions);           
    else {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/quiz/single`,
        headers: { id: ss.quizId },
      })
        .then((res) => setAllQuestions(res.data[0].questionBank))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className={styles.quizBody}>
      <Box className={styles.quizContainer}>
        {allquestions.length == 0 ? (
          <Heading>Loading...</Heading>                               //if it is taking time to fetch the questions from server
        ) : (
          <Box>
            <MCQ
              allq={allquestions}
              handleOption={handleOption}
              remember={remember}
              current={current}
            />
            <Box className={styles.buttonContainer}>
              <Button
                isDisabled={current == 0 ? true : false}
                onClick={handlePage}
              >
                Prev
              </Button>
              <Button onClick={handlePage}>
                {current + 1 == allquestions.length ? "Submit" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};