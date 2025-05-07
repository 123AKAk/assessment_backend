const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    // Connection options to prevent deprecation warnings and improve performance
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,        // Ensure the latest connection string parser
      useUnifiedTopology: true,     // Use the new connection management engine
      useCreateIndex: true,         // Automatically create indexes (not needed for latest versions)
      useFindAndModify: false,      // Prevent deprecation warning for `findOneAndUpdate()`
      serverSelectionTimeoutMS: 30000, // Increase the timeout duration (30 seconds)
      socketTimeoutMS: 45000,       // Increase socket timeout (45 seconds)
    });

    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process with failure code (1) in case of an error
    process.exit(1);
  }
};

module.exports = connectDB;
