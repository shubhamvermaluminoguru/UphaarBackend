const UserControllers = require('./Controller/users');
const ProductControllers = require('./Controller/product');
const CartController = require('./Controller/cart')
const ContactController = require('./Controller/contact')
const OccasionController = require('./Controller/occasion')
// const cors = require('cors');
const express = require('express');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 4000; 
const db = require('./db.js');

const authenticate = require('./MiddleWare/authenticate.js');

db.connectDb(process.env.MONGO_URI)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'); // Allow all methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
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
app.post('/sellerSignIn', UserControllers.sellerSignIn);
app.post('/getUser', authenticate, UserControllers.getUser);
app.post('/addProduct', authenticate, ProductControllers.addProduct);
app.post('/addToCart', authenticate, CartController.addProductToCart);
app.post('/removeFromCart', authenticate, CartController.removeFromCart);
app.post('/addContact', authenticate, ContactController.addContact);
app.post('/addOccasion', authenticate, OccasionController.addOccasion);

app.get('/getProducts',authenticate, ProductControllers.getAllProducts);
app.get('/getCart',authenticate, CartController.getCart);
app.get('/getContacts',authenticate, ContactController.getContact);
app.get('/getAllOccasions',authenticate, OccasionController.getAllOccasion);
app.get('/getContactOccasions',authenticate, OccasionController.getContactOccasion);

app.listen(port,() => {
  console.log(`Server running on port ${port}`);
});
  

