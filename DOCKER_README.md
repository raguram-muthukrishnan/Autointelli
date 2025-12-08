# Autointelli Docker Setup

This guide provides the essential Docker commands to run the Autointelli application in containerized environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

### Production Environment (PostgreSQL)
```bash
docker-compose up --build -d
```

### Development Environment (SQLite)
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

## Access Points

After deployment, your application will be available at:

- **Frontend**: http://localhost
- **Backend API**: http://localhost:1337
- **Strapi Admin Panel**: http://localhost:1337/admin
- **PostgreSQL Database** (production): localhost:5432

## Essential Commands

### Container Management
```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete your data!)
docker-compose down -v

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a
```

### Logs and Monitoring
```bash
# View logs from all services
docker-compose logs -f

# View logs from specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database

# View last 50 lines of logs
docker-compose logs --tail=50 backend
```

### Rebuilding and Updates
```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild without cache
docker-compose build --no-cache

# Restart specific service
docker-compose restart backend

# Update and restart all services
docker-compose up --build -d
```

### Database Management
```bash
# Access PostgreSQL database (production)
docker-compose exec database psql -U strapi -d strapi

# Backup PostgreSQL database
docker-compose exec database pg_dump -U strapi strapi > backup.sql

# Restore PostgreSQL database
docker-compose exec -T database psql -U strapi -d strapi < backup.sql
```

### Container Shell Access
```bash
# Access backend container shell
docker-compose exec backend sh

# Access frontend container shell
docker-compose exec frontend sh

# Access database container shell
docker-compose exec database sh
```

### Cleanup Commands
```bash
# Remove unused Docker resources
docker system prune -a

# Remove only unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune
```

## Environment Configuration

Create a `.env` file in the root directory with your configuration:

```env
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_secure_password

# Strapi Configuration
APP_KEYS=your_app_keys_here
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key

# Server Configuration
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
```

## Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check what's using port 80
netstat -tulpn | grep :80

# Use different ports if needed (modify docker-compose.yml)
ports:
  - "8080:80"  # Use port 8080 instead of 80
```

#### Database Connection Issues
```bash
# Check database logs
docker-compose logs database

# Reset database (⚠️ This will delete all data!)
docker-compose down -v
docker-compose up -d
```

#### Build Failures
```bash
# Clean build cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

### Health Checks
```bash
# Test frontend
curl http://localhost

# Test backend API
curl http://localhost:1337/api

# Check container resource usage
docker stats
```

## File Structure

```
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── Dockerfile.frontend         # Frontend container definition
├── Dockerfile.backend          # Backend container definition
├── nginx.conf                  # Nginx configuration
├── .dockerignore               # Docker ignore file
├── .env                        # Environment variables
└── .env.example               # Environment variables template
```

## Production Deployment

For production deployment, ensure you:

1. **Generate secure secrets** for all environment variables
2. **Use strong passwords** for database credentials
3. **Configure proper backup** strategies
4. **Set up SSL/TLS** certificates
5. **Monitor resource usage** and scale accordingly

---

For more information, visit the [Docker documentation](https://docs.docker.com/) or [Strapi documentation](https://docs.strapi.io/).