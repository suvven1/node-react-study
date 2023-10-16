const express = require("express");
const router = express.Router();
const conn = require("../config/database");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 회원가입
router.post("/join", (req, res) => {
  console.log("user join router", req.body);
  let { ID, PW, Name, Email } = req.body;
  let checksql = "select * from project_member where id=?";
  let sql = "insert into project_member values (?, ?, ?, ?)";
  conn.query(checksql, [ID], (err, rows) => {
    console.log("test", rows);
    if (rows.length === 0) {
      conn.query(sql, [ID, PW, Name, Email], (err, rows) => {
        console.log("회원가입 로직", rows);
        if (rows) {
          console.log("회원가입 성공");
          res.json({ joinResult: "success", userID: ID });
        } else {
          console.log("회원가입 실패!", err);
          res.json({ joinResult: "failed" });
        }
      });
    } else {
      console.log("ID 중복");
      res.json({ joinResult: "dup" });
    }
  });
});

// 로그인
router.post("/login", (req, res) => {
  let { ID, PW } = req.body;
  console.log("req :", ID, PW);
  let sql = "select * from project_member where id=? and pw=?";
  conn.query(sql, [ID, PW], (err, rows) => {
    console.log("로그인 로직", rows);
    if (rows.length != 0) {
      console.log("로그인 성공!", rows[0].user_name);
      res.json({ loginResult: rows[0].user_name });
      // req.session.id = rows[0].id;
      // req.session.save(()=>{
      //     res.json({loginResult : rows[0].id})
      // })
    } else {
      console.log("로그인 실패!");
      res.json({ loginResult: false });
    }
  });
});

// 전체회원검색
router.post("/searchall", (req, res) => {
  console.log(req.body.reqUserData);
  if (req.body.reqUserData) {
    console.log("search");
    let sql = "select id, user_name, email from project_member";
    conn.query(sql, (err, rows) => {
      if (rows.length != 0) {
        console.log("전체회원조회성공!", rows);
        res.json({ userData: rows });
      } else {
        console.log("전체회원조회실패!");
        res.json({ userData: false });
      }
    });
  }
});

// 특정회원검색
router.post("/search", (req, res) => {
  console.log(req.body);
  let { ID } = req.body;
  let sql = "select id, user_name, email from project_member where id=?";
  conn.query(sql, [ID], (err, rows) => {
    if (rows.length != 0) {
      console.log("회원검색성공!", rows);
      res.json({ userData: rows });
    } else {
      console.log("회원검색실패!");
      res.json({ userData: [{ id: "", user_name: "", email: "" }] });
    }
  });
});

// 회원탈퇴
router.post("/delete", (req, res) => {
  console.log(req.body);
  let { ID, PW } = req.body;
  let sql = "delete from project_member where id=? and pw=?";
  conn.query(sql, [ID, PW], (err, rows) => {
    if (rows.affectedRows === 1) {
      console.log("회원탈퇴성공!");
      res.json({ deleteResult: true });
    } else {
      console.log("회원탈퇴실패!");
      res.json({ deleteResult: false });
    }
  });
});

// 기본정보 작성
router.post("/setbasic", upload.single("image"), (req, res) => {
  if (req.body.user_id != undefined) {
    // userID -> user_id로 수정
    console.log("test", req.file.buffer);
    console.log("test", req.body);
    let image = req.file.buffer;
    let { user_id, user_title, user_email, user_github, user_blog } = req.body;
    let sql = "insert into tb_user values (?, ?, ?, ?, ?, ?)";
    conn.query(
      sql,
      [user_id, user_title, image, user_email, user_github, user_blog],
      (err, rows) => {
        if (rows) {
          console.log("기본정보 업로드 성공");
        } else {
          console.log("기본정보 업로드 실패", err);
        }
      }
    );
  }
});

