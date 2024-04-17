const express = require("express");
const app = express();
const port = 7000;
const cors = require("cors");

// schoolDatabaseUser;
// UyBPrevHPWwnPVfV;

const students = [
  {
    name: "saadaf",
    roll: 1,
    class: "five",
    email: "saadaf@gmail.com",
  },
  {
    name: "yousuf",
    roll: 3,
    class: "five",
    email: "yousuf@gmail.com",
  },
];

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://schoolDatabaseUser:UyBPrevHPWwnPVfV@cluster0.58zpnyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("schoolsDb");
    const studentCollection = database.collection("students");

    // get

    app.get("/students", async (req, res) => {
      const cusor = studentCollection.find();
      const result = await cusor.toArray();
      res.send(result);
    });

    // post

    app.post("/students", async (req, res) => {
      const students = req.body;
      const result = await studentCollection.insertMany(students);
      res.send(result);
      console.log(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// middelware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
