// server.js
import express from 'express';
import dotenv from 'dotenv';
import mindbotRoutes from './routes/mindbot.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', mindbotRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('MindJournal API is running');
});



// 🚀 Fake Google login for testing

app.get("/auth/google", (req, res) => {
  // Instead of redirecting to Google, go directly to callback
  res.redirect("/auth/google/callback?code=fakecode123");
});

app.get("/auth/google/callback", (req, res) => {
  // Pretend this came from Google
  const fakeUser = {
    id: "12345",
    email: "testuser@example.com",
    name: "Test User"
  };

  // If you use sessions, you could do: req.session.user = fakeUser
  // For now, just return JSON
  res.json({ success: true, user: fakeUser });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
