const mongoose = require('mongoose');

// Connect to MongoDB using the connection string from environment variables.
// This function is designed to work with MongoDB Atlas or a local MongoDB instance.
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error('MONGO_URI is required in environment variables');
    }

    // Connect with Mongoose using recommended options for modern drivers.
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
