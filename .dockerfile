# Use a lightweight Node.js image
FROM node:lts-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN ./build.sh

# Copy your app code
COPY . .

# Expose port for your app (adjust as needed)
EXPOSE 3000

# Start your app (adjust the command as needed)
CMD [ "./start.sh" ]