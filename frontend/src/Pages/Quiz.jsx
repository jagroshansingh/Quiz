import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import styles from "./css/Quiz.module.css";
import { Single } from "../Components/Single";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState(0);
  const [allquestions, setAllQuestions] = React.useState([]);
  const [remember, setRemember] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const ss = JSON.parse(sessionStorage.getItem("quiz"));

  const handlePage = (e) => {
    if (e.target.innerText == "Submit") {
      if (!ss.quickQuestions) 
      {
        axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/score/push`,
          data: { player: ss.player, quiz: ss.quizTitle, score },
        })
          .then((res) => {})
          .catch((err) => console.log(err));
      }
      ss.score = score;
      sessionStorage.setItem("quiz", JSON.stringify(ss));
      navigate("/scoreBoard");
    } else
      setCurrent((prev) =>
        e.target.innerText == "Next" ? prev + 1 : prev - 1
      );
  };

  const handleOption = (e) => {
    setRemember([...remember, e.target.innerText]);
    if (allquestions[current].correct_answer == e.target.innerText)
      setScore((prev) => prev + 1);
  };

  React.useEffect(() => {
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
          <Heading>Loading...</Heading>
        ) : (
          <Box>
            <Single
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