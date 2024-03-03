# Stage 1: Build the Angular application

# Use the official Node.js image as a base image
FROM node:16-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the application
RUN npm run build

# Stage 2: Serve the application from Nginx

# Use the official Nginx image as a base image
FROM nginx:alpine as serve-stage

# Copy the build output from the previous stage to the Nginx serve directory
COPY --from=build-stage /app/dist/frontend-gym-app /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]
