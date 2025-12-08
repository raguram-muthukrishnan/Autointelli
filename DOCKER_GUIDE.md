# Docker Deployment Guide for Autointelli

This guide will help you containerize and deploy the Autointelli application using Docker.

## Project Architecture

- **Frontend**: React + Vite application
- **Backend**: Strapi CMS
- **Database**: PostgreSQL (production) / SQLite (development)
- **Web Server**: Nginx (for frontend)

## Quick Start

### Prerequisites

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker Compose](https://docs.docker.com/compose/install/)

### Automated Setup (Recommended)

#### On Windows:
```bash
docker-setup.bat
```

#### On Linux/Mac:
```bash
chmod +x docker-setup.sh
./docker-setup.sh
```

### Manual Setup

#### 1. Environment Configuration

Copy the environment example file:
```bash
cp .env.example .env
```

Edit `.env` file with your configuration:
```env
# Database Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=database
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=your_secure_password

# Strapi Configuration (generate secure values)
APP_KEYS=your_app_keys_here
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

#### 2. Development Environment (SQLite)

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

#### 3. Production Environment (PostgreSQL)

```bash
docker-compose up --build -d
```

## Access Points

After deployment, your application will be available at:

- **Frontend**: http://localhost (port 80)
- **Backend API**: http://localhost:1337
- **Strapi Admin**: http://localhost:1337/admin
- **Database** (production): localhost:5432

## Docker Commands

### Essential Commands

```bash
# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete your data!)
docker-compose down -v

# Rebuild and start
docker-compose up --build -d

# View running containers
docker ps

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
```

### Maintenance Commands

```bash
# Update images
docker-compose pull
docker-compose up -d

# Clean up unused Docker resources
docker system prune -a

# View resource usage
docker stats
```

## File Structure

```
.
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── Dockerfile.frontend         # Frontend container definition
├── Dockerfile.backend          # Backend container definition
├── nginx.conf                  # Nginx configuration
├── .dockerignore               # Docker ignore file
├── .env.example               # Environment variables template
├── docker-setup.sh            # Linux/Mac setup script
└── docker-setup.bat           # Windows setup script
```

## Environment Variables

### Backend (Strapi)
- `DATABASE_CLIENT`: Database type (postgres/sqlite)
- `DATABASE_HOST`: Database host
- `DATABASE_PORT`: Database port
- `DATABASE_NAME`: Database name
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `APP_KEYS`: Strapi application keys (comma-separated)
- `API_TOKEN_SALT`: Salt for API tokens
- `ADMIN_JWT_SECRET`: JWT secret for admin
- `TRANSFER_TOKEN_SALT`: Salt for transfer tokens
- `JWT_SECRET`: General JWT secret
- `ENCRYPTION_KEY`: Encryption key for sensitive data

### Frontend (React)
- `VITE_API_URL`: Backend API URL

## Volumes and Data Persistence

### Production (PostgreSQL)
- `postgres_data`: PostgreSQL database files
- `strapi_uploads`: Strapi uploaded files

### Development (SQLite)
- `strapi_data`: SQLite database files
- `strapi_uploads`: Strapi uploaded files

## Security Considerations

1. **Change default passwords** in production
2. **Generate secure secrets** using tools like `openssl rand -base64 32`
3. **Use environment variables** for sensitive data
4. **Regular updates** of base images
5. **Backup your data** regularly

## Troubleshooting

### Common Issues

#### Port Conflicts
If ports 80, 1337, or 5432 are already in use:
```bash
# Check what's using the port
netstat -tulpn | grep :80

# Modify port mapping in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead of 80
```

#### Database Connection Issues
```bash
# Check if database is running
docker-compose ps

# View database logs
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

#### Permission Issues (Linux/Mac)
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Health Checks

```bash
# Check if services are healthy
docker-compose ps

# Test frontend
curl http://localhost

# Test backend API
curl http://localhost:1337/api

# Test database connection (production)
docker-compose exec database psql -U strapi -d strapi -c "\dt"
```

## Production Deployment

For production deployment on cloud platforms:

### AWS ECS
1. Push images to Amazon ECR
2. Create ECS task definitions
3. Set up Application Load Balancer
4. Configure RDS for database

### Google Cloud Run
1. Push images to Google Container Registry
2. Deploy services to Cloud Run
3. Set up Cloud SQL for database
4. Configure custom domains

### DigitalOcean App Platform
1. Connect your repository
2. Configure build specifications
3. Set up managed database
4. Configure environment variables

## Monitoring and Logging

```bash
# View real-time logs
docker-compose logs -f --tail=100

# Export logs to file
docker-compose logs > application.log

# Monitor resource usage
docker stats

# Check disk usage
docker system df
```

## Backup and Recovery

### Database Backup
```bash
# PostgreSQL backup
docker-compose exec database pg_dump -U strapi strapi > backup.sql

# SQLite backup
docker-compose exec backend cp .tmp/data.db /tmp/backup.db
docker cp $(docker-compose ps -q backend):/tmp/backup.db ./backup.db
```

### Full Application Backup
```bash
# Backup volumes
docker run --rm -v autointelli_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz -C /data .
docker run --rm -v autointelli_strapi_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads_backup.tar.gz -C /data .
```

## Performance Optimization

1. **Enable gzip compression** (configured in nginx.conf)
2. **Use CDN** for static assets
3. **Implement caching** strategies
4. **Monitor resource usage** and scale accordingly
5. **Optimize images** and use multi-stage builds

---

For more help, check the [Docker documentation](https://docs.docker.com/) or [Strapi documentation](https://docs.strapi.io/).