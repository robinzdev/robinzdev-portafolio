import { Project, ExperienceItem, EducationItem, CertificateItem, SkillCategory } from "@/types/portfolio";

export const personalInfo = {
  name: "Robin",
  tagline: "Lic. en Informática · Full-Stack Developer · Diseñador Gráfico",
  bio: "Especializado en diseñar e implementar arquitecturas web resilientes, experiencias interactivas y sistemas visuales con enfoque neobrutalista y retro-tech. Convergencia directa entre rigor de ingeniería de software y sensibilidad gráfica.",
  status: "Disponible para nuevos proyectos y consultoría técnica",
  location: "Castillo, República Dominicana",
  github: "https://github.com/robinzdev",
  email: "contacto@robindev.pro",
  cvUrl: "#cv",
};

export const projectsData: Project[] = [
  {
    id: "siger-fmc",
    title: "SIGER-FMC",
    tagline: "Sistema de gestión y control de recursos operativos",
    description: "Software corporativo para administración de inventario, auditoría de procesos y generación automatizada de informes analíticos con visualización de métricas críticas.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Express", "TypeScript"],
    role: "Software Architect & Backend Developer",
    liveUrl: "https://siger-fmc.app",
    githubUrl: "https://github.com/robinzdev/siger-fmc",
    featured: true,
    year: "2024",
  },
  {
    id: "bitxels-studio",
    title: "Bitxels Studio",
    tagline: "Estudio digital de diseño UI/UX y desarrollo web interactivo",
    description: "Sitio web para agencia creativa con identidad retro-tech, microanimaciones reactivas, sistema de cotizaciones dinámico y optimización de rendimiento a 60 FPS.",
    tags: ["React", "Framer Motion", "Tailwind CSS", "Figma", "Design Systems"],
    role: "Lead Frontend & Art Director",
    liveUrl: "https://bitxels.studio",
    githubUrl: "https://github.com/robinzdev/bitxels-studio",
    featured: true,
    year: "2024",
  },
  {
    id: "noteazy",
    title: "Noteazy",
    tagline: "Sistema colaborativo de notas y gestión de conocimiento",
    description: "Plataforma web integral para organización de notas en tiempo real con sincronización offline-first, editor Markdown enriquecido y categorización jerárquica de proyectos.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    role: "Full-Stack & UI/UX Designer",
    liveUrl: "https://noteazy.app",
    githubUrl: "https://github.com/robinzdev/noteazy",
    featured: true,
    year: "2025",
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Full-Stack Developer & UI Architect",
    company: "Freelance & Consulting",
    location: "Remoto / Santiago, RD",
    period: "2023 - Presente",
    description: "Dirección técnica y desarrollo de aplicaciones web a medida con Next.js, Node.js y bases de datos relacionales, integrando sistemas de diseño consistentes y microinteracciones de alto impacto.",
    achievements: [
      "Implementación de arquitecturas modulares escalables con 99.8% de uptime y tiempos de carga inferiores a 1 segundo.",
      "Diseño de interfaces neobrutalistas personalizadas con cero dependencias visuales genéricas.",
      "Optimización de Core Web Vitals en clientes clave alcanzando puntuaciones superiores a 95 en Lighthouse.",
    ],
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Framer Motion", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    role: "Desarrollador Frontend & Diseñador UI/UX",
    company: "Bitxels Studio",
    location: "Santiago, RD",
    period: "2022 - 2023",
    description: "Construcción de componentes reutilizables, layouts responsivos y flujos de usuario intuitivos en coordinación directa con equipos de producto y desarrollo.",
    achievements: [
      "Creación del sistema de diseño unificado en Figma e implementación fidedigna en React.",
      "Reducción del 35% en tiempo de entrega de interfaces mediante librerías de componentes internos.",
    ],
    skills: ["React", "JavaScript", "Figma", "CSS Modules", "Git"],
  },
  {
    id: "exp-3",
    role: "Analista Programador",
    company: "Desarrollo Corporativo",
    location: "Santiago, RD",
    period: "2021 - 2022",
    description: "Automatización de reportes internos, diseño de esquemas SQL y mantenimiento evolutivo de plataformas empresariales heredadas.",
    achievements: [
      "Migración de procesos manuales a microservicios REST eficientes.",
      "Normalización y auditoría de bases de datos relacionales asegurando integridad transaccional.",
    ],
    skills: ["SQL", "Node.js", "REST APIs", "Docker"],
  },
];

export const educationData: EducationItem[] = [
  {
    institution: "Universidad Autónoma de Santo Domingo (UASD)",
    degree: "Licenciatura en Informática",
    location: "Recinto Santiago, República Dominicana",
    period: "2019 - 2024",
    status: "Graduado / Titulado",
    honors: "Formación integral en ciencias de la computación, estructuras de datos, algoritmia y sistemas distribuidos.",
  },
];

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Arquitectura Frontend y Sistemas de Diseño",
    issuer: "Certificación Profesional",
    year: "2024",
  },
  {
    id: "cert-2",
    title: "Desarrollo Full-Stack con Next.js, Node y PostgreSQL",
    issuer: "Especialización Avanzada",
    year: "2023",
  },
  {
    id: "cert-3",
    title: "UI/UX Product Design & Typography Systems",
    issuer: "Formación de Especialidad",
    year: "2023",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Tecnológico (Full-Stack)",
    category: "core",
    skills: [
      { name: "Next.js (App Router)", level: "Avanzado" },
      { name: "React", level: "Avanzado" },
      { name: "TypeScript", level: "Avanzado" },
      { name: "Node.js", level: "Avanzado" },
      { name: "PostgreSQL", level: "Avanzado" },
      { name: "Tailwind CSS", level: "Avanzado" },
      { name: "Framer Motion", level: "Intermedio / Avanzado" },
      { name: "REST APIs & GraphQL", level: "Avanzado" },
      { name: "Git & GitHub CI/CD", level: "Avanzado" },
    ],
  },
  {
    title: "Creative Toolkit & UI/UX",
    category: "creative",
    skills: [
      { name: "Figma (Auto-layout, Components)", level: "Avanzado" },
      { name: "Adobe Illustrator", level: "Avanzado" },
      { name: "Design Systems & Tokens", level: "Avanzado" },
      { name: "Neobrutalism & Typography", level: "Especialidad" },
      { name: "Prototipado Interactivo", level: "Avanzado" },
      { name: "Accesibilidad Web (WCAG AA)", level: "Avanzado" },
    ],
  },
];
