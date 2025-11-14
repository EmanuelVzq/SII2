# SII2 - Sistema de Información Institucional

Sistema web para gestionar información académica de estudiantes, incluyendo calificaciones, horarios, kardex y perfiles de usuario.

## 📋 Descripción del Framework y Tecnología

### Framework: **Next.js 16**
[Next.js](https://nextjs.org) es un framework de React que proporciona:
- **Server-Side Rendering (SSR)** y **Static Generation (SSG)** para mejor rendimiento SEO
- **API Routes**: endpoints backend integrados en la aplicación
- **App Router**: sistema de enrutamiento moderno basado en carpetas
- **Optimizaciones automáticas** de imágenes, fuentes y código

### Tecnologías principales:
- **React 19.2**: librería de UI con hooks y componentes funcionales
- **TypeScript 5.9**: tipado estático para mayor seguridad en el código
- **Tailwind CSS 4.1**: framework CSS utilitario para estilos rápidos y responsivos
- **Lucide React 0.553**: librería de iconos SVG
- **ESLint 9.39**: linter para mantener calidad de código

---

## 🚀 Instalación

### Requisitos previos:
- **Node.js** (versión 18 o superior)
- **npm**, **yarn**, **pnpm** o **bun** como gestor de paquetes

### Pasos:

1. **Clonar o descargar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd SII2
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```
   O si prefieres otro gestor:
   ```bash
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configurar variables de entorno** (si es necesario):
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Añade las variables necesarias (consulta con el equipo de desarrollo)

---

## 🏃 Ejecución

### Modo desarrollo:
Ejecuta el servidor de desarrollo con hot-reload:
```bash
npm run dev
```
Luego abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Modo producción:

1. **Compilar la aplicación**:
   ```bash
   npm run build
   ```

2. **Iniciar el servidor**:
   ```bash
   npm run start
   ```

### Linting:
Verifica la calidad del código:
```bash
npm run lint
```

---

## 📁 Estructura del Proyecto

```
SII2/
├── app/
│   ├── api/              # Rutas API (endpoints backend)
│   │   ├── login/        # Autenticación
│   │   ├── estudiante/   # Información del estudiante
│   │   ├── calificaciones/
│   │   ├── horarios/
│   │   └── kardex/
│   ├── components/       # Componentes reutilizables
│   ├── login/            # Página de login
│   ├── estudiante/       # Panel del estudiante
│   ├── calificaciones/   # Vista de calificaciones
│   ├── horario/          # Vista de horario
│   ├── kardex/           # Vista del kardex
│   └── layout.tsx        # Layout global
├── lib/
│   └── auth.ts           # Funciones de autenticación
├── public/               # Archivos estáticos
├── package.json          # Dependencias del proyecto
├── tsconfig.json         # Configuración de TypeScript
├── next.config.ts        # Configuración de Next.js
└── tailwind.config.js    # Configuración de Tailwind CSS
```

---

## 🔐 Funcionalidades

- **Login**: Autenticación segura de usuarios
- **Perfil del Estudiante**: Visualizar información personal y académica
- **Calificaciones**: Consultar notas por materia
- **Horarios**: Ver el horario de clases
- **Kardex**: Historial académico completo

---

## 📝 Desarrollo

Para editar componentes:
- Modifica los archivos en `app/` (cambios se reflejan automáticamente en desarrollo)
- Los componentes reutilizables van en `app/components/`
- Las rutas API van en `app/api/`

---

## 🌐 Deploy

La aplicación está optimizada para desplegar en [Vercel](https://vercel.com) (creadores de Next.js):
1. Sube el código a GitHub
2. Conecta tu repositorio a Vercel
3. El deploy es automático en cada push a `main`

---

## 📚 Recursos útiles

- [Documentación oficial de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

---

## 👥 Colaboradores

- Rube123 (nuevo colaborador del proyecto)
