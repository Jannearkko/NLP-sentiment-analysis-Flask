# Use an official Node runtime as a parent image
FROM node:20.11

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Command to serve the build directory
CMD ["npm", "start"]
