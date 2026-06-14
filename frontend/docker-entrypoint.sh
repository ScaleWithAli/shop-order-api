#!/bin/sh
sed -i "s|__VITE_AUTH_URL__|${VITE_AUTH_URL}|g" /usr/share/nginx/html/config.js
sed -i "s|__VITE_PRODUCT_URL__|${VITE_PRODUCT_URL}|g" /usr/share/nginx/html/config.js
sed -i "s|__VITE_ORDER_URL__|${VITE_ORDER_URL}|g" /usr/share/nginx/html/config.js
exec nginx -g "daemon off;"
