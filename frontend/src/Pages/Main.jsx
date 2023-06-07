import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import styles from "./css/Main.module.css"
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate=useNavigate()
  return (
    <div className={styles.mainBody}>
      <Box className={styles.container}>
        <Image src="./BrainBurst_Logo.png"/>
        <Button size={'lg'} onClick={()=>navigate('/play')}>Quick Play</Button>
        <Button size={'lg'} onClick={()=>navigate('/dashboard')}>Custom Play</Button>
      </Box>
    </div>
  );
};
