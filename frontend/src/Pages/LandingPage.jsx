import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import styles from "./css/LandingPage.module.css"
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
    const navigate=useNavigate()
    const handlePlay=()=>{
      let ss=JSON.parse(sessionStorage.getItem('quiz'))
      if(ss?.quickQuestions) delete ss.quickQuestions        //for reusability of scoreboard and quiz components between quick and custom mode
      sessionStorage.setItem('quiz',JSON.stringify(ss))

      navigate('/CustomPlayDashboard')
    }
  return (
    <div className={styles.mainBody}>
      <Box className={styles.container}>
        <Image src="./BrainBurst_Logo.png"/>
        <Button size={'lg'} onClick={()=>navigate('/QuickPlayDashboard')}>Quick Play</Button>
        <Button size={'lg'} onClick={handlePlay}>Custom Play</Button>
      </Box>
    </div>
  );
};
