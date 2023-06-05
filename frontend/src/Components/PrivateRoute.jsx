import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();
  let ss = JSON.parse(sessionStorage.getItem("quiz"))
    React.useEffect(() => {
  axios({
    method: "get",
    url: `${process.env.REACT_APP_URL}/auth/verify`,
    headers: { token:ss?.token },
  })
    .then((res) => {
      setStatus(res.data);
    })
    .catch((err) => console.log(err));
    }, []);
  if (status == "not verified") navigate("/signin");
  else if (status == "verified") return children;
};
