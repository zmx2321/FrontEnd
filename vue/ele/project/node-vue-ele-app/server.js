const express = require("express");

//实例化
const app = express();

app.get("/", (req, res) => {
    res.send("Hello world.");
});

//端口号（在本地就是5000）
const port = process.env.PORT || 5000;

//监听端口
/*
app.listen(port, () => {
    //console.log(`Server running on port ${port}`);
});*/
