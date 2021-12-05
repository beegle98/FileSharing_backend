const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const multer = require('multer');
const CORS = require('cors');
const fs = require('fs');

const app = express();
const port = 3000

app.set('view engine', 'ejs');

app.use(CORS());
app.use(express.json())
app.use(express.urlencoded({'extended' : true}));
app.use(logger('dev'));

// 저장할 디렉토리 생성
app.listen(port, () => {
    const dir = './uploadedFiles';
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);

    console.log(`Server app listening at http://localhost:${port}`)
})

// 저장 위치 multer 설정
const storage  = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploadedFiles/');
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}__${file.originalname}`);
      // filename에 현재 시간을 추가하여 같은 이름의 file 구별
    },
});
const upload = multer({ storage: storage });
  
app.post('/uploadFile', upload.single("File"), (req,res) =>{
    console.log('Success to upload File');
    res.header("Access-Control-Allow-Origin", "http://localhost:8888")
    res.send({message: "Success to upload File", file: req.file});
})
app.post('/uploadURL', (req,res) =>{
    console.log('Success to upload URL');
    console.log(req.body);
    res.header("Access-Control-Allow-Origin", "http://localhost:8888")
    res.send({message: "Success to upload URL"});
})
  

  