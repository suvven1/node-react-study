import axios from '../axios';
import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const Delete = () => {
  const userID = sessionStorage.getItem('userID');
  const [ID, setID] = useState()
  const [PW, setPW] = useState()

  const handelDelete = (e)=>{
    e.preventDefault();
    if (userID === ID) {
      axios
        .post('/user/delete', { ID: ID, PW: PW })
        .then(res => userDelete(res.data.deleteResult))
    } else {
      alert('아이디를 다시 입력해주세요!')
      window.location.replace('/delete')
    }
    
  }

  const userDelete = (data)=>{
    if(data){
      alert("탈퇴가 정상적으로 완료되었습니다!")
      sessionStorage.removeItem('userID')
      window.location.replace('/')
    }else{
      alert('비밀번호를 다시 입력해주세요!')
      window.location.replace('/delete')
    }
  }

  return (
    <div>
      <h1>회원탈퇴</h1>
      <p>※ 정확한 탈퇴를 위해 아이디와 비밀번호를 입력해주세요.</p>
      <Form onSubmit={handelDelete}>
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

export default Delete