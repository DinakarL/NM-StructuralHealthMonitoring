# 🩺 Health Monitoring Web App

A responsive, dark-themed Health Monitoring Web Application that simulates smartwatch integration to display and analyze user health metrics. Users get alerts for abnormal health data and can optionally link a personal doctor for emergency notifications.

## 🚀 Features

- 🔐 **User Registration & Login**
  - New users must verify their email before logging in.
  - Collects personal info: Name, Email, Password, Height, Weight, Blood Group, Age, Date of Birth.

- ⌚ **Simulated Smartwatch Linking**
  - After login, users are prompted to "link" a simulated smartwatch.
  - Health data is fetched at regular intervals (mock data).

- 📊 **Health Metrics Monitoring**
  - Heart Rate
  - Blood Pressure
  - Body Temperature
  - Steps Count
  - Sleep Duration
  - SpO2 (Oxygen Level)
  - ECG (optional)
  - Stress Level

- ⚠️ **Abnormality Detection & Notifications**
  - Alerts users via on-screen alert, Email, and SMS if any metric is abnormal.
  - Optionally notifies a linked doctor (via Email and SMS).

- 👨‍⚕️ **Doctor Linking System**
  - Users can add one or more personal doctors with name, email, and phone number.
  - Doctors get notified in case of emergency.

- 💡 **Health Tips**
  - Tips are displayed next to each metric (only on the dashboard UI).

- 🎨 **Dark Theme UI**
  - Consistent and modern dark theme across all pages.
  - Fully responsive design for desktops and mobile devices.

## 🛠️ Tech Stack

### Frontend:
- HTML, CSS, JavaScript
- Responsive Dark Theme UI

### Backend:
- Node.js with Express.js
- Python

### Database:
- MySQL

### Notifications:
- Nodemailer for Emails
- (Optional) Twilio or any SMS API for SMS alerts

## 📂 Folder Structure
```bash
/project-root
│
├── public/ # Frontend files
│ ├── css/
│ ├── js/
│ └── pages/
│ ├── login.html
│ ├── register.html
│ ├── link-watch.html
│ └── dashboard.html
│
├── routes/ # Express route handlers
├── controllers/ # Logic for routes
├── views/ # Email templates or EJS if used
├── config/ # DB and email configurations
├── models/ # Database query files
├── utils/ # Helper functions (validation, tips, etc.)
├── app.js # Main server file
└── README.md
```

## 🧪 Setup Instructions

### 1. Clone the repo:
```bash
git clone https://github.com/your-username/health-monitoring-app.git
cd health-monitoring-app
```
### 2. Install Dependencies:
```bash
npm install
```
### 3. Configuartion Environment Variable :
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=health_monitor
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
SMS_API_KEY=your_sms_api_key
```
### 4. Start the Server
```bash
server.js
```
### 5. Open the App :
```bash
http://127.0.0.1:3000
```

## 🧠 Future Enhancements
Real-time data from actual smartwatches

Graphical visualization of health history

Chat system between user and doctor

Admin dashboard for global health monitoring

## 🙋‍♂️ Author
**Dinakar L** – 2nd Year CSE Student at TJS Engineering College

## 📸 Screenshots

### 🔐 Login Page

![Login Page](./Screenshots/login.png)

### ⌚ Link Smart Watch

![Dashboard](./Screenshots/Link.png)

### 📊 Dashboard

![Dashboard](./Screenshots/Dashboard.png)

## 👥 User Flow

1. Register & verify email
2. Log in and link simulated smartwatch
3. View health data
4. Get alerts if abnormal values are detected
5. Add personal doctor (optional)

## 📡 Backend API Endpoints

| Method | Route             | Description               |
|--------|------------------|---------------------------|
| POST   | /register         | Register a new user       |
| POST   | /login            | Login with credentials    |
| GET    | /health-data      | Fetch mock health data    |
| POST   | /add-doctor       | Add a personal doctor     |

## 🧪 Demo Account (for testing)

**Email:** demo@example.com  
**Password:** Demo@123

## 🤝 Contributing

Contributions are welcome!  
Feel free to fork the repo, open issues, or submit pull requests. ✨

### 🚀 Steps to Contribute

1. 🍴 **Fork** the repo
2. 🌿 **Create a new branch**  
   `git checkout -b feature-name`
3. 💾 **Commit your changes**
4. 📤 **Push** to your fork
5. 🔁 **Open a Pull Request**

## 🙏 Credits / Acknowledgements

Big thanks to the following tools and resources that made this project possible:

- 🎨 **UI Inspiration**: Modern smartwatch and health dashboard designs
- 📧 **Email Service**: [Nodemailer](https://nodemailer.com/)
- 📦 **Backend Framework**: [Express.js](https://expressjs.com/)
- 🗃️ **Database**: [MySQL](https://www.mysql.com/)
- 🖼️ **Icons & Graphics**: [Font Awesome](https://fontawesome.com/)

## ⚠️ Known Issues / Limitations

- 🔄 Smartwatch data is **simulated**, not real-time.
- 📶 SMS notifications require proper **API key setup**.
- 🐞 Some UI elements may not be fully responsive on all devices.
- ⏳ Data fetch intervals are fixed and not customizable by the user yet.
- 🔐 No multi-factor authentication (MFA) implemented currently.

