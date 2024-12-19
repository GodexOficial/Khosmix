#!/bin/bash

echo "Starting deployment..."

# Build the application
npm run build

# Run tests
npm test

# Docker build and push
docker build -t khosmix/web:latest .
docker push khosmix/web:latest

# Deploy to production
ssh user@khosmix.com << 'ENDSSH'
cd /var/www/khosmix
docker-compose pull
docker-compose up -d
ENDSSH

echo "Deployment completed!" 