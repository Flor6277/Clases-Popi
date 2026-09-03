# Poπ - Clases particulares de Matemática

Sitio web de **Poπ**, dedicado a clases particulares de Matemática en San Juan y modalidad online.

La propuesta está orientada principalmente a estudiantes de nivel secundario, preparación para el ingreso a institutos preuniversitarios, ingresos universitarios y acompañamiento en algunas materias universitarias con contenidos matemáticos.

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- CSS
- Lucide React
- React Icons

## Funcionalidades

- Sitio responsive para escritorio, tablet y dispositivos móviles
- Información sobre clases y niveles educativos
- Modalidad presencial y online
- Páginas específicas de servicios para mejorar SEO
- Método de trabajo
- Testimonios en carrusel
- Preguntas frecuentes
- Contacto directo por WhatsApp con mensajes orientados a cada consulta
- Registro de clics a WhatsApp y Core Web Vitals en logs de Vercel
- Integración opcional con Google Analytics 4
- SEO técnico con canonical, Open Graph, Twitter Card, JSON-LD, sitemap y robots
- Imagen Open Graph generada por Next.js
- Cabeceras HTTP de seguridad

## Ejecutar el proyecto localmente

1. Instalar las dependencias:

```bash
npm install
```

2. Crear `.env.local` a partir de `.env.example` si necesitás personalizar variables:

```bash
copy .env.example .env.local
```

3. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

4. Verificar TypeScript:

```bash
npm run check
```

5. Generar la versión de producción:

```bash
npm run build
```

## Variables opcionales

- `NEXT_PUBLIC_GOOGLE_BUSINESS_URL`: enlace oficial del Perfil de Empresa de Google.
- `NEXT_PUBLIC_INSTAGRAM_URL`: Instagram oficial de Poπ.
- `NEXT_PUBLIC_GA_ID`: Measurement ID de Google Analytics 4.

Si estas variables no están configuradas, el sitio sigue funcionando normalmente y no muestra enlaces incompletos.

## Medición

Los clics de WhatsApp y los Core Web Vitals se registran como eventos estructurados `popi_analytics` en los logs del deployment. Si se configura `NEXT_PUBLIC_GA_ID`, esos mismos eventos también se envían a Google Analytics.
