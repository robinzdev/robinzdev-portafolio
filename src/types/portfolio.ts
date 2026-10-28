export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  location: string;
  period: string;
  status: string;
  honors?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export interface SkillCategory {
  title: string;
  category: "core" | "creative" | "tools";
  skills: {
    name: string;
    level: string;
    icon?: string;
  }[];
}

