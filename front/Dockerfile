FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod -R +x node_modules/.bin node_modules/react-scripts || true
# Appel direct via node pour éviter les soucis d'exécution de react-scripts
RUN node node_modules/react-scripts/bin/react-scripts.js build

FROM nginx:1.25-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
