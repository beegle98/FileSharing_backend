const express = require('express');
const logger = require('morgan');
const axios = require('axios');


const app = express();
const port = 3000


app.use(express.json())
app.use(express.urlencoded({'extended' : true}));
app.use(logger('dev'));


app.post('/fileSharing', (req,res) =>{
    res.header("Access-Control-Allow-Origin", "http://localhost:8888")
    console.log('Success fileSharing');
    res.send({message: "Success"});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  

  