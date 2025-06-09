# 🎨 Awesome 3D Animated Portfolio Website

Welcome to my vibrant and dynamic portfolio! This project showcases my personality through interactive 3D elements, smooth animations, and a touch of quirkiness. Built with cutting-edge technologies to ensure a delightful user experience.

## 🚀 Live Demo

Check out the live version here: [https://your-portfolio-url.vercel.app](https://your-portfolio-url.vercel.app)

## 🛠️ Tech Stack

* **Framework**: [Next.js](https://nextjs.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **3D Graphics**: [Three.js](https://threejs.org/)
* **Animations**: [GSAP](https://greensock.com/gsap/)
* **Email Handling**: [EmailJS](https://www.emailjs.com/)
* **Form Management**: [React Hook Form](https://react-hook-form.com/)
* **Icons**: [Lucide Icons](https://lucide.dev/)
* **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
├── public/
│   ├── assets/
│   │   ├── models        # 3D models for Three.js
│   │   ├── fonts         # Custom fonts
│   │   └── images        # Static images
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── 3d/
│   │   │   ├── Scene.jsx
│   │   │   ├── Model.jsx
│   │   │   └── Controls.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── AnimatedText.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Projects.jsx
│   │       └── Contact.jsx
│   ├── pages/
│   │   ├── index.js
│   │   ├── about.js
│   │   ├── projects.js
│   │   ├── contact.js
│   │   └── _app.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── hooks/
│   │   ├── useAnimation.js
│   │   └── use3DModel.js
│   ├── utils/
│   │   ├── three.js
│   │   └── gsap.js
│   └── context/
│       └── ThemeContext.js
├── .env.local
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or later)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository:**

   git clone https://github.com/yourusername/awesome-3d-portfolio.git
   cd awesome-3d-portfolio

2. **Install Dependencies:**

   Using npm:

   npm install

   Or using Yarn:

   yarn install

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory and add the following:

   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id

   Replace the placeholders with your actual EmailJS credentials.

4. **Run the Development Server:**

   Using npm:

   npm run dev

   Or using Yarn:

   yarn dev

   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎨 Customization

* **Colors & Themes:** Modify `tailwind.config.js` to change the color palette and theme settings.
* **3D Models:** Replace or add new 3D models in the `public/assets/models/` directory and update the corresponding components.
* **Content:** Update text, images, and other content within the `src/pages/` directory to reflect your personal information and projects.

## 🚀 Deployment

Deploy your portfolio effortlessly using Vercel:

1. **Sign Up/Login to Vercel:**

   [https://vercel.com/](https://vercel.com/)

2. **Import Project:**

   Connect your GitHub repository and import the project.

3. **Set Environment Variables:**

   In the Vercel dashboard, navigate to your project settings and add the environment variables defined in `.env.local`.

4. **Deploy:**

   Vercel will automatically build and deploy your project. Your portfolio will be live at `https://your-project-name.vercel.app`.

## 📸 Screenshots

![Home Page](public/assets/screenshots/home.png)
*Home page showcasing interactive 3D elements.*

![Projects Page](public/assets/screenshots/projects.png)
*Projects page with animated project cards.*

![Contact Page](public/assets/screenshots/contact.png)
*Contact page featuring a dynamic form.*

## 🙌 Acknowledgements

* Inspired by the [Creative Portfolio Tutorial](https://github.com/a-trost/creative-portfolio)
* 3D models sourced from [Sketchfab](https://sketchfab.com/) and [Poly Pizza](https://poly.pizza/)
* Icons provided by [Lucide Icons](https://lucide.dev/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this `README.md` to better fit your personal style and the unique features of your portfolio. If you need assistance with specific animations, 3D integrations, or any other features, don't hesitate to ask!