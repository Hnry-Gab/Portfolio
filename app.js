const express = require('express');

const app = express();
const PORT = 5500;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res)=> {
  res.sendFile(__dirname + "/index.html");
})

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server are running on: http://localhost:5500");
})