// 자기소개 작성
router.post("/setintro", (req, res) => {
  if (req.body.user_id != undefined) {
    // userID -> user_id로 수정
    console.log("setintro : ", req.body);
    let { user_id, intro_title, intro_text } = req.body;
    let searchSql = "select * from tb_intro where user_id = ?";
    let sql = "insert into tb_intro values (?, ?, ?)";
    let updateSql =
      "update tb_intro set intro_title = ?, intro_text = ? where user_id = ?";
    conn.query(searchSql, [user_id], (err, rows) => {
      console.log("test", rows);
      if (rows.length == 0) {
        conn.query(sql, [user_id, intro_title, intro_text], (err, rows) => {
          if (rows) {
            console.log("자기소개 업로드 성공");
          } else {
            console.log("자기소개 업로드 실패", err);
          }
        });
      } else if (rows.length != 0) {
        conn.query(
          updateSql,
          [intro_title, intro_text, user_id],
          (err, rows) => {
            if (rows) {
              console.log("자기소개 업데이트 성공");
            } else {
              console.log("자기소개 업데이트 실패", err);
            }
          }
        );
      }
    });
  }
});

// 기술 스택 작성
router.post("/setstack", (req, res) => {
  if (req.body.user_id != undefined) {
    console.log("setstack : ", req.body);
    let { user_id, stack_front, stack_back, stack_db, stack_col } = req.body;
    let searchSql = "select * from tb_stack where user_id = ?";
    let sql = "insert into tb_stack values (?, ?, ?, ?, ?)";
    let updateSql =
      "update tb_stack set stack_front = ?, stack_back = ?, stack_db = ?, stack_col = ? where user_id = ?";
    conn.query(searchSql, [user_id], (err, rows) => {
      if (rows.length == 0) {
        conn.query(
          sql,
          [user_id, stack_front, stack_back, stack_db, stack_col],
          (err, rows) => {
            if (rows) {
              console.log("기술스택 업로드 성공");
              res.json({ result: true });
            } else {
              console.log("기술스택 업로드 실패", err);
            }
          }
        );
      } else if (rows.length != 0) {
        conn.query(
          updateSql,
          [stack_front, stack_back, stack_db, stack_col, user_id],
          (err, rows) => {
            if (rows) {
              console.log("기술스택 업데이트 성공");
            } else {
              console.log("기술스택 업데이트 실패", err);
            }
          }
        );
      }
    });
  }
});

// 유저 데이터 불러오기
router.post("/basic", (req, res) => {
  if (req.body.userID != undefined) {
    let { userID } = req.body;
    let sql_basic = "select * from tb_user where user_id=?"; // 기본정보 쿼리문

    // 기본정보 가져오기
    conn.query(sql_basic, [userID], (err, rows) => {
      if (rows.length != 0) {
        console.log("basic data get! ");
        res.json({ basicData: rows[0] });
      } else {
        console.log(rows);
      }
    });
  }
});

// 자기소개 정보 가져오기
router.post("/intro", (req, res) => {
  console.log("intro", req.body.userID);
  if (req.body.userID != undefined) {
    let { userID } = req.body;
    let sql_intro = "select * from tb_intro where user_id=?"; // 자기소개 쿼리문
    // 자기소개 가져오기
    conn.query(sql_intro, [userID], (err, rows) => {
      if (rows.length != 0) {
        console.log("Intro data get!");
        res.json({ introData: rows[0] });
      } else {
        console.log(rows);
      }
    });
  }
});

// 스택 정보 가져오기
router.post("/stack", (req, res) => {
  console.log("stack", req.body.userID);
  if (req.body.userID != undefined) {
    let { userID } = req.body;
    let sql_stack = "select * from tb_stack where user_id=?"; // 스택 쿼리문
    // 스택 가져오기
    conn.query(sql_stack, [userID], (err, rows) => {
      if (rows.length != 0) {
        console.log("Stack data get!");
        res.json({ stackData: rows[0] });
      } else {
        console.log(rows);
      }
    });
  }
});

module.exports = router;
