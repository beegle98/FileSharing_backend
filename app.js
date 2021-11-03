const express = require('express');
const logger = require('morgan');
const axios = require('axios');


const app = express();
const port = 8888


app.use(express.json())
app.use(express.urlencoded({'extended' : true}));
app.use(logger('dev'));


app.get('/fileSharing', (req,res) =>{
    console.log('Success' + req.body);
    res.send('file: '+ req.body);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  