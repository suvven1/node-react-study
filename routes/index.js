const express = require('express');
const router = express.Router();
const conn = require('../config/database')

router.get('/', (req, res)=>{
    console.log('main');
    res.sendFile(path.join(__dirname, 'react-project', 'build', 'index.html'))
})

router.post('/getData', (req, res)=>{
    console.log('get data router', req.body);
    res.json({ID : req.body.ID,
              PW : req.body.PW,
              Name : req.body.Name,
              Email : req.body.Email});
})



module.exports = router;