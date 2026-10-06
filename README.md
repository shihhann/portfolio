# Shihan | Developer Portfolio

A production-quality developer portfolio built with **React**, **Vite**, and **Tailwind CSS**.

- **Identity**: Student Developer — Python Django & React Full Stack
- **Curriculum**: Brototype Python Django React Program
- **Core Philosophy**: Learn → Build → Improve → Grow

---

## 🎨 Color System

| Token | Name / Code | Purpose |
| :--- | :--- | :--- |
| **Background** | Night Shift (`#10131A`) | Main canvas background |
| **Surface** | `#191D26` | Card and component surfaces |
| **Border** | `#2A303B` | Subtle technical borders |
| **Accent** | Laser Lemon (`#EFFF4F`) | Signature highlight accent |
| **Primary Text** | `#F5F5F5` | Headings & high-contrast text |
| **Secondary Text**| `#9CA3AF` | Body copy and descriptions |

---

## 🗂️ Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx       # Responsive nav with active section tracker
│   ├── Hero.jsx         # Editorial hero with interactive code/IDE preview
│   ├── About.jsx        # Honest introduction & 4 engineering pillars
│   ├── Skills.jsx       # Grouped technical stack (no fake percentages)
│   ├── Journey.jsx      # Sequential timeline (01 to 09)
│   ├── Projects.jsx     # Reusable project cards with status & links
│   ├── Contact.jsx      # Direct channels, email copy button, & message form
│   ├── Footer.jsx       # Brand identity and back-to-top button
│   └── Icons.jsx        # Custom stroke SVG icons for GitHub & LinkedIn
├── data/
│   ├── skills.js        # Core, Backend, Frontend, Database, and Tools
│   ├── journey.js       # 9-stage learning progression
│   └── projects.js      # Real projects & upcoming milestones
├── App.jsx              # Main assembly
├── index.css            # Tailored styling, fonts, and grid patterns
└── main.jsx             # Entry point
```

---

## 🚀 How to Run Locally

In your terminal:

```bash
# 1. Start the Vite development server
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build
npm run preview
```

---

## ✏️ How to Add Your Information

### 1. Update Projects (`src/data/projects.js`)
Edit `projectsData` to add your real GitHub repositories and live deployments:
```javascript
{
  id: "my-project",
  title: "E-Commerce Backend API",
  status: "Completed",
  description: "Django REST API with PostgreSQL and JWT auth.",
  technologies: ["Python", "Django", "PostgreSQL"],
  githubUrl: "https://github.com/yourusername/project",
  liveUrl: "https://your-demo-url.com",
}
```

### 2. Contact Information
Configured across `Contact.jsx`, `Footer.jsx`, and `Navbar.jsx`:
- **Email**: `muhdshihan.vk@gmail.com`
- **GitHub**: `https://github.com/shihhann/`
- **LinkedIn**: `https://www.linkedin.com/in/muhdshihan`
