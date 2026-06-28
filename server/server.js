const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env
dotenv.config();

const app = express();

// Enable JSON request parsing and CORS using FRONTEND_URL for deployment.
const frontendUrl = process.env.FRONTEND_URL || '*';
app.use(express.json());
app.use(
  cors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

const startServer = async () => {
  await connectDB();

  // Health check route
  app.get('/', (req, res) => {
    res.json({ message: 'Task Tracker API is running' });
  });

  // API routes
  app.use('/api/tasks', taskRoutes);

  // Centralized error handling middleware
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
