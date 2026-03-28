const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

// 🔐 Secret key
const JWT_SECRET = "mysecretkey";

// ✅ CORS (connect frontend)
app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// 🔗 Mock Database (Fallback for Atlas connection issues) ✨
const users = []; 
const applications = []; 

console.log("⚠️ Using Mock Database Mode.");

// 👤 Mock User Logic (Replacing Schema)
// const userSchema = new mongoose.Schema({ ... });
// const User = mongoose.model("User", userSchema);


// 📝 REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.json({ success: false, message: "All fields required" });
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword,
      role
    };

    users.push(newUser);
    console.log("👤 New user registered:", email);

    res.json({ success: true });

  } catch (error) {
    console.error("Registration error:", error);
    res.json({ success: false, message: "Server error" });
  }
});



// 🔐 LOGIN (JWT)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.json({ success: false, message: "Missing fields" });
    }

    const user = users.find(u => u.email === email && u.role === role);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // ✅ CREATE TOKEN
    const token = jwt.sign(
      { name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      token,
      role: user.role
    });

  } catch (error) {
    console.error("Login error:", error);
    res.json({ success: false, message: "Server error" });
  }
});



// 🔒 PROTECTED ROUTE (Dashboard Data)
app.get("/api/dashboard", (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Filter applications for students
    const userApps = applications.filter(app => app.email === decoded.email);

    res.json({
      message: "Access granted",
      user: decoded,
      applications: userApps,
      allApplications: applications // Officer/Recruiter sees all
    });

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// 📩 APPLY FOR JOB (Mock)
app.post("/api/apply", async (req, res) => {
  console.log("📩 Apply Request received");
  try {
    const token = req.headers.authorization;
    if (!token) {
      console.log("❌ No token in headers");
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const { jobTitle, company } = req.body;
    
    console.log(`👤 Student: ${decoded.email} for ${jobTitle} at ${company}`);

    const newApp = {
      id: Date.now().toString(), // String ID for easier matching
      email: decoded.email,
      jobTitle,
      company,
      status: "Applied",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };

    applications.push(newApp);
    console.log(`✅ Application success: ${decoded.email}`);
    
    res.json({ success: true });
  } catch (error) {
    console.error("❌ JWT/Apply Error:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
});

// 🔄 UPDATE APPLICATION STATUS
app.put("/api/applications/status", async (req, res) => {
  try {
    const { id, status } = req.body;
    const appIndex = applications.findIndex(a => a.id === id);
    
    if (appIndex === -1) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    applications[appIndex].status = status;
    console.log(`🔄 Status updated: App ${id} -> ${status}`);
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// 🧪 TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running (MOCK DB MODE) 🚀");
});


// 🚀 START SERVER
app.listen(5001, () => {
  console.log("🚀 Server running at http://localhost:5001");
});