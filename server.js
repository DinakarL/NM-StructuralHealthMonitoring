const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory doctor storage for simplicity (replace with DB later)
const linkedDoctors = {};

// Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.stack);
        return;
    }
    console.log('✅ Connected to MySQL database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
    const { name, email, password, height, weight, bloodGroup, age, dob } = req.body;

    const query = `INSERT INTO users (name, email, password, height, weight, blood_group, age, dob) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(query, [name, email, password, height, weight, bloodGroup, age, dob], (err) => {
        if (err) {
            console.log(err);
            res.send('Error registering user');
        } else {
            sendVerificationEmail(email);
            res.send('Registration successful. Please check your email for verification.');
        }
    });
});

function sendVerificationEmail(userEmail) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Please verify your email address',
        text: `Click the link to verify your email: http://localhost:3000/verify?email=${userEmail}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log('Error sending email:', error);
        else console.log('✅ Verification email sent:', info.response);
    });
}

app.get('/verify', (req, res) => {
    const email = req.query.email;
    const query = 'UPDATE users SET is_verified = true WHERE email = ?';
    db.query(query, [email], (err) => {
        if (err) {
            console.log(err);
            res.send('Error verifying email');
        } else {
            res.send('Email verified successfully! You can now log in.');
        }
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND password = ? AND is_verified = true';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error(err);
            res.send('Database error');
        } else if (results.length === 0) {
            res.send('Invalid credentials or email not verified.');
        } else {
            // Store user email in session-like variable (simulate)
            req.userEmail = email;
            res.redirect(`/link-watch?user=${email}`);
        }
    });
});

app.get('/link-watch', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'link-watch.html'));
});

app.post('/link-success', (req, res) => {
    console.log("⌚ Smartwatch linked successfully (simulated).");
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Add doctor route
app.post('/add-doctor', (req, res) => {
    const { userEmail, doctorName, doctorEmail, doctorPhone } = req.body;

    if (!linkedDoctors[userEmail]) {
        linkedDoctors[userEmail] = [];
    }

    linkedDoctors[userEmail].push({
        name: doctorName,
        email: doctorEmail,
        phone: doctorPhone
    });

    console.log(`✅ Doctor ${doctorName} linked to ${userEmail}`);
    res.send("Doctor linked successfully.");
});

// Simulated health data route
app.get('/health-data', (req, res) => {
    const userEmail = req.query.user;

    const healthData = {
        heartRate: Math.floor(Math.random() * (100 - 60 + 1)) + 60,
        bloodPressure: {
            systolic: Math.floor(Math.random() * (130 - 90 + 1)) + 90,
            diastolic: Math.floor(Math.random() * (90 - 60 + 1)) + 60
        },
        bodyTemperature: (Math.random() * (38.5 - 36.5) + 36.5).toFixed(1),
        steps: Math.floor(Math.random() * 10000),
        sleep: Math.floor(Math.random() * 9) + 1,
        spO2: Math.floor(Math.random() * (100 - 90 + 1)) + 90,
        stress: Math.floor(Math.random() * 100),
    };

    const issues = [];

    if (healthData.heartRate < 60 || healthData.heartRate > 100) {
        issues.push(`Abnormal heart rate: ${healthData.heartRate}`);
    }
    if (healthData.bodyTemperature > 37.5) {
        issues.push(`High body temperature: ${healthData.bodyTemperature}`);
    }
    if (healthData.spO2 < 95) {
        issues.push(`Low SpO2: ${healthData.spO2}`);
    }
    if (healthData.stress > 80) {
        issues.push(`High stress level: ${healthData.stress}`);
    }

    if (issues.length > 0) {
        console.log(`⚠️ Abnormal health data detected for ${userEmail}`);
        sendUserAlert(userEmail, issues);

        const doctors = linkedDoctors[userEmail] || [];
        doctors.forEach(doc => {
            sendDoctorEmail(doc.email, doc.name, userEmail, issues);
        });
    }

    res.json(healthData);
});

// Email alert functions
function sendUserAlert(userEmail, issues) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: '⚠️ Abnormal Health Metrics Detected',
        text: `We detected issues:\n\n${issues.join('\n')}\n\nPlease consult a doctor if needed.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log('Error sending to user:', error);
        else console.log('📧 User notified:', info.response);
    });
}

function sendDoctorEmail(doctorEmail, doctorName, userEmail, issues) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: doctorEmail,
        subject: `🚨 Alert: Your patient ${userEmail} needs attention`,
        text: `Hello Dr. ${doctorName},\n\nThe patient ${userEmail} has abnormal metrics:\n\n${issues.join('\n')}\n\nPlease follow up accordingly.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log('Error sending to doctor:', error);
        else console.log(`📧 Doctor ${doctorEmail} notified:`, info.response);
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
