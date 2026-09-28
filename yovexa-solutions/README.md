# Yovexa Solutions — Corporate Website

A modern, high-converting corporate website for **Yovexa Solutions** — an IT startup and technology partner specializing in web applications, mobile apps, custom software, and business automation.

---

## 🚀 Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS keyframes
- **Typography**: Plus Jakarta Sans & Inter (Google Fonts)

---

## 🎨 Brand Design Tokens

| Token | Hex Value | Role |
|---|---|---|
| Primary Text / Navy | `#0B1B3A` | Brand header & primary text |
| Dark Section | `#081A33` | Hero, CTA, and dark background sections |
| Primary Accent | `#0EA5E9` | Primary action buttons & active states |
| Accent Hover | `#0284C7` | Button hover & link interaction |
| Light Accent | `#E0F2FE` | Category pill & badge backgrounds |
| Page Background | `#F8FAFC` | Clean section backgrounds |
| Text Dark Slate | `#334155` | High-contrast body typography |

---

## 📂 Project Architecture

```
d:/Development/yovexa-solutions/
├── public/
│   ├── yovexa-logo.png      # Official Yovexa logo asset
│   └── ...
├── src/
│   ├── assets/
│   │   └── yovexa-logo.png
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky header (Home, About, Services, Process, Portfolio, Contact)
│   │   ├── Hero.jsx          # Impactful headline + abstract tech visual + CTAs
│   │   ├── TrustStrip.jsx    # 4 honest enterprise value pillars
│   │   ├── About.jsx         # 2-column story + Idea-to-Launch lifecycle flow
│   │   ├── Services.jsx      # 6 interactive service cards with hover lift
│   │   ├── Process.jsx       # 4-step Discover -> Design -> Develop -> Launch
│   │   ├── WhyYovexa.jsx     # 4 value cards (Business-focused, Scalable, UX, Trust)
│   │   ├── Portfolio.jsx     # Filterable project showcase
│   │   ├── ProjectModal.jsx  # Detailed project case study modal
│   │   ├── Contact.jsx       # Validated inquiry form + budget & service selectors
│   │   ├── Footer.jsx        # Dark navy footer with Company & Services columns
│   │   ├── Logo.jsx          # Official brand logo component
│   │   └── DynamicIcon.jsx   # Safe dynamic Lucide icon resolver
│   ├── data/
│   │   ├── company.js        # Contact info, links, placeholders, brand meta
│   │   ├── services.js       # 6 core services with descriptions & features
│   │   ├── process.js        # 4 development phases
│   │   ├── projects.js       # Curated project data & case studies
│   │   └── values.js         # Core value propositions
│   ├── App.jsx               # Single page layout orchestrator + modal state
│   ├── index.css             # Tailwind directives + custom scrollbars & geometric grids
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🛠️ How to Run Locally

1. Open your terminal in `d:/Development/yovexa-solutions`
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 📝 Customization & Editing

- **Edit Services**: Update [`src/data/services.js`](file:///d:/Development/yovexa-solutions/src/data/services.js)
- **Edit Projects & Case Studies**: Update [`src/data/projects.js`](file:///d:/Development/yovexa-solutions/src/data/projects.js)
- **Edit Company Contacts & Social Links**: Update [`src/data/company.js`](file:///d:/Development/yovexa-solutions/src/data/company.js)
- **Connect Backend API / EmailJS**: Add your endpoint in `.env` as `VITE_CONTACT_API_URL`
