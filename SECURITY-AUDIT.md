# Auditoría de seguridad de Poπ

Fecha: 9 de septiembre de 2026, Argentina (10 de septiembre UTC).
Base revisada: commit `b04262b`, con árbol de trabajo limpio al iniciar.

## Estado de seguridad: Bueno

La copia local corregida tiene controles proporcionados a una web promocional: dependencias sin avisos en la auditoría final, entradas acotadas, logs mínimos, defensas básicas contra abuso, JSON-LD escapado y cabeceras verificadas. Build, TypeScript y 15 pruebas pasaron. La interfaz conserva su contenido, CSS y finalidad.

Esta calificación corresponde al código y al build local verificados. Los cambios no se publicaron ni se hicieron commits. El sitio desplegado conserva la versión anterior hasta un nuevo despliegue. No implica ausencia absoluta de vulnerabilidades ni certifica las cuentas de Vercel, GitHub o Google Analytics.

## Alcance e inspección

Se revisaron todos los archivos fuente y de configuración del repositorio, el manifiesto y lockfile, componentes interactivos, CSS para referencias externas/contenido ejecutable, metadatos y activos públicos. Se inspeccionaron las dependencias instaladas y 9 commits disponibles en las referencias locales, con búsqueda de patrones de secretos en 84 blobs de texto únicos. Los binarios de dependencias no se auditaron línea por línea: se utilizó su inventario y los avisos de npm.

Hay cinco páginas públicas de contenido, una imagen Open Graph generada, sitemap, robots y una sola API propia. No hay base de datos, autenticación, usuarios, formularios de carga, Server Actions ni información privada de alumnos almacenada por el sistema. No se agregó infraestructura.

Los Client Components originales son `About`, `Faq`, `Navbar`, `Testimonials`, `WebVitals` y `WhatsAppLink`: sus contadores, menús, carrusel, métricas y eventos justifican su ejecución en el navegador. Sus imports compartidos contienen información comercial pública. La lógica de límite por IP y el procesamiento del body permanecen en módulos importados únicamente por la API.

No se encontraron redirecciones controladas por parámetros, consultas SQL, ejecución de comandos, evaluaciones dinámicas, contenido de APIs externas renderizado como HTML ni fetch del servidor a URLs introducidas por visitantes. El único fetch propio del cliente va a la API local. Los enlaces de servicios son rutas fijas.

## Diagnóstico inicial y priorización

Este diagnóstico se presentó antes de modificar código. Se priorizaron dependencias y API; después privacidad, escape y configuración. No se identificaron problemas CRÍTICOS.

| Severidad | Problema | Archivo | Riesgo | Solución aplicada/recomendada |
| --- | --- | --- | --- | --- |
| ALTO | `sharp` 0.35.3 afectado por GHSA-rgj7-g3m4-5g8c | `package-lock.json` | Decodificación de imágenes maliciosas; exposición reducida aquí al no aceptar uploads ni imágenes remotas | Parche 0.35.4 y allowlist de imágenes locales |
| MEDIO | Lectura completa sin límite, validación parcial | `src/app/api/analytics/route.ts` | Memoria/CPU y texto arbitrario en logs | 1 KB real, timeout, esquema estricto |
| MEDIO | Sin límite de solicitudes | `src/app/api/analytics/route.ts` | Abuso, consumo y métricas falsas | Límite local por cliente e instancia; documentar límite de serverless |
| MEDIO | URL/referrer automáticos al activar GA4 | `src/components/GoogleAnalytics.tsx` | Posibles parámetros personales y recopilación innecesaria | URL de ruta conocida, referrer vacío, sin señales publicitarias; revisar medición mejorada en la cuenta |
| BAJO | JSON-LD sin escape específico de HTML | `src/app/layout.tsx`, `src/components/ServiceDetailPage.tsx` | Una configuración maliciosa podría cerrar el script | Escapar `<` como `\u003c`; no había una entrada pública explotable demostrada |
| BAJO | Configuración pública sin validar y GA interpolado en JS | `src/config/site.ts`, `src/components/GoogleAnalytics.tsx` | URLs/ID malformados y riesgo condicionado al control de configuración | Validar protocolos, dominios, teléfono e ID; serialización segura |
| BAJO | Errores de envío y beacon rechazado sin tratar | `src/lib/analytics.ts` | Excepciones y pérdida de métricas | Capturar errores, fallback único con timeout |
| BAJO | Ignore no cubría todas las variantes de `.env` | `.gitignore` | Commit accidental futuro | `.env*` con excepción para `.env.example` |
| MEJORA | Sin CSP | `next.config.ts` | Menor defensa adicional | Política centralizada compatible con páginas estáticas |
| MEJORA | `noreferrer` ya protegía el opener; intención poco explícita | `src/components/Footer.tsx`, `src/components/WhatsAppLink.tsx` | No se demostró tabnabbing existente | Hacer explícito `noopener noreferrer` |

