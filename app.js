const express = require('express');
const app = express();
const taskRoute = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
app.use(express.json());
app.use(express.static('./public'));


const port = 5000;

//ルーティング設計
app.use("/api/v1/tasks", taskRoute);

//DBと接続
const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () => {
      console.log("サーバ起動しました");
    });
  } catch (error) {
    console.log(error);
  }
};

//DBを起動する
start();






