import { Project, ExperienceItem, EducationItem, CertificateItem, SkillCategory } from "@/types/portfolio";

export const personalInfo = {
  name: "Robin",
  tagline: "Lic. en Informática · Full-Stack Developer · Diseñador Gráfico",
  bio: "Especializado en diseñar e implementar arquitecturas web resilientes, experiencias interactivas y sistemas visuales con enfoque neobrutalista y retro-tech. Convergencia directa entre rigor de ingeniería de software y sensibilidad gráfica.",
  status: "Disponible para nuevos proyectos y consultoría técnica",
  location: "San Francisco de Macorís, República Dominicana",
  github: "https://github.com/robinzdev",
  instagram: "https://www.instagram.com/robinfdezz/",
  linkedin: "https://www.linkedin.com/in/robinzdev/",
  email: "robinzon.m.g.f@gmail.com",
  cvUrl: "/RobinzonGabino_CV.pdf",
  whatsapp: "https://wa.me/18296407836",
  phone: "+1 (829) 640-7836",
};

export const projectsData: Project[] = [
  {
    id: "siger-fmc",
    title: "SIGER-FMC",
    tagline: "Gestión operativa multi-sucursal y flujo de caja",
    description: "Plataforma en tres capas con PostgreSQL híbrido y aislamiento por RBAC. Resuelve la trazabilidad de reparaciones, control de caja bajo transacciones ACID y consulta pública por QR protegida.",
    tags: ["React", "Vite", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    role: "Full-Stack & Solutions Architect",
    featured: true,
    year: "2026",
  },
  {
    id: "bitxels-studio",
    title: "Bitxels Studio",
    tagline: "Plataforma web brutalista interactiva a 60 FPS",
    description: "Orquestación de renderizado intensivo con Lenis scroll, canvas 2D pausado vía IntersectionObserver y transiciones 3D con Framer Motion. Integra arquitectura i18n contextual y Web Components con Shadow DOM.",
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Figma"],
    role: "Lead Frontend & UI Architect",
    liveUrl: "https://bitxels.dev/",
    featured: true,
    year: "2026",
  },
  {
    id: "noteazy",
    title: "Noteazy",
    tagline: "Productividad y notas en tiempo real offline-first",
    description: "Arquitectura desacoplada con Supabase RLS multi-tenant, índices B-Tree y triggers PostgreSQL. Motor frontend en React 19 con reordenamiento drag-and-drop por histéresis y editor TipTap.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    role: "Full-Stack & Software Architect",
    githubUrl: "https://github.com/robinfdezz/Noteezy.git",
    featured: true,
    year: "2026",
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Desarrollador Web",
    company: "Freelance",
    location: "Remoto / RD",
    period: "2023 - Presente",
    description: "Desarrollo de aplicaciones y sitios web responsivos utilizando React, JavaScript y CSS, integrando APIs y bases de datos con control de versiones en Git y despliegue en entornos de producción.",
    achievements: [
      "Implementación de soluciones web personalizadas para clientes, optimizando experiencia de usuario y rendimiento.",
      "Integración con bases de datos MySQL, consumo de APIs REST y control de versiones con Git.",
      "Despliegue y configuración en entornos de hosting.",
    ],
    skills: ["React", "JavaScript", "SQL", "Git", "CSS"],
  },
  {
    id: "exp-2",
    role: "Desarrollador Frontend & Diseñador UI/UX",
    company: "Bitxels Studio / Freelance",
    location: "Castillo, RD",
    period: "2022 - Presente",
    description: "Construcción de componentes reutilizables, interfaces responsivas y diseño de identidades visuales, logotipos y soluciones gráficas con Figma y Adobe Photoshop/Illustrator.",
    achievements: [
      "Diseño de logotipos, identidades visuales y piezas gráficas alineadas a objetivos de marca.",
      "Creación de interfaces web interactivas y sistemas de diseño consistentes en React.",
    ],
    skills: ["React", "Figma", "CSS", "Git", "Design Systems"],
  },
  {
    id: "exp-3",
    role: "Digitador & Soporte Técnico",
    company: "Politécnico María Paulino Viuda Pérez",
    location: "Castillo, RD",
    period: "2025 - Presente",
    description: "Planificación, organización y digitación de documentación institucional con Microsoft Office, junto al soporte técnico básico de equipos informáticos y gestión de impresión.",
    achievements: [
      "Gestión y procesamiento de información académica y administrativa con confidencialidad y precisión.",
      "Soporte técnico preventivo en hardware, periféricos y equipos de impresión en red.",
    ],
    skills: ["Hardware", "Software", "Redes"],
  },
  {
    id: "exp-4",
    role: "Servicio al Cliente & Soporte Técnico (Part-Time)",
    company: "Franyer Mobile Center",
    location: "Castillo, RD",
    period: "2022 - 2024",
    description: "Diagnóstico y reparación de equipos electrónicos, instalación y configuración de software, y resolución de incidencias técnicas.",
    achievements: [
      "Diagnóstico y reparación de fallas en dispositivos y equipos electrónicos.",
      "Resolución oportuna de incidencias técnicas y asistencia personalizada al cliente.",
    ],
    skills: ["Hardware", "Software"],
  },
];

export const educationData: EducationItem[] = [
  {
    institution: "Universidad Autónoma de Santo Domingo (UASD)",
    degree: "Licenciatura en Informática",
    location: "San Francisco de Macorís, República Dominicana",
    period: "2020 - 2024",
    status: "Titulado",
    honors: "Formación integral en ciencias de la computación, estructuras de datos, programación y sistemas de información.",
  },
];

export const certificatesData: CertificateItem[] = [
  {
    id: "cert-1",
    title: "Formación en Programación (Front-End)",
    issuer: "Oracle Next Education (ONE) de Alura Latam",
    year: "2023",
  },
  {
    id: "cert-2",
    title: "Front End G5 – ONE",
    issuer: "Oracle Next Education & Alura",
    year: "2023",
  },
  {
    id: "cert-3",
    title: "React G5 – ONE",
    issuer: "Oracle Next Education & Alura",
    year: "2023",
  },
  {
    id: "cert-4",
    title: "Manejo de Paquetes Ofimáticos",
    issuer: "Udemy & Autoaprendizaje",
    year: "2019 - Actualidad",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Lenguajes & Frameworks",
    category: "core",
    skills: [
      { name: "React", level: "Avanzado" },
      { name: "Vite", level: "Avanzado" },
      { name: "Next.js", level: "Avanzado" },
      { name: "TypeScript", level: "Avanzado" },
      { name: "JavaScript", level: "Avanzado" },
      { name: "Tailwind CSS", level: "Avanzado" },
      { name: "HTML & CSS", level: "Avanzado" },
      { name: "Node.js", level: "Avanzado" },
      { name: "Express", level: "Avanzado" },
      { name: "PostgreSQL", level: "Avanzado" },
      { name: "MySQL", level: "Avanzado" },
      { name: "Git & GitHub", level: "Avanzado" },
      { name: "Supabase", level: "Avanzado" },
    ],
  },
  {
    title: "Diseño & Herramientas",
    category: "creative",
    skills: [
      { name: "Figma", level: "Avanzado" },
      { name: "Adobe Photoshop", level: "Avanzado" },
      { name: "Adobe Illustrator", level: "Avanzado" },
      { name: "Design Systems", level: "Avanzado" },
      { name: "Framer", level: "Intermedio" },
      { name: "WordPress", level: "Intermedio" },
      { name: "Microsoft Office", level: "Avanzado" },
    ],
  },
];
