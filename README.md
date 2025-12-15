# airbnb-clone-project

This project is part of my learning journey, built while following an online course.  
I’m sharing my daily progress here and on LinkedIn.

## 📅 Progress

- **Day 1** – Project setup (base structure, Node.js + Express setup, GitHub initialized)
- (and so on...)

- **Day 2** – Added listing functionality and saved listings to the database  
  (and so on...)

- **Day 3** – Implemented CRUD operations for listings (Create, Read, Update, Delete)  
  (and so on...)

- **Day 4** – Focused on backend functionality and listing management

  - Completed **CRUD operations** for listings
  - Developed **Listing Details page**
  - Implemented **basic server-side validation** for forms
  - Connected to **MongoDB** using Mongoose

- **Day 5** – Added centralized error handling and Joi validation  
  (and so on...)

- **Day 6** – Added **Review model** and **comment functionality** for listings

- **Day 7** – Implemented **flash messages** for success and error notifications
  - Used **connect-flash** with Express.js
  - Displayed success messages on listing creation, update, and deletion
  - Displayed error messages on failed operations or form validation errors

# Airbnb Clone – Day 8 Update 🚀

## 📌 Project Overview

This is a **full‑stack Airbnb Clone** built using the **MERN‑style backend stack (Node.js, Express, MongoDB)** with **EJS** for server‑side rendering.

Till **Day 8**, the main focus was implementing **Authentication & Authorization** features securely and in a structured way.

---

## ✅ Day 8 – What Was Implemented

### 🔐 Authentication

- User **Signup** with validation
- User **Login** using Passport.js (Local Strategy)
- Password hashing using **passport-local-mongoose**
- Persistent login using **sessions**
- Logout functionality

### 🛡 Authorization

- Route protection using custom middleware
- Only **logged‑in users** can:

  - Create listings
  - Add reviews

- Only the **owner of a listing** can:

  - Edit listing
  - Delete listing

---

## 🧩 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js
- Express‑Session
- Connect‑Flash

### Frontend

- EJS (Embedded JavaScript Templates)
- CSS
- Bootstrap

### Validation & Security

- Joi (schema validation)
- Passport‑Local‑Mongoose
- Custom middleware

---

## 📂 Project Structure (Relevant to Day 8)

```
├── Config/
│   └── passport.js
├── Routes/
│   ├── listingRoutes.js
│   └── userRoutes.js
├── controllers/
│   ├── listingController.js
│   └── userController.js
├── middlewares/
│   ├── isOwner.js
│   └── validateRequest.js
├── Validations/
│   └── signupSchema.js
├── models/
│   ├── User.js
│   ├── listings.js
│   └── reviews.js
├── views/
│   └── users/
│       ├── login.ejs
│       └── signup.ejs
└── server.js
```

---

## 🧠 Key Concepts Used

- Passport Local Strategy
- Authentication vs Authorization
- Middleware chaining in Express
- Flash messages for error & success feedback
- MVC folder structure
- Joi schema validation

---

## 🧪 Authentication Flow

1. User signs up → data validated using Joi
2. Password hashed & stored securely
3. User logs in via Passport
4. Session created & maintained
5. Protected routes check login status
6. Ownership middleware checks resource owner

---

## ⚠ Important Middleware

- **isLoggedIn** – restricts unauthenticated access
- **isOwner** – restricts listing edit/delete
- **validateRequest** – validates incoming data

---

## 📝 How to Run the Project

```bash
npm install
npm start
```

Make sure MongoDB is running locally or connected via Atlas.

---

## 📅 Progress Log

- **Day 1–5**: Listings CRUD
- **Day 6**: Reviews system
- **Day 7**: Flash messages & refactoring
- **Day 8**: Authentication & Authorization ✅

---

## 🚧 Upcoming Features

- Image upload (Cloudinary)
- User profile page
- Default user avatar
- Advanced authorization rules

---

## 👨‍💻 Author

**Sandesh Kumar**
Aspiring Full‑Stack Developer

---

⭐ If you like this project, don’t forget to star the repository!

# Day 9 – Project Progress (Airbnb Clone)

## 📅 Day 9 Overview

Today’s focus was on improving the **listing experience** by integrating **image uploads using Cloudinary** and planning the **map functionality** for listing locations.

This day mainly strengthened the backend–frontend connection and prepared the project for real-world features.

---

## ✅ Work Completed

### 1️⃣ Cloudinary Image Upload Integration

- Integrated **Cloudinary** as a third‑party image hosting service.
- Configured Cloudinary using environment variables for security:

  - `CLOUD_NAME`
  - `CLOUD_API_KEY`
  - `CLOUD_API_SECRET`

- Used **multer + multer-storage-cloudinary** to handle image uploads.
- Images are now:

  - Uploaded from the listing form
  - Stored securely on Cloudinary
  - Saved in MongoDB as an image URL

📌 Result: Listings now support **real image uploads instead of static links**.

---

### 2️⃣ Database Improvements

- Ensured each listing correctly stores:

  - `owner` (linked with logged-in user)
  - `image.url` from Cloudinary

- Old incorrect listings were cleared to maintain data consistency.
- Verified owner–listing relationship using MongoDB ObjectId references.

---

### 3️⃣ Bug Fixes & Stability

- Fixed runtime errors related to:

  - Missing `owner` field in listings
  - Undefined properties while rendering EJS templates

- Added proper population of referenced fields to avoid rendering issues.

---

## 🗺️ Upcoming Feature (Next Step)

### Map Functionality (In Progress)

- Plan to add **map support for each listing**.
- Since no credit/debit card is available, the project will use:

  - **Leaflet.js**
  - **OpenStreetMap** (100% free, no API key required)

- Each listing will display:

  - A map
  - A marker showing the listing location

📌 This will enhance the user experience and make listings more interactive.

---

## 🛠️ Tech Stack Used Today

- **Node.js / Express.js**
- **MongoDB & Mongoose**
- **Cloudinary** (Image Hosting)
- **Multer** (File Upload Handling)
- **EJS** (Templating)

## 🎯 Learning Outcome

- Learned how to integrate a third‑party service (Cloudinary) into a full‑stack application.
- Understood the importance of data consistency and schema validation.
- Planned cost‑free alternatives for production‑like features (maps without billing).

---

## ⏭️ Next Goals (Day 10)

- Add Leaflet + OpenStreetMap map to listing show page
- Store latitude & longitude for listings
- Improve UI/UX of listing detail page

---

📌 _This project is being built step‑by‑step as part of a full‑stack learning journey._
