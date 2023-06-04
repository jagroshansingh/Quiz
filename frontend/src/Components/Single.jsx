import { Box, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./css/Single.module.css";

export const Single = ({ allq, handleOption, remember, current }) => {
  const combine=[...allq[current].incorrect_answers,allq[current].correct_answer]
  // console.log(combine)
  return (
    <div>
      <Box className={styles.optionsContainer}>
        <Box className={styles.questionContainer}>
          <Heading size={"md"} w={'90%'}>
            {current + 1 + ". " + allq[current].question}
          </Heading>
          <Heading size={"sm"}>{current + 1 + " of " + allq.length}</Heading>
        </Box>
        {combine.sort().map((option, i) => (
          <Text
            key={i}
            onClick={!remember[current] ? handleOption : undefined}
            _hover={
              !remember[current] && {
                backgroundColor: "grey",
                cursor: "pointer",
              }
            }
            bg={
              remember[current] &&
              remember[current] == allq[current].correct_answer &&
              remember[current] == option
                ? "green"
                : remember[current] &&
                  remember[current] != allq[current].correct_answer &&
                  remember[current] == option
                ? "red"
                : ""
            }
          >
            {option}
          </Text>
        ))}
      </Box>
      <Container
        className={styles.correctAnswer}
        visibility={
          remember[current] && remember[current] != allq[current].correct_answer
            ? "visible"
            : "hidden"
        }
      >
        <Text>Correct Answer: {allq[current].correct_answer}</Text>
      </Container>
    </div>
  );
};
