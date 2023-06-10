const express = require('express');
const app = express();

app.get('/testing',(req,res)=>{
res.send("here I am chekcing if basix structue is working.")
})
app.listen(8080,()=>{
  console.log("app is running on port 8080");
})
