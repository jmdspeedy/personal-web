
import type { Project, PersonalInfo, Education, Experience, Skill, Contact, UITexts } from './types';
import { CodeIcon } from './components/Icons';

export const personalInfo: PersonalInfo = {
  name: "James Wu",
  role: "Bridging Technology & People, Across Cultures.",
  bio: "Hi, I’m James Wu, I am currently residing in Japan. I am a multilingual IT professional with a background in Computer Science (Cybersecurity) from the University of Queensland. I’m passionate about bridging technology and people—whether that means troubleshooting complex systems, building intuitive applications, or helping global teams communicate effectively.\n\nMy experience spans from cybersecurity analysis and IT support to application development and network management, combining technical precision with creative problem-solving. Fluent in English, Chinese, and Japanese, I enjoy working in cross-cultural environments and continuously learning new tools that make technology more secure, efficient, and human-centered.",
  avatarUrl: "https://i.imgur.com/4guhfnE.png"
};

export const educationData: Education[] = [
 {
    degree: "Bachelor of Computer Science",
    institution: "University of Queensland",
    period: "2021 - 2024",
    details: [
      "GPA: 5.3/7, Cyber Security Major"
    ]
  },
  {
    degree: "High School Diploma",
    institution: "William Aberhart High School",
    period: "2017 - 2020",
    details: [
      "Honour Roll Student"
    ]
  }
];

export const experiences: Experience[] = [
  {
    role: "IT Technician",
    company: "My IT Shop Noosa Pty Ltd.",
    period: "2024-2025",
    description: "Noosa, QLD, Australia"
  },
  {
    role: "Cyber Security Intern",
    company: "Cinema On The Fly Pty Ltd.",
    period: "2023",
    description: "Brisbane, QLD, Australia"
  }
];

export const projects: Project[] = [
  {
    title: "SuiReader",
    description: "An Android mobile application that helps users check and manage their Japanese IC card balance and history using NFC. Designed with a minimalist, Wallet-inspired UI.",
    tags: ["Kotlin", "Java", "Mobile Dev", "Figma"],
    imageUrl: "https://i.imgur.com/GGUmerD.png",
    link: "#"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application that helps teams organize their projects and track progress in real-time.",
    tags: ["Next.js", "TypeScript", "Firebase", "GraphQL"],
    imageUrl: "https://picsum.photos/seed/taskapp/800/600",
    link: "#"
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, built with D3.js and React, offering various chart types.",
    tags: ["React", "D3.js", "JavaScript"],
    imageUrl: "https://picsum.photos/seed/dataviz/800/600",
    link: "#"
  },
   {
    title: "Blogging Platform API",
    description: "A RESTful API for a blogging platform, featuring user authentication, post management, and a comment system.",
    tags: ["Python", "Flask", "Docker"],
    imageUrl: "https://picsum.photos/seed/blogapi/800/600",
    link: "#"
  }
];

export const skills: Skill[] = [
  { name: "Kotlin", icon: CodeIcon },
  { name: "Python", icon: CodeIcon },
  { name: "C", icon: CodeIcon },
  { name: "C#", icon: CodeIcon },
  { name: "Java", icon: CodeIcon },
  { name: "TypeScript", icon: CodeIcon },
  { name: "JavaScript", icon: CodeIcon },
  { name: "React", icon: CodeIcon },
  { name: "Tailwind CSS", icon: CodeIcon },
  { name: "PostgreSQL", icon: CodeIcon },
  { name: "Firebase", icon: CodeIcon },
  { name: "Docker", icon: CodeIcon },
  { name: "Git", icon: CodeIcon },
  { name: "Figma", icon: CodeIcon },
  { name: "AWS", icon: CodeIcon },
];

export const contact: Contact = {
  email: "jameswu.techno@gmail.com",
  github: "https://github.com/jmdspeedy",
  linkedin: "https://www.linkedin.com/in/james-wu-4b6b54244/",
};

export const uiTexts: UITexts = {
  navLinks: [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ],
  aboutSection: {
    title: 'About Me',
    polaroidCaption: 'Nara, Japan, 2025.',
    skillsTitle: 'Core Skills',
  },
  experienceSection: {
    title: 'My Journey',
    experienceTitle: 'Experience',
    educationTitle: 'Education',
  },
  projectsSection: {
    title: 'Featured Projects',
  },
  contactSection: {
    title: "LET'S WORK TOGETHER",
    paragraph: "Currently open for freelance opportunities and interesting collaborations. Drop a line if you want to build something neon.",
  },
  footer: {
    copyrightText: 'Designed & Built with Passion.',
  },
};
