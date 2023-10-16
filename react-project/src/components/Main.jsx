import React, { useEffect, useState } from 'react'
import { Card, Nav, Button } from 'react-bootstrap'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import axios from '../axios';
import MainContent from './MainContent'
import Join from './Join'
import Login from './Login'
import MemberList from './MemberList'
import Delete from './Delete'
import Intro from './MainComp/Intro'
import Stack from './MainComp/Stack'
import Project from './MainComp/Project'
import Exp from './MainComp/Exp'
import Edu from './MainComp/Edu'
import Write from './Write';


const Main = () => {
  const userID = sessionStorage.getItem('userID');

  // 로그아웃
  const logout = () => {
    sessionStorage.removeItem('userID')
    sessionStorage.removeItem('key')
    alert("로그아웃 성공!")
    window.location.replace('/')
  }

  const setKey = () => {
    sessionStorage.setItem('key', 'intro')
    window.location.replace('/intro')
  }

  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="/">
            <Link to="/intro">
              <Button variant='light' onClick={setKey}>Main</Button>
            </Link>
            {userID === null ?
              <>
                <Link to="/join">
                  <Button variant='light'>회원가입</Button>
                </Link>
                <Link to="/login">
                  <Button variant='light'>로그인</Button>
                </Link>
              </>
              :
              <>
                {userID === 'admin' ?
                  <>
                    <Link to="/write">
                      <Button variant='light'>작성</Button>
                    </Link>
                    <Link>
                      <Button variant='light' onClick={logout}>로그아웃</Button>
                    </Link>
                    <Link to="/list">
                      <Button variant='light'>회원검색</Button>
                    </Link>
                    <Link to="/delete">
                      <Button variant='light'>회원탈퇴</Button>
                    </Link>
                  </>
                  :
                  <>
                    <Link to="/write">
                      <Button variant='light'>작성</Button>
                    </Link>
                    <Link>
                      <Button variant='light' onClick={logout}>로그아웃</Button>
                    </Link>
                    <Link to="/delete">
                      <Button variant='light'>회원탈퇴</Button>
                    </Link>
                  </>
                }
              </>
            }


          </Nav>
        </Card.Header>
        <Card.Body>
          <Routes>
            <Route path='/' element={<MainContent />}>
              <Route path='intro' element={<Intro />}></Route>
              <Route path='stack' element={<Stack />}></Route>
              <Route path='project' element={<Project />}></Route>
              <Route path='exp' element={<Exp />}></Route>
              <Route path='edu' element={<Edu />}></Route>
            </Route>
            <Route path='/join' element={<Join />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/list' element={<MemberList />}></Route>
            <Route path='/delete' element={<Delete />}></Route>
            <Route path='/write' element={<Write />}></Route>
          </Routes>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Main