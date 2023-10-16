import React, { useEffect, useRef, useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from '../axios';
import { useNavigate } from 'react-router-dom';


const Join = () => {
  /* 
    1. axios를 이용해서 server에 연동 
      - post 방식 
      - http://localhost:3333/user/join (짧게 줄이는거 가능)
      - userData 객체 보내줌 

    2. server 단 (routes - user.js)
      - join 라우터에서 DB연동 작업 
      - insert 회원가입 (필수 ★)
      - ID 중복체크 (선택)

    3. 만약, 회원가입에 성공했다면?
    - result : success, id : 사용자 id 

    만약에 실패했다면?
    - result : failed 
    
    (선택) 아이디가 중복이라면?
    - result : dup 
    
    4. console창에 결과 값 확인 후, 
    - 성공 시? 메인으로, 세션(브라우저에 - sessionStorage) 저장 
    - 실패 & 중복 => alert 실패 => join 창으로 이동     

      */

  const nav = useNavigate();
  // const [ID, setID] = useState()
  // const [PW, setPW] = useState()
  // const [Name, setName] = useState()
  // const [Email, setEmail] = useState()

  /** input에 입력한 데이터를 server에 전송하는 함수 */
  // const handleJoin = (e)=>{
  //   e.preventDefault();
  //   console.log('fuction sendData', ID);
  //   axios
  //   .post('/handleJoin', {ID : ID,
  //                      PW : PW,
  //                      Name : Name,
  //                      Email : Email})
  //   .then(res => join(res.data.joinResult))
  // }

  // const join = (data)=>{
  //   if(data){
  //     alert("환영합니다!")
  //     nav('/')
  //   }else{
  //     alert("다시시도해주세요!")
  //   }
  // }

  const idRef = useRef();
  const pwRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const [userData, setUserData] = useState({});

  const handleJoin = (e)=>{
    e.preventDefault();
    setUserData(
      {ID : idRef.current.value,
        PW : pwRef.current.value,
        Name : nameRef.current.value,
        Email : emailRef.current.value}
    )
  }

  useEffect(()=>{
    if(userData.ID != undefined){
    console.log('fuction sendData', userData);
    axios
    .post('/user/join', userData)
    .then(res => join(res.data))}
  },[userData])

  const join = (data)=>{
    if(data.joinResult === 'success'){
      alert("환영합니다!")
      nav('/')
    }else if(data.joinResult === 'failed'){
      alert("다시시도해주세요!")
      nav('/join')
    }else if(data.joinResult === 'dup'){
      alert("중복된 아이디입니다!")
      idRef.current.value = '';
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <Form onSubmit={handleJoin}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          {/* <Form.Control type="text" placeholder="Enter id" onChange={(e)=>{setID(e.target.value)}}/> */}
          <Form.Control type="text" placeholder="Enter id" ref={idRef}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          {/* <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPW(e.target.value)}} /> */}
          <Form.Control type="password" placeholder="Password" ref={pwRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>이름</Form.Label>
          {/* <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}} /> */}
          <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>Email</Form.Label>
          {/* <Form.Control type="email" placeholder="Enter Email Address" onChange={(e)=>{setEmail(e.target.value)}} /> */}
          <Form.Control type="email" placeholder="Enter Email Address" ref={emailRef} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Join Us!
        </Button>
      </Form>
    </div>
  )
}

export default Join