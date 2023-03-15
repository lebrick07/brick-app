# FROM node:14-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --production

# COPY . .

# CMD ["npm", "start"]

# EXPOSE 80

# # Base image
# FROM node:14-alpine AS builder

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./
# RUN npm install

# # Bundle app source
# COPY . .

# # Build the app
# RUN npm run build

# # Production image
# FROM nginx:1.21.0-alpine

# # Copy built app to nginx folder
# COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# # Remove the default nginx configuration file
# RUN rm /etc/nginx/conf.d/default.conf

# # Copy custom nginx configuration file
# COPY config/nginx.conf /etc/nginx/conf.d/

# # Expose port
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]


# Name the node stage "builder"
FROM node:14 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:1.21.0-alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
RUN rm /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/conf.d
EXPOSE 80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]