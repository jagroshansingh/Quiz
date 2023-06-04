import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import styles from "./css/Quiz.module.css";
import { Single } from "../Components/Single";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = React.useState(0);
  const [allquestions, setAllQuestions] = React.useState([]);
  const [remember, setRemember] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const { quickQuestions } = useSelector((store) => store);

  const handlePage = (e) => {
    if (e.target.innerText == "Submit") {
      if (quickQuestions) {
        sessionStorage.setItem("quiz", JSON.stringify({ score }));
        navigate("/scoreBoard");
      } else {
        const ss = JSON.parse(sessionStorage.getItem("quiz"));
        axios({
          method: "post",
          url: `${process.env.REACT_APP_URL}/score/push`,
          data: { playerId: ss.playerId, quizId: ss.quizId, score },
        })
          .then((res) => {
            ss.score = score;
            sessionStorage.setItem("quiz", JSON.stringify(ss));
            navigate("/scoreBoard");
          })
          .catch((err) => console.log(err));
      }
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
    if (quickQuestions) setAllQuestions(quickQuestions);
    else {
      let { quizId } = JSON.parse(sessionStorage.getItem("quiz"));
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL}/quiz/single`,
        headers: { id: quizId },
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
