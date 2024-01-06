
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://b022210217:Meg04fEK7vmuXK0h@class0.qzwsbgr.mongodb.net/?retryWrites=true&w=majority";

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');

app.use(express.json())
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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.post('/record', (req, res) => {
})

app.post('/login', (req, res) => {
})

app.post('/create-user/students', async (req, res) => {
  const { username, password, student_id, email, role, phone, PA } = req.body;

  try {
    await createStudent(username, password, student_id, email, role, phone, PA);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/create-user/staff', async (req, res) => {
  const { username, password, staff_id, email, role, phone } = req.body;

  try {
    await createStaff(username, password, staff_id, email, role, phone);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
})

app.post('/create-user/admin', async (req, res) => {
  const { username, password, email, role, phone} = req.body;

  try {
    await createAdmin(username, password, email, role, phone);
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

})

app.delete('/', (req, res) => {
  res.status(200).send('Data has been deleted');
})

app.get('/student', (req, res) => {
})

app.get('/attendance-details', (req, res) => {
})

app.get('/report', (req, res) => {
})

app.get('/logout', (req, res) => {  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function createStudent(Username, Password, StudentId, Email, Role, Phone, PA) {
  try {
    const database = client.db('AttendanceSystem');
    const collection = database.collection('Users');

    // Create a user object
    const user = {
      username: Username,
      password: Password,
      student_id: StudentId,
      email: Email,
      role: Role,
      phone: Phone,
      PA: PA,
    };
    // Insert the user object into the collection
    await collection.insertOne(user);

    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createStaff(Username, Password, StaffId, Email, Role, Phone) {
  try {
    const database = client.db('AttendanceSystem');
    const collection = database.collection('Users');

    // Create a user object
    const user = {
      username: Username,
      password: Password,
      staff_id: StaffId,
      email: Email,
      role: Role,
      phone: Phone
    };
    // Insert the user object into the collection
    await collection.insertOne(user);

    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

async function createAdmin(Username, Password, Email, Role, Phone) {
  try {
    const database = client.db('AttendanceSystem');
    const collection = database.collection('Users');

    // Create a user object
    const user = {
      username: Username,
      password: Password,
      email: Email,
      role: Role,
      phone: Phone
    };
    // Insert the user object into the collection
    await collection.insertOne(user);

    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}