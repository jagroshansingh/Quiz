import { Box, Button, Container, Heading, Input, Select, VStack } from "@chakra-ui/react";
import React from "react";
import styles from "./css/Play.module.css"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getQuickQuestions } from "../Redux/action";
import { useNavigate } from "react-router-dom";

export const Play = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let initial={
    // name:"",
    category:"",
    difficulty:"",
  }
  const [form,setForm]=React.useState(initial)

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleStart=()=>{
    axios({
      method:'post',
      url:'https://opentdb.com/api.php?amount=10&type=multiple',
      url:`https://opentdb.com/api.php?amount=10&category=${form.category}&difficulty=${form.difficulty}&type=multiple`,
    })
    .then(res=>{
      console.log(res.data.results)
      dispatch(getQuickQuestions(res.data.results))
      navigate('/quiz')
    })
    .catch(err=>console.log(err))
  }
  return (
    <div className={styles.playContainer}>
      <Box className={styles.setupContainer}>
        <Heading>Set up your Quiz</Heading>
        {/* <Input placeholder="Enter Your Name" name="name" onChange={handleChange}></Input> */}
        <Select placeholder="Select Category" name="category" onChange={handleChange}>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="13">Entertainment: Musicals &amp; Theatres</option>
          <option value="14">Entertainment: Television</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science &amp; Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Entertainment: Comics</option>
          <option value="30">Science: Gadgets</option>
          <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
          <option value="32">Entertainment: Cartoon &amp; Animations</option>
        </Select>
        <Select placeholder="Select Difficulty" name="difficulty" onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </Select>
        <Button w={'100%'} onClick={handleStart}>START QUIZ</Button>
      </Box>
    </div>
  );
};
