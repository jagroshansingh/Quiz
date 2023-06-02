import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import styles from './css/Quiz.module.css'

export const Quiz = () => {
  const { id } = useParams();
  const [current,setCurrent]=React.useState(0)
  const [allquestions, setAllQuestions] = React.useState([]);
  console.log(allquestions);
  let keep=allquestions[current]

  const handlePage=(e)=>{
    setCurrent((prev)=>e.target.innerText=='Next'?prev+1:prev-1)
  }

  const handleOption=(e)=>{
    if(e.target.innerText==keep.answerOptions[keep.correctOptions[0]]) e.target.style.backgroundColor='green'
    else e.target.style.backgroundColor='red'
  }

  React.useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/quiz/single`,
      headers: { id },
    })
      .then((res) => setAllQuestions(res.data[0].questionBank))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Box className={styles.quizContainer}>
        {allquestions.length == 0 ? (
          <Heading>Loading...</Heading>
        ) : (
          <Box className={styles.optionsContainer}>
          <Heading size={'md'}>{allquestions[current].questionTitle}</Heading>
          <Text onClick={handleOption}>{allquestions[current].answerOptions[0]}</Text>
          <Text onClick={handleOption}>{allquestions[current].answerOptions[1]}</Text>
          <Text onClick={handleOption}>{allquestions[current].answerOptions[2]}</Text>
          <Text onClick={handleOption}>{allquestions[current].answerOptions[3]}</Text>
            <Box>
              <Button isDisabled={current==0?true:false} onClick={handlePage}>Prev</Button>
              <Button onClick={handlePage}>{current+1==allquestions.length?'Submit':'Next'}</Button>
            </Box>
          </Box>
        )}
      </Box> 
    </div>
  );
};
