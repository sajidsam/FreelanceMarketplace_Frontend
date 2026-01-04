# Freelance Marketplace

A modern, responsive **Freelance Marketplace** web application built with **React**, **Tailwind CSS**, and **React Router**. This platform allows users to browse, add, and manage freelance tasks in a clean and interactive interface.

**Live Demo:** [Click here](https://freelance-marketplace-frontend-lemon.vercel.app/)

---

## Features

* **Home Page** – Welcomes users with branding and main navigation.
* **Add Task** – Users can add new freelance tasks.
* **Browse Tasks** – Explore available tasks posted by others.
* **My Tasks** – Manage tasks created by the logged-in user.
* **Responsive Navbar** – Navigation works across devices.
* **Reusable Layout** – Navbar and Footer appear consistently across pages.
* **Interactive UI** – Smooth hover effects and active link highlighting using `NavLink`.

---

## Tech Stack

* **Frontend:** React, React Router v6
* **Styling:** Tailwind CSS
* **Icons:** react-icons
* **Deployment:** Vercel

---

## Folder Structure

```
src/
├── Components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ...
├── Pages/
│   ├── Home.jsx
│   ├── AddTask.jsx
│   ├── BrowseTasks.jsx
│   └── MyTasks.jsx
├── Layout/
│   └── Layout.jsx
├── Routes/
│   └── AllRoutes.jsx
├── App.jsx
└── main.jsx
```

---

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd freelance-marketplace
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view in your browser.

---

## Deployment

This project is deployed on **Vercel**. Changes pushed to the main branch automatically update the live site.

**Live Link:** [https://freelance-marketplace-frontend-lemon.vercel.app/](https://freelance-marketplace-frontend-lemon.vercel.app/)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is open-source and available under the MIT License.
