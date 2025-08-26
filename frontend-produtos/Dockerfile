# Build stage
FROM --platform=linux/arm64 node:18-alpine as build

WORKDIR /app

# Copia package.json e yarn.lock
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Copia o restante do código
COPY . .

# Build da aplicação
RUN yarn build

# Production stage
FROM --platform=linux/arm64 nginx:alpine

# Copia os arquivos buildados para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]