import axios from "../../axios";
import React, { useEffect, useState } from "react";

const Intro = () => {
  const user_name = sessionStorage.getItem("user_name");
  const userID = sessionStorage.getItem("userID");

  const [introTitle, setIntroTitle] = useState("");
  const [introText, setIntroText] = useState([]);
  const getIntro = () => {
    axios.post("/user/intro", { userID: userID }).then((res) => {
      setIntroTitle(res.data.introData.intro_title);
      setIntroText(JSON.parse(res.data.introData.intro_text));
    });
  };

  useEffect(() => {
    getIntro();
  }, []);
  return (
    <div>
      <h4>{introTitle}</h4>
      <div className="">
        <div className="">
          {introText.map((text) => {
            return (
              <li key={text}>
                <span>{text}</span>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Intro;
