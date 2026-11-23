# 🌿 Verdium 🌿

### Catálogo educativo de plantas y guías de cuidado

Verdium es una aplicación web educativa que permite explorar diferentes especies vegetales que no echaras en una sopa, conocer sus características y aprender sobre sus cuidados. Su objetivo es ofrecer información organizada y accesible para personas interesadas en el mundo de las plantas.

El proyecto utiliza Next.js para el desarrollo de la aplicación y Supabase como servicio de base de datos

## Características principales

- Catálogo dinámico de plantas.
- Clasificación de plantas por categorías.
- Información sobre iluminación, riego, humedad y dificultad de cuidado.
- Manejo de estados de carga, errores y páginas no encontradas.
- Protección de datos mediante políticas Row Level Security (RLS).

## Tecnologías utilizadas

- **Next.js 16:** Framework para el desarrollo de la aplicación web.
- **React:** Biblioteca para construir interfaces.
- **TypeScript:** Lenguaje con tipado estático.
- **Supabase:** Servicio backend y conexión con la base de datos.
- **PostgreSQL:** Sistema de gestión de base de datos.
- **CSS:** Diseño y estilos de la interfaz.
- **Git y GitHub:** Control de versiones y alojamiento del código fuente.

## Base de datos

La aplicación utiliza Supabase con PostgreSQL y cuenta con dos tablas principales:

### Tabla `plantas`

Contiene la información de las especies vegetales:

- Identificador.
- Nombre común y científico.
- Descripción.
- Cuidados.
- Necesidades de iluminación.
- Frecuencia de riego.
- Humedad.
- Dificultad de mantenimiento.
- URL para una imagen ilustratica.
- Identificador de categoría.

### Tabla `categorias`

Permite organizar las plantas según su clasificación:

- Identificador.
- Nombre.
- Slug.
- Descripción.

La tabla `plantas` mantiene una relación mediante clave foránea con la tabla `categorias`.

Actualmente, la base de datos contiene cinco registros de plantas y cuatro categorías.

## Seguridad

Se implementaron políticas de Row Level Security (RLS) en las tablas `plantas` y `categorias`.

Actualmente, las políticas permiten operaciones de lectura pública para los roles `anon` y `authenticated`.

La conexión utiliza la clave pública Publishable Key de Supabase. Las credenciales secretas no deben incluirse en el repositorio.

## Instalación y ejecución

### Requisitos previos

- Node.js.
- npm.
- Una cuenta de Supabase.
- Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/3smer4ld4/verdium.git
cd verdium
```
### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto, tomando como referencia el archivo `.env.example`.

Agregar las credenciales del proyecto de Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=TU_PROJECT_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_PUBLISHABLE_KEY
```

Estas variables se obtienen desde la configuración del proyecto en Supabase.

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

## 🏗️ Compilación para producción

Para generar una compilación optimizada:

```bash
npm run build
```

Para iniciar la aplicación en modo producción:

```bash
npm run start
```

---

**Verdium — Deja de ser la mata plantas 3000**