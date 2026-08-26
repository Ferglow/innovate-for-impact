# Checklist de Producción — Innovate for Impact

## Estado actual: ✅ Listo para dominio personalizado

El sitio está desplegado y funcional en:
**https://innovate-for-impact-ferglow.netlify.app**

---

## Auditoría automatizada (todas pasan ✅)

| Check | Resultado |
|---|---|
| Build sin errores | ✅ 13 páginas + sitemap |
| Todos los links internos devuelven 200 | ✅ 9/9 |
| Sitemap con todas las URLs | ✅ 12 URLs |
| robots.txt bloquea /admin/ | ✅ |
| Panel Decap CMS accesible | ✅ /admin/ + config.yml |
| Formulario Netlify Forms configurado | ✅ + honeypot |
| JSON-LD en páginas de eventos | ✅ Schema.org Event |
| Open Graph tags | ✅ og:title, og:description, og:image |
| OG image placeholder | ✅ public/og-default.jpg |
| Canonical URLs | ✅ apuntan a .netlify.app (cambiar con dominio) |
| Locale tags correctos | ✅ lang="es" / lang="en" |
| Security headers | ✅ X-Frame, X-Content-Type, Referrer-Policy, Permissions-Policy |
| i18n funciona | ✅ / (es) + /en (en) |

---

## Pasos manuales pendientes

### 1. Dominio personalizado (innovateforimpact.io)

**Opción A — Netlify DNS (recomendado):**
1. Compra el dominio en Netlify (Domain management → Add domain)
2. O si ya lo tienes en otro registrar: cambia los nameservers a:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
3. En Netlify: Site → Domain management → Add custom domain → `innovateforimpact.io`
4. Active DNS → Verifica que el certificado SSL se genere automáticamente
5. Marca "Force HTTPS"

**Opción B — DNS externo (Cloudflare, GoDaddy, etc.):**
1. Agrega CNAME record: `www` → `innovate-for-impact-ferglow.netlify.app`
2. Agrega A record: `@` → Netlify load balancer IP (lo da Netlify en Domain management)
3. Espera propagación (5min a 48h)

### 2. Actualizar URLs canónicas y sitemap

Ejecuta el script automático:

```bash
./scripts/switch-domain.sh innovateforimpact.io
```

Esto actualiza los3 archivos de golpe:
- `src/config.ts` → URL canónica
- `public/robots.txt` → Sitemap URL
- `public/admin/config.yml` → Decap CMS site_url

Luego haz push:
```bash
git add -A && git commit -m "feat: dominio innovateforimpact.io" && git push
```

### 3. Verificar formulario de registro

1. Ve a https://innovate-for-impact-ferglow.netlify.app/registro/
2. Llena el formulario y envía
3. Ve a Netlify Dashboard → Forms → Deberías ver la submission en "registro"
4. Verifica que el redirect a /gracias funciona

### 4. Verificar panel Decap en producción

1. Ve a https://innovate-for-impact-ferglow.netlify.app/admin/
2. Inicia sesión con tu email + contraseña (la que creaste con el widget)
3. Edita un evento → guardar
4. Verifica el commit en GitHub (debe decir "fernando.a.h" como autor)
5. Espera ~30s → verifica el cambio en el sitio

### 5. Crear OG image real

El placeholder actual (`public/og-default.jpg`) funciona pero debería ser una imagen profesional con:
- Logo de IFI
- Nombre del sitio
- Tagline
- Colores de marca

Dimensiones: 1200×630px (estándar para redes sociales)

### 6. Configurar analytics (opcional)

Opciones para medir tráfico:
- **Netlify Analytics** (dashboard → Analytics): sin cookies, privacy-friendly
- **Google Analytics 4**: añadir `<script>` en BaseLayout
- **Plausible** o **Fathom**: alternativas privacy-friendly

### 7. Verificar en móvil

1. Abre el sitio en tu celular
2. Navega por todas las secciones
3. Prueba el formulario de registro
4. Prueba el toggle de idioma
5. Verifica que el header sticky funciona bien

---

## Arquitectura final del proyecto

```
innovate-for-impact/
├── public/
│   ├── admin/
│   │   ├── index.html          ← carga Decap CMS
│   │   └── config.yml          ← colecciones + backend
│   ├── images/uploads/         ← media library
│   ├── og-default.jpg          ← imagen para redes sociales
│   ├── robots.txt              ← reglas de indexación
│   └── favicon.svg
├── scripts/
│   └── switch-domain.sh        ← cambia dominio en 1 comando
├── src/
│   ├── config.ts               ← URL del sitio (fuente única de verdad)
│   ├── components/
│   │   ├── SEO.astro           ← meta tags reutilizable
│   │   ├── Header.astro        ← nav sticky + toggle idioma
│   │   ├── Footer.astro
│   │   ├── LanguageToggle.astro
│   │   ├── SectionHeader.astro
│   │   ├── EventCard.astro
│   │   └── TestimonialCard.astro
│   ├── content/
│   │   ├── eventos/
│   │   │   ├── es/*.md         ← eventos en español
│   │   │   └── en/*.md         ← eventos en inglés
│   │   └── testimonios/
│   │       ├── es/*.md
│   │       └── en/*.md
│   ├── content.config.ts       ← esquemas Zod
│   ├── layouts/
│   │   └── BaseLayout.astro    ← esqueleto + SEO + fonts
│   └── pages/
│       ├── index.astro         ← home ES
│       ├── registro.astro      ← formulario
│       ├── gracias.astro       ← confirmación
│       ├── eventos/[slug].astro
│       └── en/
│           ├── index.astro     ← home EN
│           └── events/[slug].astro
├── .github/workflows/
│   └── deploy.yml              ← build + deploy a Netlify
├── astro.config.mjs            ← i18n + sitemap
├── netlify.toml                ← build + security headers
└── package.json
```

## Flujo de trabajo diario

```bash
# Editar contenido desde código
git add -A && git commit -m "contenido: descripción" && git push

# Editar contenido desde el panel
1. Ir a /admin/
2. Editar → Guardar
3. Decap hace commit automáticamente
4. GitHub Actions despliega (~30s)

# Agregar nuevo evento
1. Crear src/content/eventos/es/nuevo-evento.md
2. Crear src/content/eventos/en/nuevo-evento.md
3. Push → página generada automáticamente
```

## Recordatorio: archivos que NUNCA commitear

```
.netlify/          ← token local de Netlify
node_modules/      ← ya en .gitignore
dist/              ← build output
```
