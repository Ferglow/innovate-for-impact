#!/bin/bash
# Uso: ./scripts/switch-domain.sh innovateforimpact.io

DOMAIN=$1

if [ -z "$DOMAIN" ]; then
  echo "Uso: ./scripts/switch-domain.sh tu-dominio.com"
  exit 1
fi

URL="https://$DOMAIN"

echo "Cambiando dominio a: $URL"

# 1. src/config.ts
sed -i "s|SITE_URL = '.*'|SITE_URL = '$URL'|" src/config.ts

# 2. public/robots.txt
sed -i "s|Sitemap: https://.*|Sitemap: $URL/sitemap-index.xml|" public/robots.txt

# 3. public/admin/config.yml
sed -i "s|site_url: https://.*|site_url: $URL|" public/admin/config.yml

echo "Listo! Archivos actualizados:"
echo "  - src/config.ts"
echo "  - public/robots.txt"
echo "  - public/admin/config.yml"
echo ""
echo "Siguiente paso: git add -A && git commit -m 'feat: dominio $DOMAIN' && git push"
