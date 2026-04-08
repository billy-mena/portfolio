# Billy (Olivia) De Jesus-Mena | Learning Experience Architect & CLSSBB

Portfolio and ACP 2025 Learning System showcasing expertise in instructional design, digital learning solutions, and performance improvement.

---

## 📋 Table of Contents

- [About](#about)
- [Key Expertise](#key-expertise)
- [Project Highlights](#project-highlights)
- [ACP 2025 Learning System](#acp-2025-learning-system)
- [Technical Stack](#technical-stack)
- [Installation & Deployment](#installation--deployment)
- [License](#license)
- [Adobe Trademark Disclaimer](#adobe-trademark-disclaimer)
- [Contact & Social](#contact--social)

---

## 📖 About

With **20+ years of experience** in Learning Experience Design (LXD), Instructional Design (ID), and Lean Six Sigma process improvement, this portfolio demonstrates:

- **ADDIE-driven curriculum design** aligned with TESDA standards
- **Interactive learning simulations** for Adobe Creative Cloud applications
- **Performance analytics & data visualization** using Power BI and web technologies
- **Scalable digital learning solutions** for enterprise BPO environments
- **Adobe Certified Professional (ACP)** expertise in Photoshop, Illustrator, and InDesign

**Certifications:**
- Certified Lean Six Sigma Black Belt (CLSSBB)
- Adobe Certified Professional (ACP) — Multiple modules
- ADDIE Instructional Design framework
- Kirkpatrick Model evaluation expertise

---

## 🎯 Key Expertise

### Learning & Instructional Design
- ADDIE model implementation
- Bloom's Taxonomy & Gagné's 9 Events
- Mayer's Multimedia Learning Principles
- Kirkpatrick Model evaluation frameworks
- TESDA curriculum alignment
- SCORM-compliant course development

### Digital Tools & Platforms
- Adobe Creative Cloud (Photoshop, Illustrator, InDesign, Captivate)
- Learning Management Systems (LMS)
- eLearning platforms and SCORM packages
- HTML5/CSS3/JavaScript custom simulations
- Power BI dashboards and reporting
- Google Classroom and collaboration tools

### Professional Skills
- Performance gap analysis
- Training needs assessment
- Curriculum development & content creation
- Stakeholder management and facilitation
- Process improvement and optimization
- Change management and training delivery

---

## 🚀 Project Highlights

### 1. **ACP 2025 Learning System**
   Comprehensive learning platform for Adobe Certified Professional (ACP) certification across three domains:
   
   - **Photoshop Module** — Document setup, layers, masks, content creation, publishing
   - **Illustrator Module** — Document management, workflow, objects, paths, appearance
   - **InDesign Module** — Document setup, master pages, text, tables, visual elements
   
   **Features:**
   - Interactive simulators with task-based learning
   - Assessment quizzes aligned to exam objectives
   - Answer keys and evaluation rubrics
   - Kirkpatrick Model evaluation frameworks
   - EXPERT-PROMPT.md for enhanced AI-assisted learning
   
   [→ View ACP Learning System](./acp-learning-system/)

### 2. **Strategic Portfolio Projects**
   - **Operational Excellence Initiative** — Process improvement case study
   - **Pop Club Digital Campaign** — Design and marketing project
   - **UN Sustainable Development Goals** — Training and advocacy work
   - **Strategic Planning Framework** — Enterprise-level performance management

   [→ View All Projects](./index.html)

### 3. **Data-Driven Dashboards**
   - Chi Sales Performance Tracking
   - Regional analytics for Department of Tourism
   - Training effectiveness metrics
   - Real-time operational KPIs

---

## 📚 ACP 2025 Learning System

The learning system includes:

```
acp-learning-system/
├── index.html                    # Main learning hub
├── README.md                     # System documentation
├── DEPLOY-GUIDE.html             # Deployment instructions
├── EXPERT-PROMPT.md              # Advanced learning prompts
│
├── /photoshop/                   # Photoshop ACP module
│   ├── index.html                # Module home
│   ├── slides/                   # Slide decks
│   ├── simulator/                # Interactive simulators
│   ├── files/                    # Task briefs
│   └── evaluation/               # Assessment tools
│
├── /illustrator/                 # Illustrator ACP module
│   ├── index.html
│   ├── slides/
│   ├── simulator/
│   ├── files/
│   └── evaluation/
│
├── /indesign/                    # InDesign ACP module
│   ├── index.html
│   ├── slides/
│   ├── simulator/
│   ├── files/
│   └── evaluation/
│
├── /shared/                      # Shared theory & resources
│   └── theory.html
│
├── /answer-keys/                 # Assessment answer keys (PDFs)
├── /evaluation/                  # Kirkpatrick evaluation models
└── /assets/                      # CSS, JavaScript, images
    ├── css/global.css
    ├── js/engine.js
    ├── js/progress.js
    └── js/scoring.js
```

---

## 💻 Technical Stack

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Modern layouts with Flexbox/Grid
- **JavaScript (Vanilla)** — Interactive features, progress tracking, quiz engine
- **Responsive Design** — Mobile-first, works on all devices

### Learning Technologies
- **SCORM** — Learning object integration
- **LMS Integration** — Compatible with major platforms
- **Simulations** — Custom-built interactive learning environments

### Data & Analytics
- **Power BI** — Dashboard creation and reporting
- **JSON** — Data structures and configuration
- **localStorage** — Client-side progress persistence

### Deployment
- **GitHub Pages** — Static site hosting
- **Docker** (optional) — Container deployment
- **CDN-ready** — Optimized for global distribution

---

## 🔧 Installation & Deployment

### Local Development

```bash
# Clone the repository
git clone https://github.com/billy-de-jesus-mena/portfolio.git
cd portfolio

# Open in local web server (Python 3)
python -m http.server 8000

# Open in local web server (Node.js)
npx http-server

# Or simply open index.html in your browser
open index.html
```

### GitHub Pages Deployment

```bash
# Push to gh-pages branch
git add .
git commit -m "Deploy portfolio"
git push origin main
```

Your site will be live at: `https://billy-de-jesus-mena.github.io/portfolio`

### Docker Deployment

```dockerfile
FROM nginx:latest
COPY . /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t portfolio .
docker run -p 80:8080 portfolio
```

---

## 📄 License

This project uses a **dual-license approach**:

### **Code License: MIT** ([LICENSE.md](./LICENSE.md))
- **Applies to:** All HTML, CSS, JavaScript, and technical implementations
- **Permissions:** Free to use, modify, distribute, and deploy commercially
- **Use case:** TESDA government deployment, open-source contribution, commercial use
- **No restrictions** on commercial exploitation of the code itself

```
Copyright (c) 2025 Billy (Olivia) De Jesus-Mena
Licensed under the MIT License
```

### **Content License: CC BY-NC 4.0** ([LICENSE-CONTENT.md](./LICENSE-CONTENT.md))
- **Applies to:** Course materials, tutorials, assessments, task briefs, simulations, evaluation frameworks
- **Permissions:** Share and adapt with proper attribution
- **Restrictions:** Non-commercial use only — cannot be sold or used for profit
- **Attribution required** — must credit Billy (Olivia) De Jesus-Mena and ACP 2025 Learning System

```
Copyright (c) 2025 Billy (Olivia) De Jesus-Mena
Licensed under CC BY-NC 4.0
https://creativecommons.org/licenses/by-nc/4.0/
```

---

## ⚠️ Adobe Trademark Disclaimer

**This portfolio and ACP 2025 Learning System are NOT affiliated with, endorsed by, or sponsored by Adobe Inc.**

Adobe, Adobe Creative Cloud, Adobe Experience Cloud, Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Adobe Premiere Pro, Adobe After Effects, Adobe XD, Adobe Express, Adobe Firefly, Adobe Captivate, and all other Adobe product names and logos are registered trademarks or trademarks of Adobe Inc. in the United States and/or other countries.

### Important Notice:
- All references to Adobe products are for **educational and informational purposes only**
- No claim of ownership, affiliation, or endorsement by Adobe is made or implied
- This system is designed to **help learners prepare for Adobe Certified Professional (ACP) exams**
- All Adobe materials, assets, and trademarks are the sole property of Adobe Inc.

### Full Disclaimer:
See [ADOBE-TRADEMARK-DISCLAIMER.md](./ADOBE-TRADEMARK-DISCLAIMER.md) for complete details.

### Official References:
- [Adobe Legal - Permissions & Trademarks](https://www.adobe.com/legal/permissions-and-trademarks.html)
- [Adobe Certified Professional Program](https://learning.adobe.com/certification.html)

---

## 📞 Contact & Social

📧 **Email:** [Your Email]  
💼 **LinkedIn:** [Your LinkedIn Profile]  
🐙 **GitHub:** [Your GitHub Profile]  
🌐 **Website:** [Your Personal Website]

**Location:** Manila, Philippines (Remote-Ready)

---

## 🙏 Acknowledgments

- **TESDA** — Training curriculum standards and guidelines
- **Adobe** — Creative Cloud tools and ACP certification program
- **Open Source Community** — Libraries, frameworks, and tools
- **Learning Theory Pioneers** — Bloom, Gagné, Mayer, Kirkpatrick
- **Colleagues & Mentees** — Continuous feedback and collaboration

---

## 📊 Project Stats

- **20+ years** of professional experience
- **3 major Adobe modules** in ACP 2025 Learning System
- **5+ portfolio projects** showcased
- **100% responsive** across all devices
- **SCORM-compliant** and LMS-ready

---

## 🔐 Security & Privacy

- No tracking or analytics on this site
- No cookies or personal data collection
- Fully static site — no backend or database
- Privacy-first design

---

**Last Updated:** April 2025  
**Version:** 2.0.0  
**Status:** Production Ready

---

© 2025 Billy (Olivia) De Jesus-Mena. All rights reserved.  
Code licensed under [MIT License](LICENSE.md) · Content licensed under [CC BY-NC 4.0](LICENSE-CONTENT.md)
