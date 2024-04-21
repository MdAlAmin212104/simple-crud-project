const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb database server
//userName : simple-crud-project
// password : aktLQvsNPm1xNE9p




const uri = "mongodb+srv://simple-crud-project:aktLQvsNPm1xNE9p@cluster0.ythezyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userCollections = database.collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userCollections.find()
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user: ', user);

      const result = await userCollections.insertOne(user);
      res.send(result);

    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log("please delete user from database", id);
      const query = {_id: new ObjectId(id) }
      const result = await userCollections.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
      res.send("Welcome to simple server! on this server");
})

app.listen(port, () => {
      console.log(`listening on port but it is not working ${port}`);
})

// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })