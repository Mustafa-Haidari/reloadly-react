const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

const url = `mongodb+srv://muss-admin:Password1@cluster0.kcocq.mongodb.net/mernstack?retryWrites=true&w=majority`;
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

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [{
    checked: Boolean,
    text: String,
    id: String
  }, ],
});
const Todos = mongoose.model("Todos", todosSchema);

app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.get("/", (req, res) => {});

app.post("/login", async (req, res) => {
  const {
    username,
    password
  } = req.body;
  const user = await User.findOne({
    username
  }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid user",
    });
    return;
  }
  res.send(req.body);
});

app.post("/register", async (req, res) => {
  const {username,password} = req.body;
  const userExists = await User.findOne({username}).exec();
  if (userExists) {
    res.status(500);
    res.json({
      message: "user already exists",
    });
    return;
  }
  const newUser = new User({username,password,});
  await newUser.save();
  res.send(req.body);
});

app.post("/todos", async (req, res) => {
  const {
    authorization
  } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;

  const user = await User.findOne({
    username
  }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const todos = await Todos.findOne({
    userId: user._id
  }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todos);
});


app.get("/todos", async (req, res) => {
  const {authorization} = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;

  const user = await User.findOne({username}).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({message: "invalid access"});
    return;
  }

  const {todos} = await Todos.findOne({userId: user._id}).exec();
  res.send(todos)
  console.log('todos from db', todos)
});


app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});