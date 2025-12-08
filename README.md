# 🍽️ Restaurant Web Application

A full-stack restaurant management system featuring a responsive UI, user authentication, menu management, table booking, and an admin dashboard.

---

## 🎥 Project Demo

[Watch the demo](./Website%20Video/Foodie.mp4)

> Duration: 2:45 — shows full website functionality

## 📌 Overview

This project is a complete restaurant web application where users can browse the menu, book tables, manage their profiles, and receive booking updates.  
Admins have full control over users, menu items, and table bookings.

The front-end design follows a provided **Figma UI**.

---

## 🎨 Front-End Features

### 🔹 Public Pages
- Home Page (2–3 sections from Figma design)
- About Us
- Our Menu
- Book a Table
- Login
- Register

### 🔹 User Pages
- Profile Page (view & update profile)
- My Bookings (history + current booking status)

### 🔹 Admin Pages
- Admin Dashboard
- Manage Users
- Manage Menu Items (add, delete, update)
- Manage Table Bookings (accept/reject)

---

## ⚙️ Back-End Features

### 🔐 Authentication
- Login & Register
- Two roles:
  - User
  - Admin

### 🧾 Menu Management
Admins can:
- Add menu items
- Update menu items
- Delete menu items

### 🪑 Table Booking System
- Only logged-in users can book tables
- Admin receives booking requests
- Admin can confirm or reject
- Users receive notifications when booking status updates
- Users can view booking history & current status

### 👤 Profile Management
- View profile information
- Update personal data

### 🛠️ Admin Capabilities
- View all users
- View all table bookings
- Approve or reject bookings

---

## 🧩 Technologies Used
### Front-End
- React
- Tailwind

### Back-End
- Laravel (PHP)
- MySQL
- JWT Authentication

---

## 🚀 How to Run

### 1. Clone the repository
```sh
git clone https://github.com/Eslam-Hamada1/Restaurant-Full-Stack-Website.git
cd `repo_name`
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables
Create a `.env` file:
```
DATABASE_URL=
JWT_SECRET=
```

### 4. Start the server
```sh
npm start
```

---

## 🤝 Author
**Eslam Hamada** – Full-Stack Developer


