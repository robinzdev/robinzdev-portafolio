# Portafolio Profesional - Robin Z. (robinzdev)

Sitio web personal y portafolio interactivo de Robin, Licenciado en Informática (Cum Laude, UASD) y Diseñador Gráfico. Proyecto desarrollado con arquitectura web moderna en Next.js, React 19, Tailwind CSS v4 y Framer Motion, implementando una línea estética neobrutalista y retro-tech de alto contraste con tipografías Unbounded y Sora.

## Demostración y Enlaces

- Repositorio: [github.com/robinzdev/robinzdev-portafolio](https://github.com/robinzdev/robinzdev-portafolio)
- Perfil de GitHub: [github.com/robinzdev](https://github.com/robinzdev)

## Stack Tecnológico

- Framework: Next.js 16 (App Router, Turbopack)
- Librería de UI: React 19 (Server y Client Components)
- Lenguaje: TypeScript (modo estricto sin tipos implicitos)
- Estilos: Tailwind CSS v4 con variables CSS nativas y variantes de tema
- Animaciones: Framer Motion
- Renderizado interactivo: HTML5 Canvas 2D optimizado con requestAnimationFrame y IntersectionObserver
- Iconografía: Lucide React y componentes SVG dedicados
- Tipografías: Google Fonts (Unbounded para titulares y elementos de alto impacto; Sora para lectura continua y ergonomía visual)

## Características Principales

1. Sistema de diseño neobrutalista y retro-tech:
   - Bordes sólidos de 2px, sombras de bloque sin difuminar (hard shadows) y microinteracciones de encaje físico ("snap-in") en botones.
   - Jerarquía tipográfica calculada: Unbounded en mayúsculas para titulares, logo y botones; Sora en pesos 300 a 800 para descripciones y cuerpo de texto.
   - Paleta de color centralizada en variables CSS (--color-accent-brand: #76C457), permitiendo mantenimiento global instantáneo desde globals.css.

2. Fondo de cuadrícula interactiva (MovingGrid):
   - Motor Canvas 2D con desplazamiento suave continuo y cambio de orientación al interactuar.
   - Detección de celda bajo el cursor con resaltado sutil en verde acento al 12% de opacidad sin bordes intrusivos.
   - Optimización de rendimiento a 60 FPS: pausa automática del ciclo de renderizado mediante IntersectionObserver al salir del viewport (0% de CPU en reposo).

3. Barra de navegación contextual (Navbar):
   - Inspirada en la interfaz técnica de plataformas contemporáneas de desarrollo.
   - Cada enlace cuenta con su respectivo icono temático y color característico (Proyectos en Cyan, Experiencia en Ámbar, Habilidades en Púrpura, Contacto en Verde Marca).
   - Adaptable a dispositivos móviles con menú lateral accesible por teclado.

4. Modo oscuro y claro sincronizado (ThemeProvider):
   - Implementación basada en useSyncExternalStore de React 19 para prevenir parpadeos y desajustes de hidratación (hydration mismatch).
   - Detección automática de preferencia del sistema operativo y persistencia local.

5. Secciones completas de portafolio:
   - Hero: Titular brutalista, microespecificaciones técnicas y consola DEV_ID con avatar retro-tech.
   - Proyectos: Catálogo de iniciativas con roles, etiquetas de tecnologías y enlaces directos.
   - Experiencia: Línea de tiempo cronológica con logros cuantitativos e impacto de ingeniería.
   - Competencias y Estudios: Clasificación por competencias técnicas de desarrollo y diseño UI/UX, formación universitaria en UASD y certificaciones.
   - Contacto: Canal directo con botón de copiado rápido y formulario validado con simulación de envío y estado de confirmación.

## Estructura del Proyecto

```
robindev/
├── public/                # Recursos estáticos
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Variables CSS globales, tema centralizado y utilidades
│   │   ├── layout.tsx     # RootLayout con fuentes Unbounded/Sora y ThemeProvider
│   │   └── page.tsx       # Ensamblado principal de la página
│   ├── components/        # Componentes modulares
│   │   ├── icons/         # Iconos SVG nativos (GithubIcon, etc.)
│   │   ├── ui/            # Primitivas de UI (Button, MovingGrid)
│   │   ├── ContactFooter.tsx
│   │   ├── Hero.tsx
│   │   ├── MorphIcon.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Projects.tsx
│   │   ├── SkillsAndEducation.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Timeline.tsx
│   ├── context/           # Contexto global de React (ThemeContext)
│   ├── data/              # Datos estructurados del portafolio (portfolioData.ts)
│   └── types/             # Definiciones de tipos TypeScript (portfolio.ts)
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación y Ejecución Local

1. Clonar el repositorio:
```bash
git clone https://github.com/robinzdev/robinzdev-portafolio.git
cd robinzdev-portafolio
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

4. Validar linter y tipos:
```bash
npm run lint
```

5. Compilar para producción:
```bash
npm run build
```

6. Previsualizar la compilación de producción:
```bash
npm run start
```

## Flujo de Trabajo Git

El proyecto sigue un modelo de ramas controlado:
- `main`: Rama de producción estable.
- `develop`: Rama principal de integración y trabajo activo.

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo correspondiente para mayores detalles.
