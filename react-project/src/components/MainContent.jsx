import axios from "../axios";
import { useEffect, useState } from "react";
import { Card, Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import styles from "../css/MainContent.module.css";

const MainContent = () => {
  const key = sessionStorage.getItem("key");
  const userID = sessionStorage.getItem("userID");
  const setKey = (e) => {
    sessionStorage.setItem("key", e);
  };

  // 데이터베이스에서 기본유저정보 불러오기
  const [userImg, setUserImg] = useState(false);
  const [basicData, setBasicData] = useState(false);
  const getUserData = () => {
    axios.post("/user/basic", { userID: userID }).then((res) => {
      setUserImg(res.data.basicData.user_img.data);
      setBasicData(res.data.basicData);
    });
  };
  // buffer 형태 이미지 변환
  const base64String = btoa(String.fromCharCode(...new Uint8Array(userImg)));

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      {userID === null ? (
        <h3>로그인 후 사용해주세요!</h3>
      ) : (
        <div>
          <div className="basicInfor">
            {basicData ? (
              <h2>{basicData.user_title}</h2>
            ) : (
              <h2>포트폴리오를 작성해주세요!</h2>
            )}

            <div className={styles.introBox}>
              <div className={styles.imgBox}>
                <div className={styles.imgContent}>
                  {userImg && userImg ? (
                    <img
                      src={`data:image/png;base64,${base64String}`}
                      height="150px"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className={styles.introContent}>
                <h5>Contact & Channels</h5>
                <hr />
                <div className={styles.introTextBox}>
                  <div className={styles.introTitle}>- Email</div>
                  <div className={styles.introText}>
                    | {basicData.user_email}
                  </div>
                  {/* <input type="text" className={styles.introText} placeholder='example@gmail.com' onChange={(e)=>{setEmail(e.target.value)}}/> */}
                </div>
                <div className={styles.introTextBox}>
                  <div className={styles.introTitle}>- Github</div>
                  <div className={styles.introText}>
                    | {basicData.user_github}
                  </div>
                  {/* <input type="text" className={styles.introText} placeholder='https://github.com/example' onChange={(e)=>{setGithub(e.target.value)}}/> */}
                </div>
                <div className={styles.introTextBox}>
                  <div className={styles.introTitle}>- Blog</div>
                  <div className={styles.introText}>
                    | {basicData.user_blog}
                  </div>
                  {/* <input type="text" className={styles.introText} placeholder='https://example.tistory.com' onChange={(e)=>{setBlog(e.target.value)}}/> */}
                </div>
              </div>
            </div>
          </div>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey={key}>
                <Nav.Item>
                  <Nav.Link
                    href="intro"
                    onClick={() => {
                      setKey("intro");
                    }}
                  >
                    자기소개
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="stack"
                    onClick={() => {
                      setKey("stack");
                    }}
                  >
                    기술스택
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="project"
                    onClick={() => {
                      setKey("project");
                    }}
                  >
                    프로젝트
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="exp"
                    onClick={() => {
                      setKey("exp");
                    }}
                  >
                    경험
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="edu"
                    onClick={() => {
                      setKey("edu");
                    }}
                  >
                    학력
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Outlet />
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MainContent;
