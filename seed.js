const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  await User.deleteMany();
  await User.insertMany([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('password', 10),
      role: 'Admin',
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password', 10),
      role: 'User',
    }
  ]);
  console.log('Users seeded');
  process.exit();
};

seedUsers();
