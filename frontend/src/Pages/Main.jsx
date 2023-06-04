import { Box, Button } from "@chakra-ui/react";
import React from "react";
import styles from "./css/Main.module.css"
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate=useNavigate()
  return (
    <div>
      <Box className={styles.container}>
        <Button onClick={()=>navigate('/play')}>Quick Play</Button>
        <Button onClick={()=>navigate('/admin/signin')}>Custom Play</Button>
      </Box>
    </div>
  );
};
