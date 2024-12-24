//express
import express from "express";
const app = express();
app.use(express.json());

//.env
import "dotenv/config";
//mongodb
import mongoose from "mongoose";
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/process.env.DB_NAME');
  console.log("db connected")
}
//listener
app.listen(process.env.SERVER_PORT, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});

app.get('/',(req,res) =>{
  res.send("hello")
})