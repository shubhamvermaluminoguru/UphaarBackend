const UserControllers = require('./Controller/users');

const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000; 
const db = require('./db.js');

const authenticate = require('./MiddleWare/authenticate.js');


db.connectDb(process.env.MONGO_URI)

app.use(express.json());
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.path);
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/',(req, res, next) => {
  res.status(200).json({ message: 'Hello server is working fine' });
}); 

app.post('/signUp', UserControllers.signUp);
app.post('/signIn', UserControllers.signIn);
app.post('/getUser', authenticate, UserControllers.getUser);


app.listen(port,() => {
  console.log(`Server running on port ${port}`);
});
  

