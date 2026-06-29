const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables from the parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const learningRoutes = require('./routes/learningRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const communityRoutes = require('./routes/communityRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/community', communityRoutes);

// Test Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Saarthi API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
