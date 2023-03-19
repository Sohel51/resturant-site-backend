const express = require('express')
const bodyParser = require('body-parser')
const app = express()
// var cors = require('cors')
// const formData = require("express-form-data");

// project file require
const { authUser, authRole } = require('./auth/basicAuth')
const userRouter = require('./routes/userRouter')

app.use(express.json());
app.use(bodyParser.json());
app.set('json spaces', 4);
// app.use(cors());
// app.use(bp.urlencoded({ extended: false }));
// app.use(formData.parse());

// Default Route
app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/dashboard', authUser, (req, res) => {
  res.send('Dashboard Page')
})

app.get('/admin', authUser, authRole, (req, res) => {
  res.send('Admin Page')
})

// load routers
app.use('/api/user', userRouter)

// listening the port
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:5000`)
})