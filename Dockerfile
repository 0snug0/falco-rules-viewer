# Use a Node.js image as the base
FROM node:18-alpine

# Install Python and pip
RUN apk add --no-cache python3 py3-pip

# Set the working directory
WORKDIR /app

# Copy application files
COPY . .

# Install Python dependencies
RUN pip3 install pyyaml

# Install frontend dependencies
RUN cd frontend && npm install

# Expose the React development server port
EXPOSE 3000

# Set the entrypoint
ENTRYPOINT ["/app/entrypoint.sh"]
