import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { Navbar } from "./Navbar";
import { QuizContext } from "../Contexts/QuizContext";
import axios from "axios";
import styles from "./css/LeaderBoard.module.css"
import { useNavigate } from "react-router-dom";

export const LeaderBoard = () => {
  const navigate=useNavigate()
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
    <div className={styles.wholeBody}>
      <Navbar />
      <TableContainer p={"20px 0px"}>
        <Table variant="striped" colorScheme="teal" size={{base:'sm',md:'md'}}>
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
      <Box className={styles.backContainer}>
        <Button colorScheme="blue" onClick={()=>navigate('/CustomPlayDashboard')}>Back</Button>
      </Box>
    </div>
  );
};