La severidad ALTO corresponde al aviso de la biblioteca, no a una RCE demostrada en esta landing. El aviso afecta al procesamiento de imágenes no confiables y describe condiciones particulares de Linux/libheif. [Aviso de sharp](https://github.com/advisories/GHSA-rgj7-g3m4-5g8c).

## Dependencias exactas

| Paquete | Antes | Después | Decisión |
| --- | --- | --- | --- |
| Next.js | 16.3.4 | 16.3.4 | Sin aviso aplicable en npm audit; conservar |
| React | 19.2.8 | 19.2.8 | Sin aviso en npm audit |
| React DOM | 19.2.8 | 19.2.8 | Sin aviso en npm audit |
| TypeScript | 5.9.3 | 5.9.3 | Conservar |
| lucide-react | 0.468.0 | 0.468.0 | Conservar |
| react-icons | 5.7.0 | 5.7.0 | Versión resuelta del rango `^5.7.0` |
| @types/node | 20.19.43 | 20.19.43 | Conservar |
| @types/react | 19.2.18 | 19.2.18 | Conservar |
| @types/react-dom | 19.2.4 | 19.2.4 | Conservar |
| sharp, indirecta opcional | 0.35.3 | 0.35.4 | Parche compatible dentro del rango del lockfile |
| @img/sharp-* | 0.35.3 | 0.35.4 | Binarios asociados al parche |
| @img/sharp-libvips-* | 1.3.2 | 1.3.3 | Binarios asociados al parche |

Node local: 24.14.0; npm: 11.9.0. El runtime remoto no se pudo consultar desde el repositorio.

Se ejecutó `npm update sharp --ignore-scripts --no-fund` con acceso autorizado a npm. No se utilizó `audit fix --force`, no se subió ninguna versión mayor y no se agregaron paquetes. El cambio de versiones del lockfile quedó limitado a la familia sharp. El lockfile usa npm oficial y hashes de integridad; incluye binarios opcionales para las distintas plataformas.

Resultado inicial de `npm audit --json`: 1 ALTO, 0 CRÍTICOS, 0 medios, 0 bajos. Resultado final: **0 vulnerabilidades conocidas reportadas**, con 62 dependencias contadas por el reporte. Es una fotografía del registro consultado, no una garantía permanente. La versión de Next instalada también se contrastó con su [release oficial 16.3.4](https://github.com/vercel/next.js/releases/tag/v16.3.4).

## API de métricas

| Endpoint | Método | Función | Entrada | Validación final | Riesgo residual |
| --- | --- | --- | --- | --- | --- |
| `/api/analytics/` | POST | Escribir un evento mínimo en logs | JSON de clic o Web Vital | Origen, Fetch Metadata si existe, media type, bytes, timeout, esquema, allowlists y límites de frecuencia | Los bots pueden simular visitas; el límite es por instancia |
| `/api/analytics/` | OPTIONS automático de Next | Informar métodos | Sin body necesario | Sin cabeceras CORS abiertas | No registra eventos |

GET, HEAD, PUT, PATCH y DELETE devuelven 405. Next normaliza la URL sin barra final mediante redirección; el cliente ahora usa directamente la forma con barra.

La API no llama a servicios externos, no almacena en base de datos y no reenvía eventos a GA4. `console.info` escribe eventos `popi_analytics` para los logs del hosting. La respuesta es vacía; no incluye stacks ni detalles internos.

Controles aplicados:

- Body máximo de 1024 bytes medidos durante la lectura, aunque falte `Content-Length` o sea engañoso. JSON vacío, inválido, UTF-8 inválido, arrays y estructuras que no coinciden se rechazan. El tamaño acota también las estructuras profundamente anidadas.
- Lectura de hasta 5 segundos y cancelación del stream. El hosting puede aplicar límites adicionales antes de la función.
- `application/json`, opcionalmente `charset=utf-8`; sin cuerpos comprimidos. El beacon usa un Blob con ese tipo, preservando compatibilidad.
- `whatsapp_click`: solo `event`, `source`, `pathname`. La etiqueta debe ser uno de los botones reales del sitio.
- `web_vital_cls`, `web_vital_inp`, `web_vital_lcp`: solo `event`, `pathname`, `value`, `rating`. Números finitos no negativos; CLS hasta 100, INP/LCP hasta 3.600.000 ms. Ratings: `good`, `needs-improvement`, `poor`.
- Ruta perteneciente a las cinco páginas públicas. Rutas y etiquetas además tienen máximo de 100 caracteres. No hay strings abiertos de texto libre. Se eliminó el ID de cada Web Vital.
- Propiedades adicionales, eventos inexistentes, rutas desconocidas y texto HTML no se registran.
- Origen obligatorio correspondiente al protocolo y Host de la solicitud; no se confía en `X-Forwarded-Host`. `Sec-Fetch-Site`, cuando está, debe ser `same-origin`. No es autenticación: un cliente fuera del navegador puede falsificar estos datos.
- 204 válido, 400 inválido, 403 origen, 408 lectura lenta, 413 tamaño, 415 tipo/encoding y 429 frecuencia. Sin reintentos del cliente por códigos de error.
- `Cache-Control: no-store` y `X-Robots-Tag: noindex, nofollow` en la API, incluyendo los métodos rechazados por el framework. No se modificó el caché de las páginas.

### Límite de solicitudes

Se permiten 30 solicitudes por cliente y 300 totales por ventana fija de 60 segundos **por instancia**. Los requests rechazados también consumen cuota. La tabla de clientes queda acotada por el límite global. `429` incluye `Retry-After`.

Únicamente con `VERCEL=1` se utiliza `x-vercel-forwarded-for`, cabecera que suministra la plataforma. Se valida que sea una IP. Se conserva en memoria una huella HMAC con clave aleatoria por ventana, nunca la IP en claro, y no se escribe en logs. Al iniciar la siguiente ventana se descartan las huellas anteriores y se cambia la clave; si no llegan más solicitudes quedan inactivas en memoria hasta la próxima ventana o destrucción de la instancia. No se crean identificadores persistentes. Fuera de Vercel, o sin una IP válida, se usa un contador compartido. [Cabeceras de Vercel](https://vercel.com/docs/headers/request-headers).

Las ventanas fijas pueden permitir ráfagas en sus límites. Las funciones y regiones no comparten memoria, los cold starts reinician contadores y usuarios detrás de la misma IP comparten cuota. Por eso este control reduce abuso sencillo y volumen de logs, pero **no garantiza un límite global, autenticidad de métricas ni protección contra DDoS/costos de invocación**. Para abuso sostenido se necesita una regla del firewall del hosting antes de la función. No se agregó Redis ni una base de datos.

## Privacidad y Google Analytics

| Dato | Logs propios después del cambio | GA4 si se configura |
| --- | --- | --- |
| Evento y botón de WhatsApp | Sí, etiquetas fijas | Sí |
| Mensaje, teléfono del visitante, nombre/email | No | No se envían mediante eventos propios |
| Ruta visitada | Solo las cinco rutas conocidas | URL del dominio configurado + ruta conocida |
| Query string y fragmento | No | Se excluyen de los eventos explícitos |
| Referrer | No | Parámetro explícito vacío |
| CLS, INP y LCP, valor y rating | Sí | Sí |
| ID de medición de Web Vitals | No | No |
| Timestamp | Sí, generado por servidor | Google añade tiempos de evento |
| IP | No en logs propios; uso temporal para cuota en Vercel | El proveedor recibe datos de conexión |
| User-Agent, dispositivo, resolución, idioma, cookies/identificadores GA | No se registran en el código propio | La biblioteca GA puede recopilarlos |
| Ubicación | No se lee ni registra | El proveedor puede derivar ubicación aproximada |

La API ignora headers/cookies para las métricas. El beacon puede acompañarse de cookies del mismo origen por comportamiento del navegador; no se procesan ni escriben. El fetch de respaldo usa `credentials: omit`. Los logs de acceso y datos de infraestructura que pueda generar Vercel son distintos de los logs `popi_analytics`; su retención y acceso se gestionan en la cuenta.

GA4 sigue siendo opcional. Un ID ausente o inválido no carga sus scripts. El ID `G-XXXXXXXXXX` es un identificador público, no una clave secreta. La carga es `afterInteractive`, con inicialización escapada y un único `page_view` explícito al cargar una página conocida, desactivando el automático de `config`. Los enlaces internos actuales recargan el documento; no hay un segundo listener propio de navegación ni eventos adicionales por abrir servicios. Si se cambia a navegación SPA, revisar este mecanismo.

Se desactivaron `allow_google_signals` y `allow_ad_personalization_signals`, y se quitaron query/fragmento y referrer de las llamadas explícitas. Se retiró `anonymize_ip: true`: ese parámetro no convierte GA4 en analítica anónima ni evita su recopilación habitual. [Configuración de Google Analytics](https://developers.google.com/analytics/devguides/collection/ga4/reference/config).

**Ajuste externo pendiente antes de activar GA4:** revisar y desactivar la medición mejorada innecesaria, en particular clics salientes, búsquedas, formularios y cambios de historial. La medición de enlaces puede enviar `link_url`, incluyendo el enlace de WhatsApp con su texto predefinido, y duplicar la medición de una interacción. Estos eventos los controla la cuenta de Google, no este endpoint. Revisar también redacción de datos, retención, señales, cookies y cómo se informa/recoge la preferencia del visitante. El código no implementa una interfaz de consentimiento. Dejar GA sin configurar mantiene disponibles las métricas propias sin cargar Google. [Medición mejorada de GA4](https://support.google.com/analytics/answer/9216061?hl=en).

No se configuró un ID real ni se enviaron pruebas a una propiedad de Analytics. Se probaron la ausencia, el rechazo de IDs malformados y la inicialización/eventos con un ID sintético y funciones simuladas. No se certifica la configuración ni la recepción final en una cuenta externa.

## CSP, HTTPS y cabeceras

`next.config.ts` centraliza CSP, `nosniff`, `Referrer-Policy: strict-origin`, bloqueo de cámara/micrófono/geolocalización y protección contra frames. `X-Frame-Options: DENY` coincide con `frame-ancestors 'none'` y mantiene compatibilidad con navegadores anteriores. `poweredByHeader` sigue desactivado.

La CSP permite recursos propios, imágenes `data:`/`blob:`, fuentes propias y estilos inline. Impide objetos, frames, cambios de base y envíos de formularios; no hay formularios legítimos en el sitio. `script-src-attr 'none'` bloquea manejadores HTML inline sin afectar eventos de React.

Se conserva **`script-src 'unsafe-inline'`** por los scripts de hidratación del App Router estático y la inicialización opcional de GA. **No es una CSP estricta contra toda inyección inline**: la defensa principal sigue siendo no aceptar HTML y escapar las inserciones JSON-LD. Nonces por solicitud exigirían renderizado dinámico y perder caché estático; una canalización propia de hashes o la opción SRI experimental de webpack añade complejidad al build Turbopack actual. Se eligió conservar arquitectura y rendimiento. `style-src 'unsafe-inline'` mantiene compatibilidad con estilos generados por Next y los componentes actuales. [CSP en Next.js](https://nextjs.org/docs/app/guides/content-security-policy).

Solo en desarrollo se permite `unsafe-eval` y WebSocket a `localhost`/`127.0.0.1` para herramientas de desarrollo y HMR. No aparecen en la política de producción verificada.

Dominios externos permitidos **solo si hay un ID GA válido**:

| Dominio | Directivas | Motivo |
| --- | --- | --- |
| `https://www.googletagmanager.com` | scripts, conexiones, imágenes | Biblioteca Google tag y recursos de su integración |
| `https://www.google-analytics.com` | conexiones, imágenes | Recolección GA |
| `https://region1.google-analytics.com` | conexiones, imágenes | Recolección regional GA |

WhatsApp, Instagram y los enlaces de Google/GitHub son navegaciones, no scripts ni conexiones de la aplicación; no requieren permisos en `connect-src`. `next/font/google` descarga Comfortaa durante el build y luego la sirve localmente: no se habilitaron dominios de fuentes para los visitantes. Si la integración GA cambia endpoints, revisar esta lista con tráfico real autorizado antes de ampliarla.

En producción existente se observó HTTPS 200 y HTTP 308 al mismo dominio HTTPS, con HSTS `max-age=63072000; includeSubDomains; preload` emitido por Vercel. No se duplicó HSTS desde la app ni se forzó una redirección en el servidor local HTTP. Al migrar de plataforma habrá que configurar estas garantías en el nuevo hosting. `http://www.w3.org/2000/svg` es el namespace SVG, no una carga insegura de recursos.

La respuesta HTML pública de Vercel incluye `Access-Control-Allow-Origin: *`, ausente en el código. No se considera fuga de información privada en una página deliberadamente pública. La API local verificada no abre CORS. La política efectiva de CORS de la API remota debe revisarse después del despliegue; un header CORS no sustituye validación ni autenticación.

## Secretos, archivos y SEO

No se detectaron secretos por los patrones inspeccionados en el árbol actual y el historial local disponible. No había archivos `.env` privados, solo `.env.example`. Las variables `NEXT_PUBLIC_*` contienen dominio comercial, teléfono de contacto, perfiles públicos y Measurement ID de GA. Son deliberadamente accesibles al navegador. No se confundieron esos datos con credenciales.

`.gitignore` ahora cubre todas las variantes `.env*` salvo el ejemplo. `.next`, `node_modules`, logs y archivos TypeScript generados continúan ignorados. Se comprobó con `git check-ignore`. No se encontraron backups, SQL, archivos privados de claves o archivos de entorno sensibles versionados en las referencias disponibles. No se inspeccionaron secretos de Actions, permisos de GitHub, ramas no descargadas, forks ni configuraciones privadas de las cuentas. Si en otra revisión aparece una credencial histórica, retirarla del último commit no basta: debe revocarse/rotarse.

`public/` contiene únicamente `logo-popi.png` y `perfil.webp`; ninguna tiene EXIF, XMP o ICC detectado. El favicon también es un recurso público. No se modificaron las imágenes. Los testimonios contienen nombres abreviados y textos publicados deliberadamente: no son datos obtenidos por la API. El permiso para su publicación no se puede comprobar desde el código.

Las rutas internas de prueba `.env`, `.env.production`, `.git/config`, `README.md`, `package.json` y `src/config/site.ts` devolvieron 404 en producción local. Se inspeccionaron 13 activos JS/CSS de `.next/static`: no aparecieron patrones de credenciales ni la lógica privada del limitador; no había source maps públicos. Esta búsqueda por patrones no equivale a probar la inexistencia de cualquier secreto posible.

JSON-LD mantiene los datos comerciales y ahora serializa `<` de forma segura. Metadata, canonical, Open Graph, Twitter, sitemap y robots contienen URLs públicas HTTPS. El sitemap incluye solo las cinco páginas; no promociona la API. Robots permanece público y no se usa como protección. Se agregó `X-Robots-Tag` a la API para indicar no indexación.

TypeScript mantiene `strict: true`, sin agregar `any`, supresiones ni opciones para omitir errores de build. El cast a registro en el validador se hace después de comprobar que es un objeto y cada campo se valida antes de usarlo.

## Archivos modificados y motivo

| Archivo | Cambio |
| --- | --- |
| `.gitignore` | Cobertura de todas las variantes de entorno |
| `.env.example` | Explicaciones de formatos públicos y activación de GA |
| `package-lock.json` | Parche de sharp y binarios |
| `package.json` | Script de pruebas, sin dependencias nuevas |
| `next.config.ts` | CSP, referrer, frame protection, API no-store/noindex, dos imágenes permitidas |
| `src/config/site.ts` | Uso de validación de configuración pública |
| `src/lib/public-config.ts` (nuevo) | Validadores de URLs e ID de GA |
| `src/lib/analytics-schema.ts` (nuevo) | Contrato de eventos, rutas y fuentes permitidas |
| `src/lib/analytics-rate-limit.ts` (nuevo) | Cuotas acotadas en memoria sin IP en logs |
| `src/app/api/analytics/route.ts` | Body limitado, validación, origen, cuotas y respuestas controladas |
| `src/lib/analytics.ts` | Minimización, beacon JSON, fallback y manejo de errores |
| `src/components/WebVitals.tsx` | Tipos de eventos y eliminación del identificador de medición |
| `src/components/GoogleAnalytics.tsx` | Inicialización segura, vista única y parámetros minimizados |
| `src/lib/serialize-json.ts` (nuevo) | Escape de JSON embebido en HTML |
| `src/app/layout.tsx` | JSON-LD escapado |
| `src/components/ServiceDetailPage.tsx` | JSON-LD escapado |
| `src/components/WhatsAppLink.tsx` | Relación de enlace explícita |
| `src/components/Footer.tsx` | Relación de enlaces explícita |
| `tests/security.test.cjs` (nuevo) | Pruebas de seguridad de módulos y handler |
| `tests/http.test.cjs` (nuevo) | Pruebas contra producción local, solo localhost |
| `README.md` | Operación, límites y comandos de verificación |
| `SECURITY-AUDIT.md` (nuevo) | Este informe |

## Validación realizada

- `npm run build`: exitoso con Next.js 16.3.4/Turbopack. Las páginas, robots, sitemap y Open Graph permanecen estáticos. La primera ejecución sin red falló descargando Comfortaa; se repitió con acceso autorizado y pasó. Permanece un aviso previo de `z-index` no soportado en la generación de Open Graph, sin impacto en seguridad ni error de build.
- `npm run check`: exitoso después del build.
- `npm audit --json`: 0 vulnerabilidades al finalizar.
- `npm test` con `SECURITY_TEST_URL=http://127.0.0.1:3100`: **15 pruebas exitosas, ninguna omitida**. Sin esa variable se omite intencionalmente solo la prueba HTTP.
- Body válido/vacío, JSON inválido, null/array, campos y eventos desconocidos, strings largos, números fuera de rango/no finitos, ratings inválidos, HTML/script, rutas con datos, estructura profunda, tamaño UTF-8, stream sin tamaño confiable y body detenido: respuestas verificadas.
- Métodos incorrectos 405, OPTIONS automático, CORS cerrado, cuotas 429/Retry-After, cambio de ventana, límite global y rechazo de IPs de proxy no confiable: verificados.
- Cinco páginas, scripts, imágenes normales y optimizadas, favicon, Open Graph, canonical, JSON-LD, enlaces externos, sitemap, robots y rutas que no deben publicarse: verificados por HTTP.
- CSP final en páginas y API, ausencia de `unsafe-eval` en producción y cabeceras anti-cache de API: verificadas.
- Navegador real contra producción local: hidratación, preguntas desplegables, preguntas adicionales, carrusel, menú móvil a 390 px y navegación a clases online. Sin errores/advertencias de consola en esas pruebas. Se observaron Web Vitals reales llegando al servidor con el esquema mínimo.
- GA sin configurar y con ID sintético: probado sin enviar eventos a Google. Se probaron excepciones de GA, beacon que retorna false o lanza error y fetch rechazado.
- `git diff --check`: sin errores de whitespace. Sin cambios de CSS, textos del sitio, imágenes ni estructura de páginas.

## Pendientes y límites aceptados

1. **Publicación:** aplicar el nuevo build al hosting y repetir comprobación de cabeceras/API en ese entorno. No se publicaron cambios durante la auditoría.
2. **Abuso distribuido:** el limitador local no impone una cuota global entre instancias. Si hay abuso, configurar el firewall del hosting. No se accedió a ese panel ni se contrató infraestructura.
3. **GA4:** revisar la cuenta y medición mejorada antes de activarlo; validar tráfico y privacidad con un ID real autorizado. No hay gestor de consentimiento en el sitio.
4. **CSP:** permite scripts inline por compatibilidad estática. No se promete bloqueo total de XSS mediante CSP.
5. **Cuentas e infraestructura:** permisos, secretos remotos, retención de logs, runtime y ajustes privados de GitHub/Vercel/Google no se pueden certificar solo con este repositorio.
6. **Analítica:** sigue siendo información no confiable enviada por navegadores; no debe usarse como prueba de identidades ni como dato financiero. Las cuotas pueden descartar métricas sin impedir el acceso al sitio.

## Checklist final

- [x] Secretos revisados: sin hallazgos en el alcance inspeccionado.
- [x] `.env` y variantes correctamente ignorados; ejemplo conservado.
- [x] Variables públicas revisadas y validadas.
- [x] Next.js 16.3.4 conservado sin avisos aplicables reportados; dependencia vulnerable parcheada.
- [x] Dependencias auditadas.
- [x] API de métricas validada.
- [x] API con resistencia básica a abuso por instancia; limitación distribuida documentada.
- [x] Payload limitado por bytes y lectura por tiempo.
- [x] Logs revisados y minimizados.
- [x] XSS revisado.
- [x] JSON-LD revisado y escapado.
- [x] CSP revisada y comprobada, con excepción inline documentada.
- [x] Headers configurados y comprobados localmente.
- [x] HTTPS y HSTS actuales comprobados en Vercel.
- [x] CORS del código y API local revisado; wildcard del HTML remoto identificado.
- [x] Enlaces externos seguros y configuración controlada.
- [x] Integración de Google Analytics revisada; ajustes de cuenta pendientes.
- [x] Privacidad de métricas propias revisada.
- [x] `public/` y metadatos de imágenes revisados.
- [x] Git local e historial disponible revisados; cuenta GitHub fuera del alcance comprobable.
- [x] Errores de API en producción local controlados y sin detalles internos.
- [x] Metadata revisada.
- [x] Sitemap revisado.
- [x] Robots revisado.
- [x] Build exitoso.
- [x] TypeScript exitoso.
- [ ] Lint: no hay script/configuración en el proyecto; no aplica.
- [x] Tests: 15 exitosos, incluidos HTTP local.
- [ ] Desplegar y verificar los cambios en producción remota.
- [ ] Verificar/configurar privacidad y medición mejorada de la cuenta GA4 si se activa.
