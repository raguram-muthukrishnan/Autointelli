#!/bin/bash
# Script to properly rebuild Strapi admin panel

echo "Stopping containers..."
docker-compose down

echo "Removing old build cache..."
docker-compose rm -f backend

echo "Rebuilding backend with no cache..."
docker-compose build --no-cache backend

echo "Starting services..."
docker-compose up -d

echo "Done! Wait a moment for services to start, then visit http://localhost:1337/admin"
