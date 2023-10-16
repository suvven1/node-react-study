import axios from "../axios";
import React, { useEffect, useState } from "react";
import styles from "../css/Write.module.css";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const userID = sessionStorage.getItem("userID");
  const nav = useNavigate();
  // 입력 자료 변수
  const [title, setTitle] = useState();
  const [img, setImg] = useState({ pre: "", data: "" });
  const [email, setEmail] = useState();
  const [github, setGithub] = useState();
  const [blog, setBlog] = useState();
  const [introTitle, setIntroTitle] = useState();
  const [intro1, setIntro1] = useState("");
  const [intro2, setIntro2] = useState("");
  const [intro3, setIntro3] = useState("");
  const [intro4, setIntro4] = useState("");
  let introText = [intro1, intro2, intro3, intro4];
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [dev, setDev] = useState("");
  const [coll, setColl] = useState("");

  // 데이터베이스로 자료 업로드
  const sendData = (e) => {
    e.preventDefault();

    //기본정보 데이터 변수에 담기
    let formData = new FormData();
    formData.append("user_id", userID);
    formData.append("image", img.data);
    formData.append("user_title", title);
    formData.append("user_email", email);
    formData.append("user_github", github);
    formData.append("user_blog", blog);

    // 기본정보 서버 통신
    axios
      .post("/user/setbasic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res.data));

    // 자기소개 서버 통신
    axios.post("/user/setintro", {
      user_id: userID,
      intro_title: introTitle,
      intro_text: JSON.stringify(introText),
    });

    // 기술스택 서버 통신
    axios.post("/user/setstack", {
      user_id: userID,
      stack_front: front,
      stack_back: back,
      stack_db: dev,
      stack_col: coll,
    });
    alert("작성이 완료되었습니다.");
    nav("/intro");
  };

  // input창 추가 로직
  const [prj, setPrj] = useState([]);
  const [prjNum, setPrjNum] = useState(1);
  const addStack = (e) => {
    {
      setPrjNum(prjNum + 1);
      setPrj([...prj, prjNum]);
    }
  };

  // const arr = ['Apple', 'Banana', 'Orange'];
  // let data = JSON.stringify(arr);
  // let data2 = JSON.parse(data);

  return (
    <div className={styles.writeBox}>
      <form onSubmit={sendData}>
        <h2>기본정보</h2>
        <hr />
        <input
          type="text"
          className={styles.introHeader}
          placeholder="ex) 홍길동 | 열정있는 개발자"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className={styles.introBox}>
          <div className={styles.imgBox}>
            <div className={styles.imgContent}>
              {img.pre && <img src={img.pre} height="150px" />}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImg({
                  pre: URL.createObjectURL(e.target.files[0]),
                  data: e.target.files[0],
                });
              }}
            />
          </div>
          <div className={styles.introContent}>
            <h5>Contact & Channels</h5>
            <hr />
            <div className={styles.introTextBox}>
              <div className={styles.introTitle}>- Email</div>
              <input
                type="text"
                className={styles.introText}
                placeholder="example@gmail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className={styles.introTextBox}>
              <div className={styles.introTitle}>- Github</div>
              <input
                type="text"
                className={styles.introText}
                placeholder="https://github.com/example"
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
              />
            </div>
            <div className={styles.introTextBox}>
              <div className={styles.introTitle}>- Blog</div>
              <input
                type="text"
                className={styles.introText}
                placeholder="https://example.tistory.com"
                onChange={(e) => {
                  setBlog(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <hr />
        <br />
        <h2>자기소개</h2>
        <hr />
        <input
          type="text"
          className={styles.selfIntroHeader}
          placeholder="ex) Front-End Developer"
          onChange={(e) => {
            setIntroTitle(e.target.value);
          }}
        />
        <div className={styles.selfIntroBox}>
          <div className={styles.selfIntroTextBox}>
            <li>
              <input
                type="text"
                placeholder="ex) 안녕하세요! 열정적인 개발자 홍길동입니다."
                className={styles.selfIntroText}
                onChange={(e) => {
                  setIntro1(e.target.value);
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="ex) 무엇이든 관심이 생기면 빠르게 도전하고 실행합니다."
                className={styles.selfIntroText}
                onChange={(e) => {
                  setIntro2(e.target.value);
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="ex) 단 한 줄의 코드라도 서비스의 가치를 담으려고 노력..."
                className={styles.selfIntroText}
                onChange={(e) => {
                  setIntro3(e.target.value);
                }}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="ex) 한 번 시작한 일은 끝까지 완수를 해야 하는 성격 탓..."
                className={styles.selfIntroText}
                onChange={(e) => {
                  setIntro4(e.target.value);
                }}
              />
            </li>
          </div>
        </div>
        <hr />
        <br />
        <h2>기술스택</h2>
        <hr />
        <div className={styles.stackBox}>
          <div className={styles.stackContent}>
            <div className={styles.stackTitle}>Front-End</div>
            <div className={styles.stackTextBox}>
              <div>
                <li>
                  <input
                    type="text"
                    placeholder="ex) HTML/CSS/JS..."
                    className={styles.stackText}
                    onChange={(e) => {
                      setFront(e.target.value);
                    }}
                  />
                </li>
              </div>
            </div>
          </div>
          <div className={styles.stackContent}>
            <div className={styles.stackTitle}>Back-End</div>
            <div className={styles.stackTextBox}>
              <div>
                <li>
                  <input
                    type="text"
                    placeholder="ex) Node.js/Flask..."
                    className={styles.stackText}
                    onChange={(e) => {
                      setBack(e.target.value);
                    }}
                  />
                </li>
              </div>
            </div>
          </div>
          <div className={styles.stackContent}>
            <div className={styles.stackTitle}>DevOps</div>
            <div className={styles.stackTextBox}>
              <div>
                <li>
                  <input
                    type="text"
                    placeholder="ex) Oracle/Mysql..."
                    className={styles.stackText}
                    onChange={(e) => {
                      setDev(e.target.value);
                    }}
                  />
                </li>
              </div>
            </div>
          </div>
          <div className={styles.stackContent}>
            <div className={styles.stackTitle}>Collaboration & Tools</div>
            <div className={styles.stackTextBox}>
              <div>
                <li>
                  <input
                    type="text"
                    placeholder="ex) Git/Github..."
                    className={styles.stackText}
                    onChange={(e) => {
                      setColl(e.target.value);
                    }}
                  />
                </li>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <br />
        <h2>프로젝트</h2>
        <hr />
        <div className={styles.projectBox} align="center">
          {prj.map((num) => {
            const prjName = `Project${num}`;
            const prjLink = `GithubLink${num}`;
            return (
              <div className={styles.prjContent}>
                <div className={styles.prjTitleBox}>
                  <input
                    className={styles.prjTitle}
                    type="text"
                    placeholder={prjName}
                  />
                  <input
                    className={styles.prjTitle}
                    type="text"
                    placeholder={prjLink}
                  />
                </div>
                <div className={styles.prjTextBox}>
                  <div>
                    <li>
                      <input
                        type="text"
                        placeholder="ex) 프로젝트요약1"
                        className={styles.prjText}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        placeholder="ex) 프로젝트요약2"
                        className={styles.prjText}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        placeholder="ex) 프로젝트요약3"
                        className={styles.prjText}
                      />
                    </li>
                    <li>
                      <input
                        type="text"
                        placeholder="ex) 프로젝트요약4"
                        className={styles.prjText}
                      />
                    </li>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            className={styles.stackAddBtn}
            onClick={() => {
              addStack("prj");
            }}
          >
            +
          </button>
        </div>
        <hr />
        <br />
        <h2>경험</h2>
        <hr />
        <div className={styles.expBox}></div>
        <hr />
        <br />
        <h2>학력</h2>
        <hr />
        <div className={styles.eduBox}></div>
        <hr />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Write;
