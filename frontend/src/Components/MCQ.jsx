import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./css/MCQ.module.css";

export const MCQ = ({ allq, handleOption, remember, current }) => {
  const allOptions=[...allq[current].incorrect_answers,allq[current].correct_answer]    //bringing the all options together
  // console.log(allOptions)
  return (
    <div>
      <Box className={styles.optionsContainer}>
        <Box className={styles.questionContainer}>
          <Heading size={{base:"sm",md:"md"}} >
            {current + 1 + ". " + allq[current].question}
          </Heading>
          <Heading size={"sm"} >{current + 1 + " of " + allq.length}</Heading>
        </Box>


        {allOptions.sort().map((option, i) => (
          <Text
            key={i}
            onClick={!remember[current] ? handleOption : undefined}
            _hover={
              !remember[current] && {                                                //if not attempted the question then hovering the options turns background to 'grey' color
                backgroundColor: "grey",
                cursor: "pointer",
              }
            }
            bg={                                               
              remember[current] &&                                                    //if already attempted the question and
              remember[current] == allq[current].correct_answer &&                    //if the strored answer is same as the correct answer and
              remember[current] == option                                             //if stored answer is same as the option
                ? "green"                                                             //then turn the opions background 'green' color
                : remember[current] &&                                                
                  remember[current] != allq[current].correct_answer &&                //if the stored answer is not same as correct answer that means user has choosen the incorrect answer
                  remember[current] == option
                ? "red"                                                               //then turn the respective option background to 'red' color
                : ""                                                                  //if neither the case, then keep the background null
            }                                                               
          >
            {option}
          </Text>
        ))}


      </Box>
      <Container
        className={styles.correctAnswer}
        visibility={
          remember[current] && remember[current] != allq[current].correct_answer      //if already attempted and the choice was wrong display the correct answer else hide it
            ? "visible"
            : "hidden"
        }
      >
        <Text>Correct Answer: {allq[current].correct_answer}</Text>
      </Container>
    </div>
  );
};
