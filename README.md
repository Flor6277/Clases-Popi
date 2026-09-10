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

Los clics de WhatsApp y los Core Web Vitals se registran como eventos estructurados `popi_analytics` en los logs del deployment. Se admiten únicamente páginas y etiquetas conocidas: no se guardan mensajes, parámetros de URL, referrers ni identificadores de las mediciones.

Si se configura un `NEXT_PUBLIC_GA_ID` válido, también se envían esos eventos y una vista de página a Google Analytics. La configuración quita query y fragmento de la URL enviada, vacía el referrer y desactiva señales publicitarias. GA4 sigue siendo un servicio externo con su propia recopilación y cookies. Antes de activarlo, revisar la sección de privacidad y ajustes externos de [SECURITY-AUDIT.md](SECURITY-AUDIT.md).

## Seguridad y mantenimiento

La API `POST /api/analytics/` requiere JSON y origen coincidente. Limita el body a 1024 bytes, la lectura a 5 segundos y las solicitudes a 30 por cliente y 300 totales por minuto e instancia. En Vercel utiliza una huella temporal de la IP suministrada por la plataforma, sin escribirla en logs. Fuera de Vercel usa un contador compartido y no confía en cabeceras IP enviadas por el cliente.

Este límite en memoria es una defensa básica: no se comparte entre funciones ni regiones y se reinicia con la instancia. Si hay abuso sostenido, aplicar límites en el firewall de Vercel; no hace falta agregar una base de datos al sitio.

La CSP conserva el renderizado estático. Permite scripts inline para la hidratación de Next.js y estilos inline; no permite `unsafe-eval` en producción. HSTS y la redirección HTTPS los proporciona Vercel. Si se migra de hosting, configurar HTTPS y HSTS en el nuevo proxy.

Para verificar cambios:

```bash
npm audit
npm run build
npm run check
npm test
```

El build necesita conexión a Google Fonts para descargar Comfortaa; después la fuente se sirve desde el propio sitio. No hay script de lint configurado. Las pruebas usan Node.js y el TypeScript ya instalado, sin dependencias nuevas.

Para incluir las pruebas HTTP, iniciar una compilación de producción local en una terminal:

```bash
node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100
```

En otra terminal PowerShell:

```powershell
$env:SECURITY_TEST_URL = 'http://127.0.0.1:3100'
npm test
Remove-Item Env:SECURITY_TEST_URL
```

Estas pruebas solo aceptan destinos locales y terminan generando respuestas `429` deliberadamente. Usar una instancia local recién iniciada; para repetirlas esperar una ventana de 60 segundos o reiniciar esa instancia.

Al agregar servicios, mantener sincronizada la lista de rutas de `src/lib/analytics-schema.ts`; una prueba comprueba que coincide con `src/config/services.ts`. Si una variable pública de configuración es inválida, se usa el dominio/teléfono comercial predeterminado o se omite el enlace/GA4 opcional. Nunca colocar secretos en variables `NEXT_PUBLIC_*`.

El diagnóstico, los cambios, las pruebas y las limitaciones están en [SECURITY-AUDIT.md](SECURITY-AUDIT.md).
