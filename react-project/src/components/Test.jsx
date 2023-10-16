import React, { useState } from 'react'
import axios from '../axios';

function Test() {
  const state = 'form';

  const [data, setData] = useState()
  const [getData, setGetData] = useState('')
  /** input에 입력한 데이터를 server에 전송하는 함수 */
  const sendData = (e)=>{
    e.preventDefault();
    console.log('fuction sendData', data);

    axios
    .post('/getData', {data : data})
    .then(res => setGetData(res.data.auth))
  }
  return (
    <div>
      {state === 'form' ?
        <div>
          <h1>Test</h1>
          <form onSubmit={sendData}>
            <input type="text" onChange={(e)=>{setData(e.target.value)}}/>
            <button type='submit'>폼 데이터 전송하기</button>
          </form>
          {getData}
        </div>
      :
        <div>
          <h1>Test</h1>
          <input type="text" onChange={(e)=>{setData(e.target.value)}}/>
          <button type='submit' onClick={sendData}>Axios 데이터 전송하기</button>
        </div>
      }
    </div>
  )
}

export default Test