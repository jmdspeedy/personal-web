import type { FC, SVGProps } from 'react';

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface Experience {
  role:string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
}

export interface Skill {
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface Contact {
  email: string;
  github: string;
  linkedin: string;
  buyMeACoffee?: string;
}

// Kept for reusability of the Timeline component
export interface TimelineItemData {
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface UITexts {
  navLinks: NavLink[];
  aboutSection: {
    title: string;
    polaroidCaption: string;
    skillsTitle: string;
  };
  experienceSection: {
    title: string;
    experienceTitle: string;
    educationTitle: string;
  };
  projectsSection: {
    title: string;
  };
  contactSection: {
    title: string;
    paragraph: string;
  };
  footer: {
    copyrightText: string;
  };
}