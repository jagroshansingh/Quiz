import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./css/Single.module.css";

export const Single = ({ allq, handleOption, remember, current }) => {
  return (
    <div>
      <Box className={styles.optionsContainer}>
        <Box className={styles.questionContainer}>
          <Heading size={"md"}>
            {current + 1 + ". " + allq[current].questionTitle}
          </Heading>
          <Heading size={"sm"}>{current + 1 + " of " + allq.length}</Heading>
        </Box>
        {allq[current].answerOptions.map((option, i) => (
          <Text
            key={i}
            onClick={handleOption}
            bg={
              remember[current] &&
              remember[current] == allq[current].correctOption &&
              remember[current] == option
                ? "green"
                : remember[current] &&
                  remember[current] != allq[current].correctOption &&
                  remember[current] == option
                ? "red"
                : ""
            }
          >
            {option}
          </Text>
        ))}
      </Box>
    </div>
  );
};
