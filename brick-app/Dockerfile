# # Name the node stage "builder"
# FROM node:16 AS builder
# # Set working directory
# WORKDIR /app
# # Copy all files from current directory to working dir in image
# COPY . .
# # install node modules and build assets
# RUN yarn install && yarn build

FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

CMD ["npm", "start"]

EXPOSE 31001

# WORKDIR /usr/share/nginx/html
# # Remove default nginx static assets
# RUN rm -rf ./*
# # Copy static assets from builder stage
# COPY --from=builder /app/build .
# # RUN rm /etc/nginx/conf.d/default.conf
# COPY config/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# # Containers run nginx with global directives and daemon off
# ENTRYPOINT ["nginx", "-g", "daemon off;"]