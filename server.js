// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({origin:'*'}));

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB connection string)
mongoose.connect('mongodb://127.0.0.1:27017/E-comm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    email:  String, 
    password:  String, 
    name:  String, 
    age:  Number, 
    mobile:  String, 
    address:  String, 
    workplace:  String, 
    moreDetails:  String, 
    salary: String,
    date:  { type: Date, default: Date.now },
    
  });
  
  // Use the correct name here, change userSchema to UserSchema
  const User = mongoose.model('User', UserSchema);
  

app.get('/show', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/user', async (req, res) => {
    try {
      const { email } = req.query;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      return res.json([{
        email: user.email,
        name: user.name,
        age: user.age,
        mobile: user.mobile,
        address: user.address,
        workplace: user.workplace,
        moreDetails: user.moreDetails,
        date: user.date || new Date().toLocaleDateString(),
      }]);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (email === 'admin@gmail.com' && password === 'admin999') {
        return res.json({ success: true, userType: 'admin' });
      }
      // Check if the user exists based on the email
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Incorrect email or password' });
      }

      return res.json({message: 'login successful'});
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

  });

  app.post('/addinfo', async (req, res) => {
    try {
      const { email, name, age, mobile, address, workplace, moreDetails, salary } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update the user's information
      user.name = name;
      user.age = age;
      user.mobile = mobile;
      user.address = address;
      user.workplace = workplace;
      user.moreDetails = moreDetails;
      user.salary= salary;

      // Save the updated user
      const updatedUser = await user.save();

      res.status(200).json({ message: 'Information added successfully', user: updatedUser });
    } catch (error) {
      console.error('Error adding information:', error);

      // Print the error stack trace for more details
      console.error(error.stack);

      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 // Add this endpoint to handle user updates
app.put('/update/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body; // Include the updated user data in the request body
  
      // Find and update the user in the database
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
  
      res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error('Error during user update:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  app.delete('/delete/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find and delete the user in the database
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (deletedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error during user deletion:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
