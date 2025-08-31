# -----------------------------
# Stage 1: Build React App
# -----------------------------
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./ 
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# -----------------------------
# Stage 2: Serve with Nginx
# -----------------------------
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (nếu có)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 5000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
