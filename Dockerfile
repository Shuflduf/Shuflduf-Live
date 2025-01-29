# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 4173

# Command to run the application
CMD ["npm", "run", "preview", "--", "--host"]