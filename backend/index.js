const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();


mongoose.connect("mongodb://127.0.0.1:27017/demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to database demo");
})
.catch(err => {
  console.error("Failed to connect to MongoDB", err);
});


const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "First name is required"],
  },
  lname: {
    type: String,
    required: [true, "Last name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  month: {
    type: String,
    required: [true, "Month is required"],
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  note: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("users", UserSchema);


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));


app.get("/", (req, res) => {
  res.send("App is Working");
});


app.post("/register", async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const user = new User(req.body);
    let result = await user.save();
    res.status(201).json(result);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});


app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


app.get("/user/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


app.put("/user/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});


app.delete("/user/:email", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { fname: { $regex: query, $options: 'i' } },
        { lname: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.delete("/user/:email", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});