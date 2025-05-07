const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    // Connection options to prevent deprecation warnings and improve performance
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000,  // Timeout after 30 seconds
        socketTimeoutMS: 45000,          // Socket timeout after 45 seconds
      });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process with failure code (1) in case of an error
    process.exit(1);
  }
};

module.exports = connectDB;
