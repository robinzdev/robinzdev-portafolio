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
   - Soporte para anclaje nativo de navegación (`id`) alineado con los márgenes de la barra de navegación.

3. Tipografía interactiva con físicas y colapso (GravityLetters):
   - Efecto tipográfico retro-tech inspirado en React Bits Pro integrado en el bloque de cierre del footer ("ROBIN DEV").
   - Muestreo vectorial de glifos en cuadrícula densa con caracteres ASCII dinámicos.
   - Mecánicas interactivas: corte con cuchilla por cursor (`cutWidth`), dispersión física (`throwForce`), y onda de colapso en cascada al hacer clic.
   - Separación estructural por fragmentos desconectados (algoritmo BFS de 8 direcciones): al cortar una letra, los trozos sin anclaje superior caen en bloque como islas físicas.
   - Acumulación orgánica en el piso: dunas de arena que se reorganizan de forma natural cuando las letras ascienden de regreso.
   - Rendimiento extremo (Texture Atlas): pre-renderizado de glifos en hoja de sprites fuera de pantalla, eliminando cálculos de transformación en cada frame (0.2 ms por cuadro).
   - Reactividad en tiempo real ante cambio de tema claro/oscuro mediante MutationObserver sin reiniciar partículas.

4. Barra de navegación contextual e isotipo adaptativo (Navbar):
   - Identidad de marca unificada bajo robinzdev con isotipo SVG adaptativo de alta resolución (`robinzdev_forwhite.svg` en tema claro y `robinzdev_forblack.svg` en tema oscuro) con conmutación instantánea mediante clases CSS sin destellos de hidratación.
   - Cada enlace cuenta con su respectivo icono temático y color característico (Proyectos en Cyan, Experiencia en Ámbar, Habilidades en Púrpura, Contacto en Verde Marca).
   - Navegación por anclajes calibrada con espaciado uniforme respecto a la barra fija.
   - Adaptable a dispositivos móviles con menú lateral accesible por teclado.

5. Consola retro-tech 3D con avatar holográfico y glitch quirúrgico (HeroCard3D):
   - Tarjeta interactiva con físicas 3D reactivas al cursor (`rotateX`, `rotateY`, `smoothZ`) montada sobre placa posterior de acento verde.
   - Efecto CRT analógico: líneas de escaneo, máscara de fósforo triada, viñeta de tubo catódico y haz de barrido electrónico con cadencia y velocidad orgánica no repetitiva.
   - Conmutación quirúrgica tipo glitch entre fotografía estática optimizada (`mifoto.webp`) y avatar holográfico animado (`mipersonajeanimado.webm`).
   - Ciclo estocástico controlado: conmutación automática en intervalos aleatorios de entre 30 y 60 segundos con retorno suave a la imagen tras concluir la reproducción (9.4s).
   - Eficiencia energética y 60 FPS: suspensión integral de la animación de barrido, video y temporizadores mediante IntersectionObserver al salir del viewport (0% de CPU en reposo).
   - Ajuste de viewport responsivo: contención fija a 95vh (`lg:min-h-[95vh] lg:max-h-[95vh]`) en pantallas de escritorio y flujo libre vertical sin recortes en dispositivos móviles.

6. Modo oscuro y claro sincronizado (ThemeProvider) con View Transitions:
   - Implementación basada en useSyncExternalStore de React 19 para prevenir parpadeos y desajustes de hidratación (hydration mismatch).
   - Transición visual cinemática mediante View Transition API con revelado circular progresivo desde las coordenadas del cursor.
   - Paleta de color centralizada en variables CSS (--color-accent-brand: #9AD872) con alto contraste accesible en modo claro (#4E872A).

7. Secciones completas de portafolio y microinteracciones:
   - Hero: Titular brutalista con efecto tipográfico dinámico (VariableTextWave), microespecificaciones técnicas y consola interactiva DEV_ID.
   - Proyectos: Catálogo de iniciativas con pestañas estilo carpeta neobrutalista, roles, etiquetas de tecnologías, carrusel responsivo y enlaces directos.
   - Experiencia: Línea de tiempo cronológica con avance progresivo continuo de riel verde acento sin cortes entre hitos, e iconos SVG técnicos de cada tecnología (TechIcons).
   - Competencias y Estudios: Clasificación por competencias técnicas de desarrollo y diseño UI/UX, formación universitaria en UASD y certificaciones.
   - Contacto y Footer: Canal directo con botón de copiado rápido, formulario validado, créditos interactivos con física de partículas (GravityLetters) y año de copyright sincronizado dinámicamente.
   - Animaciones controladas: Ejecución estricta de una sola vez por carga de página (`viewport: { once: true }`), evitando reinicios distractores al desplazarse entre secciones.

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
│   │   ├── icons/         # Iconos SVG nativos (GithubIcon, TechIcons)
│   │   ├── ui/            # Primitivas de UI (Button, MovingGrid, GravityLetters)
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
