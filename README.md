# 🎨 MohdHarish-Portfolio: Modern 3D Animated Portfolio Website (2025)

Welcome to my vibrant and dynamic portfolio! This project showcases my personality through interactive 3D elements, smooth animations, and a touch of quirkiness. Built with cutting-edge technologies to ensure a delightful user experience.

## 🚀 Live Demo

My Website URL: [mohdharish.xyz](mohdharish.xyz)

Check out the live version here: [https://mohd-harish-portfolio.vercel.app/](https://mohd-harish-portfolio.vercel.app/)

## 🛠️ Tech Stack (2025 Edition)

* **Framework**: [Next.js 14 (App Router)](https://nextjs.org/) - with Server Components & Streaming
* **3D Graphics**: [Three.js](https://threejs.org/) with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
* **Physics**: [React Three Rapier](https://pmnd.rs/react-three-rapier/) - for realistic 3D physics
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
* **Animation Libraries**:
  * [GSAP 3.12+](https://greensock.com/gsap/) - for advanced animations
  * [Framer Motion 11](https://www.framer.com/motion/) - for scroll-triggered effects
* **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) - lightweight state management
* **Shader Support**: [glslify](https://github.com/glslify/glslify) - for custom shader effects
* **Email Handling**: [EmailJS](https://www.emailjs.com/)
* **Form Management**: [React Hook Form](https://react-hook-form.com/)
* **Icons**: [Lucide Icons](https://lucide.dev/)
* **Font Handling**: Variable fonts with next/font
* **Deployment**: [Vercel](https://vercel.com/)

## 📁 Project Structure

```
├── public/
│   └── assets/
│       ├── models/       # 3D models for Three.js
│       ├── fonts/        # Custom fonts
│       └── images/       # Static images
├── src/
│   ├── components/
│   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   ├── 3d/           # 3D-related components (Scene, Models)
│   │   ├── ui/           # UI components (Button, Card)
│   │   └── sections/     # Page section components
│   ├── app/              # Next.js App Router pages
│   ├── styles/           # Tailwind CSS configurations and global styles
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions and helpers
│   ├── lib/              # Reusable libraries and utilities
│   └── context/          # React context providers
├── .env.local            # Environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── package.json          # Project metadata and dependencies
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or later)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/MohdHarish-Portfolio.git
   cd MohdHarish-Portfolio
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   ```

   Replace the placeholders with your actual EmailJS credentials.

4. **Run the Development Server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 🎨 Customization

* **Colors & Themes:** Modify `tailwind.config.js` to change the color palette and theme settings.
* **3D Models:** Replace or add new 3D models in the `public/assets/models/` directory and update the corresponding components.
* **Content:** Update text, images, and other content within the `src/app/` directory to reflect your personal information and projects.

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

Great choice! Storing blog posts in a database with an admin UI gives you flexibility, real-time updates, and features like comments/likes. Here’s a high-level roadmap and a starter implementation plan using Supabase (recommended for Next.js, free tier, easy setup):

Step 1: Set Up Supabase
Go to supabase.com and create a free account/project.
Create a table called posts with columns like:
id (UUID, primary key)
title (text)
slug (text, unique)
content (text or markdown)
author (text)
created_at (timestamp)
updated_at (timestamp)
Get your Supabase project URL and anon/public API key.
Step 2: Install Supabase Client
Step 3: Connect to Supabase in Your App
Create a utility file:

Add these keys to your .env.local and Vercel dashboard.

Step 4: Fetch Posts in Your Blog Page
Step 5: Build a Simple Admin UI
Create a /admin route (protect it with a password or Supabase Auth).
Add a form to create/edit posts and save them to Supabase.
Step 6: (Optional) Add Comments/Likes
Create a comments table in Supabase.
Fetch and display comments under each post.
Add a form to submit new comments.
Summary
Supabase is a great choice for a database with Next.js.
You’ll have a real database, an admin UI, and can add features like comments/likes.
You control your content and can update it live!
Let me know if you want a full code example for the admin UI, authentication, or comments!


1. Terminal Enhancements
More custom commands (e.g., projects, skills, contact, joke, clear)
Command history and autocomplete
Animated typing effect for output
2. Blog Improvements
Blog post reactions (like, clap, etc.)
Comments section (with Supabase or third-party)
Blog post sharing (Twitter, LinkedIn, etc.)
Estimated reading progress bar
3. Personalization
Theme switcher (light/dark/system)
Customizable 3D mascot with more animations
Easter eggs (secret commands, hidden pages)
4. Interactive Visuals
3D project showcases or interactive demos
Animated timeline for your journey
Skills radar or animated charts
5. Live Features
Real-time visitor counter or map
Live chat or Q&A bot
GitHub activity feed
6. Professional Touches
Downloadable resume/CV
Testimonials carousel
Certifications and badges
7. Open Source & Community
“Sponsor Me” or “Buy Me a Coffee” integration
Showcase your open source contributions
Let me know if you want code or design ideas for any of these!
