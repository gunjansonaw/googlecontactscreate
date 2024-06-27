const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

// Use the new promise-based syntax for mongoose.connect
mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.0/demo", {
  dbName: "demo",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to database demo");

  // Start the Express server only after the database connection is successful
  app.listen(5000, () => {
    console.log("App listening at port 5000");
  });
})
.catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

// Define the User schema and model
const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("users", UserSchema);
User.createIndexes();

// Middleware setup
app.use(express.json());
app.use(cors());

// Define routes
app.get("/", (req, res) => {
  res.send("App is Working");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      res.send(req.body);
      console.log(result);
    } else {
      console.log("User already registered");
    }
  } catch (e) {
    res.send("Something Went Wrong");
  }
});
