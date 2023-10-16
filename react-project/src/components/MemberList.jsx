import axios from '../axios'
import React, { useEffect, useState } from 'react'

const MemberList = () => {
  const [userData, setUserData] = useState([{}]);
  const searchAll = ()=>{
    axios
    .post('/user/searchall',{reqUserData : true})
    .then(res => setUserData(res.data.userData))
  }

  useEffect(()=>{
    searchAll();
  },[])

  const [ID, setID] = useState('')
  const searchUser = (e)=>{
    e.preventDefault();
    if(ID != ''){
    axios
    .post('/user/search', {ID : ID})
    .then(res => search(res.data.userData))
    }else{
      alert('아이디를 입력해주세요!')
    }
  }

  const search = (data)=>{
    if(data[0].id != ''){
      setUserData(data);
      setID('');
    }else{
      setUserData(data);
      alert('존재하지 않는 회원입니다!')
    }
  }
  let num = 0
  return (
    <div>
      <h1>회원검색</h1>
      <form onSubmit={searchUser}>
      <input type="text" placeholder='아이디를 입력해주세요.' value={ID} onChange={(e)=>{setID(e.target.value)}}/>
      <input type="submit" value="검색"/>
      </form>
      <hr/>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th>NO</th>
            <th>아이디</th>
            <th>이름</th>
            <th>E-mail</th>
          </tr>
          {userData.map((data) => {
            num++
            return (
              <tr key={num}>
                <td>{num}</td>
                <td>{data.id}</td>
                <td>{data.user_name}</td>
                <td>{data.email}</td>
              </tr>)
          })}
        </tbody>
      </table>
    </div>
  )
}

export default MemberList