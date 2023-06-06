import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Center,
  Box,
} from "@chakra-ui/react";
import { Admin } from "./Admin";
import { QuizContext } from "../Contexts/QuizContext";
import axios from "axios";
import styles from "./css/LeaderBoard.module.css"

export const LeaderBoard = () => {
  const { quizTitle } = React.useContext(QuizContext);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_URL}/score/pull`,
      headers: { quizTitle },
    })
      .then((res) => setList(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Admin />
      <TableContainer p={"0% 1%"}>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>player</Th>
              <Th>date</Th>
              <Th isNumeric>score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!list.length ? (
              <Box className={styles.noData}>
              <Text>No data available</Text>
              </Box>
            ) : (
              list?.map((each, i) => (
                <Tr key={each._id}>
                  <Td>{i + 1}</Td>
                  <Td>{each.player}</Td>
                  <Td>{each.date}</Td>
                  <Td isNumeric>{each.score * 10}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
