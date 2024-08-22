const User = require("../Models/users.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    User.findOne({ email:email }).then(user => {
      
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      bcrypt.compare(password, user.password).then(valid => {
          console.log(valid)
        if (!valid) {
          return res.status(401).json({ message: "Invalid username or password" });
        }
        let payload = {id : user._id}
        let secret = process.env.JWT_SECRET
        let options = {expiresIn: '10h'}
        const token = jwt.sign(payload, secret, options);
        setTimeout(() => {
            const decodedToken = jwt.verify(token, secret)
        }, 10000);

        return res.status(200).json({ success: true, token: token });
      });
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}
const signUp=async(req, res)=>{
  try {
    const { name, email, password} = req.body; 

    if (!name || !email || !password ) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // check if user already exits with same email
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword});

    await user.save();
    res.status(201).json({ message: "User added successfully" , success: true});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').select('-OTP');
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    const rating = await Rating.findOne({ userId: new ObjectId(req.user.id) });
    user._doc.stars =rating ? rating.stars : 0;
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong"+error, success: false });
  }
}

const updateUserDetails = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    user.name = name;
    user.email = email;
    user.phoneNumber= phoneNumber;
    await user.save();
    res.status(200).json({ success: true, message: "User details updated successfully", 
    data: { name: user.name, email: user.email, phoneNumber: user.phoneNumber } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
}


module.exports = {
  signIn,
  signUp,
  getUser,
  updateUserDetails,
}