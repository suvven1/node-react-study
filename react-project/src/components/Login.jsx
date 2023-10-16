import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nav = useNavigate();
  const [ID, setID] = useState()
  const [PW, setPW] = useState()

  /** input에 입력한 데이터를 server에 전송하는 함수 */
  const sendData = (e) => {
    e.preventDefault();
    console.log('fuction sendData', ID);
    axios
      .post('/user/login', {
        ID: ID,
        PW: PW
      })
      .then(res => login(res.data.loginResult))
  }

  const login = (data) => {
    if (data) {
      alert(`${data}님 환영합니다!`)
      sessionStorage.setItem('user_name', data)
      sessionStorage.setItem('userID', ID)
      sessionStorage.setItem('key', 'intro')
      window.location.replace('/intro')
    } else {
      console.log(data);
      alert("아이디 또는 비밀번호가 올바르지 않습니다!")
      window.location.replace('/login')
    }
  }
  return (
    <div>
      <h1>로그인</h1>
      <Form onSubmit={sendData}>
        <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label>ID</Form.Label>
          <Form.Control type="id" placeholder="Enter id" onChange={(e)=>{setID(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPW(e.target.value)}}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login