const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

const url = `mongodb+srv://muss-admin:Password1@cluster0.kcocq.mongodb.net/mernstach?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(url, connectionParams);
  console.log("Connected to the database ");
} catch (error) {
  console.error(`Error connecting to the database. ${error}`);
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({username}).exec();
  if(userExists){
      res.status(500);
      res.json({
          message: "user already exists"
      })
      return;
  }
  const newUser = new User({
    username,
    password,
  });
  await newUser.save();
  res.send(req.body);
  console.log(newUser);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
