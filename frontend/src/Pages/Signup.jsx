import React from "react";
import { Box, Heading, Input, useToast } from "@chakra-ui/react";
import styles from "./css/Signup.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  let initial = {
    email: "",
    password: "",
  };
  const [credential, setCredential] = React.useState(initial);

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.type]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let flag = false;
    for (let key in credential) {
      if (!credential[key].length) {
        flag = true;
        break;
      }
    }
    if(!flag)
    {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/auth/signup`,
      data: credential,
    })
      .then((res) => {
        toast({
          title:res.data.msg,
          status:res.data.msg=='Email already registered'?'warning':'success',
          duration:2000,
          position:'top'
        })
        let obj = {
          token: res.data.token,
          player: res.data.player,
          playerId: res.data.playerId,
        };
        if ((res.data.msg = "Signup and Login Successful")) {
          sessionStorage.setItem("quiz", JSON.stringify(obj));
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
    }
    else toast({
      title: "Empty Fields!",
      status: "warning",
      duration: 2000,
      position:'top'
    });
  };
  return (
    <div className={styles.wholePage}>
      <Box className={styles.container}>
        <Heading>Sign-up</Heading>
        <form action="" onSubmit={handleSubmit}>
          <Input type="email" placeholder="Email" onChange={handleChange} />
          <Input
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Input type="submit" />
        </form>
        <Box>Already registered? <Box color={'blue'} textDecoration={'underline'}><Link to={'/signin'}>Login</Link></Box></Box>
      </Box>
    </div>
  );
};
