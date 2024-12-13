# Use an official nginx image to serve static files
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the built frontend files (HTML, CSS, and JS) to the nginx directory
COPY . .

# Expose port 80 to be able to access the web server
EXPOSE 80

# Nginx runs on port 80 by default, and we'll keep it running
CMD ["nginx", "-g", "daemon off;"]
