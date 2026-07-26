# Nexus Digital Studio - Modern Multi-Page Website (Task-2)

A modern, fully responsive multi-page website engineered using **HTML5, CSS3, and Vanilla JavaScript**. Built with a glassmorphism dark aesthetic, dynamic gradient accents, smooth scroll animations, interactive statistics counters, responsive navigation, and robust client-side form validation.

---

## 🌟 Technologies Used

- **HTML5**: Semantic layout tags (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`)
- **CSS3**: Custom variables, Flexbox, CSS Grid, Media Queries, Glassmorphism backdrop-filters, and Keyframe animations.
- **Vanilla JavaScript**: Pure DOM manipulation, scroll observers, statistics counter, navigation state control, and client-side form validation.
- **CDNs**:
  - [Google Fonts (Poppins)](https://fonts.google.com/specimen/Poppins)
  - [Font Awesome 6 (Free Icons)](https://fontawesome.com/)

---

## 📁 Project Folder Structure

```text
Task-2/
│
├── index.html          # Home Page (Hero, Features, Stats, CTA, Footer)
├── about.html          # About Page (Intro, Mission/Vision, Why Choose Us, Team & Skills)
├── contact.html        # Contact Page (Contact Info Cards, Form with JS Validation)
│
├── css/
│   └── style.css       # Complete CSS design system, glassmorphism, responsive grid, animations
│
├── js/
│   └── script.js       # Sticky navbar, mobile menu toggle, active state, form validation, animations
│
├── images/
│   ├── hero_showcase.png  # Generated hero product showcase visual
│   └── about_team.png     # Generated creative agency team visual
│
└── README.md           # Project documentation and setup guide
```

---

## ✨ Features & Enhancements

1. **Responsive Multi-Page Navigation**:
   - Sticky backdrop-blur glass header.
   - Dynamic active page highlighting based on current URL path.
   - Full-screen mobile hamburger drawer menu.

2. **Glassmorphism Design System**:
   - Dark cosmic background with subtle gradient glow overlays.
   - Translucent card containers with `backdrop-filter: blur()`.
   - Smooth hover lift effects (`translateY(-8px)`) and glowing border accents.

3. **Vanilla JavaScript Form Validation (Contact Page)**:
   - **Full Name**: Required, minimum 3 characters.
   - **Email Address**: Required, strictly validated with regex format.
   - **Subject**: Required.
   - **Message**: Required, minimum 10 characters.
   - Red inline error message text below invalid input fields.
   - Input red border highlight state.
   - Prevents default submission if validation fails.
   - Displays success notification alert: **"Message Sent Successfully!"** and resets form fields upon valid submission.

4. **Interactive Animations & Counters**:
   - Scroll-triggered fade-in and slide-up observer animations.
   - Animated statistics counters that count up to targets when scrolled into view.
   - Scroll-to-top button appearing after scrolling down 300px.

---

## 🚀 How to Run the Project

No build step or Node.js runtime environment is required.

1. **Option 1: Direct File Launch**
   - Double click `index.html` to open directly in any modern web browser (Chrome, Firefox, Edge, Safari).

2. **Option 2: Live Server (VS Code Extension)**
   - Open the `Task-2` folder in VS Code.
   - Right click `index.html` and click **Open with Live Server**.

3. **Option 3: Local HTTP Server (Python)**
   - Open terminal inside the project directory and run:
     ```bash
     python -m http.server 8000
     ```
   - Visit `http://localhost:8000` in your web browser.

---

## 📄 License & Credits

Designed & Developed for Task-2 Web Development Internship Requirements.
All rights reserved © 2026 Nexus Digital Studio.
