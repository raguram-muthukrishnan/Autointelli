@echo off
echo ==========================================
echo   Autointelli Rebuild Script (Windows)
echo ==========================================

echo.
echo 1. Stopping existing containers...
docker-compose down

echo.
echo 2. Removing potential conflict containers...
docker container prune -f

echo.
echo 3. Rebuilding Docker images (with new arguments)...
echo    This may take a few minutes...
docker-compose build --no-cache backend

echo.
echo 4. Starting services...
docker-compose up -d

echo.
echo ==========================================
echo   DEPLOYMENT RESTARTED
echo ==========================================
echo.
echo Please wait about 30-60 seconds for Strapi to initialize.
echo Then check:
echo - Admin: %ADMIN_URL% (or configured URL)
echo - Frontend: http://localhost:8080
echo.
pause
