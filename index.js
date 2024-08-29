const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.malve12.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // get a Brand Data
    const userDataBase = client.db("Blog").collection("user");
    const userPostData = client.db("Blog").collection("post");

    app.post("/register", async (req, res) => {
      try {
        const { username, email, password } = req.body;

        console.log(username, email, password);

        const existingUser = await userDataBase.findOne({ email });
        if (existingUser)
          return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = {
          username,
          email,
          password: hashedPassword,
        };

        const result = await userDataBase.insertOne(newUser);
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await userDataBase.findOne({ email });
        if (!user)
          return res.status(400).json({ message: "Invalid credentials" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
          return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ token });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.post("/blog", async (req, res) => {
      try {
        const { Title, Messages, Author, authorId } = req.body;

        // Create new user
        const userPost = {
          Title,
          Messages,
          Author,
          authorId,
        };

        const result = await userPostData.insertOne(userPost);
        res.status(201).json({ message: "Post is successful" });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

    app.get("/allBlog", async (req, res) => {
      const result = await userPostData.find().toArray();
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is Starting.....");
});

app.listen(port, () => {
  console.log(`TestCode server is running on port: ${port}`);
});
