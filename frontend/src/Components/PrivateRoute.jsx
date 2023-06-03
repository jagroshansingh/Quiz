import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const [status, setStatus] = React.useState("");
  const navigate = useNavigate();
  let {token} = JSON.parse(localStorage.getItem("quiz"))
    React.useEffect(() => {
  axios({
    method: "get",
    url: `${process.env.REACT_APP_URL}/auth/verify`,
    headers: { token },
  })
    .then((res) => {
      setStatus(res.data);
    })
    .catch((err) => console.log(err));
    }, []);
  if (status == "not verified") navigate("/admin/signin");
  else if (status == "verified") return children;
};
