import React, { useState, useEffect } from "react";
import axios from "../../axios";

const Stack = () => {
  const user_name = sessionStorage.getItem("user_name");
  const userID = sessionStorage.getItem("userID");

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [dev, setDev] = useState("");
  const [coll, setColl] = useState("");

  const getStack = () => {
    axios.post("/user/stack", { userID: userID }).then((res) => {
      console.log(res.data.stackData);
      setFront(res.data.stackData.stack_front);
      setBack(res.data.stackData.stack_back);
      setDev(res.data.stackData.stack_db);
      setColl(res.data.stackData.stack_col);
    });
  };

  useEffect(() => {
    getStack();
  }, []);
  return (
    <div>
      <li>{front}</li>
      <li>{back}</li>
      <li>{dev}</li>
      <li>{coll}</li>
    </div>
  );
};

export default Stack;
