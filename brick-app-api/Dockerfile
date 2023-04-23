# Use the official node image as the base image
FROM node

# Set the working directory to /app
WORKDIR /app

# Copy the app's files to the container
COPY . .

# Install the required dependencies
RUN npm install

# Expose the port on which the app is running
EXPOSE 31002

# Start the app
CMD ["npm", "start"]
