const express = require("express");
const app = express();
require("dotenv").config();
const bcrypt = require("bcrypt");
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

    app.get("/blog", async (req, res) => {
      const result = await userDataBase.find().toArray();
      res.send(result);
    });

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

        res.status(200).json("User log in Successfully");
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
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
