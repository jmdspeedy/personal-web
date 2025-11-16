# James Wu - Personal Portfolio Website

This is the source code for a modern, dynamic, and animated personal portfolio website for James Wu, a software developer. The design is clean, with a dark theme and neon green accents, and features interactive elements and smooth animations to create an engaging user experience.

[**View Live Demo**](https://your-live-demo-url.com) &lt;-- *Replace with your actual deployment URL*

![Portfolio Screenshot](./screenshot.png) &lt;-- *It's recommended to add a screenshot of your portfolio here*

---

## ✨ Features

- **Interactive Animated Background**: A subtle, interactive dot grid background created with HTML5 Canvas that reacts to mouse movement.
- **Dynamic Hero Section**: An eye-catching hero section with a name reveal animation and a looping "pulse" glow effect.
- **Smooth Scrolling & Navigation**: A fixed header that becomes translucent on scroll, with smooth anchor links and a responsive mobile menu.
- **Scroll-Triggered Animations**: Content sections fade and slide into view as the user scrolls, guided by a custom `useAnimateOnScroll` React hook.
- **Polaroid-Style "About Me"**: A creative "About Me" section featuring a tilted polaroid-style photo with a hover effect and a handwritten caption.
- **Timeline Component**: A clean and reusable timeline component to elegantly display work experience and education history.
- **Project Showcase**: A grid of project cards with hover effects that reveal more information and links.
- **Fully Responsive**: A mobile-first design that ensures the portfolio looks great on all devices, from phones to desktops.
- **Centralized Content**: All text and data are managed in a central `constants.ts` file, making it incredibly easy to update content without touching the component logic.

---

## 🛠️ Tech Stack

This project is built with modern frontend technologies, focusing on a lightweight setup without a complex build process.

- **[React](https://react.dev/)**: For building the user interface with a component-based architecture.
- **[TypeScript](https://www.typescriptlang.org/)**: For adding static types to JavaScript, improving code quality and maintainability.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development, configured directly in the HTML.
- **[HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)**: Used to create the dynamic and interactive background animation.
- **[Google Fonts](https://fonts.google.com/)**: For loading the `Mona Sans` (via Bunny Fonts) and `Caveat` typefaces.

---

## 📂 File Structure

The project is organized for clarity and simplicity, with a clear separation of concerns.

```
.
├── components/
│   └── Icons.tsx         # SVG icon components
├── App.tsx               # Main application component, including all sections
├── constants.ts          # Centralized data and UI text for easy customization
├── index.html            # The main HTML entry point with Tailwind CSS config
├── index.tsx             # The React entry point for rendering the app
├── metadata.json         # Project metadata
└── types.ts              # TypeScript type definitions
```

---

## 🚀 Getting Started

This project is designed to run directly in the browser without any build steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Open `index.html`:**
    Simply open the `index.html` file in a modern web browser like Chrome, Firefox, or Safari.

---

## 🎨 Customization

One of the key design goals of this portfolio is to make it incredibly easy to customize with your own information. All personal data, project details, and UI text can be modified in one place: `constants.ts`.

### How to Update Your Information:

1.  **Open `constants.ts`**: This file contains all the content displayed on the site.
2.  **Edit the Objects**:
    -   `personalInfo`: Change your name, role, and biography.
    -   `educationData`: Update your educational background.
    -   `experiences`: List your work experience.
    -   `projects`: Showcase your projects. You can use a service like [picsum.photos](https://picsum.photos/) for placeholder images.
    -   `skills`: List your skills. You can add new icons in `components/Icons.tsx`.
    -   `contact`: Update your email and social media links.
    -   `uiTexts`: Change titles, button labels, and other static text across the site.
3.  **Update the Polaroid Image**:
    -   In `App.tsx`, find the `AboutSection` component.
    -   Replace the `src` attribute of the `<img>` tag with a URL to your own photo.
4.  **Save and Refresh**: Save the files and refresh your browser to see the changes.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. You are free to use, modify, and distribute this template for personal or commercial purposes.
