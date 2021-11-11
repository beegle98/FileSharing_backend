const express = require('express');
const logger = require('morgan');
const axios = require('axios');


const app = express();
const port = 3000


app.use(express.json())
app.use(express.urlencoded({'extended' : true}));
app.use(logger('dev'));


app.post('/file/upload', (req,res) =>{

    
    console.log('Success to upload');
    console.log(req.headers);
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "http://localhost:8888")
    res.send({message: "Success to upload"});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  

  