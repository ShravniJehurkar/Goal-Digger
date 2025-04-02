@echo off
echo Starting GOAL DIGGER deployment process...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Change to the script's directory
cd /d "%~dp0"

REM Install Vercel CLI if not already installed
echo Checking for Vercel CLI...
call npm list -g vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo Error: Failed to install Vercel CLI
        pause
        exit /b 1
    )
)

REM Build the project
echo Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build the project
    pause
    exit /b 1
)

REM Deploy to Vercel
echo Deploying to Vercel...
echo Please follow the prompts in your browser to complete the deployment.
call vercel

echo.
echo Deployment process completed!
echo If you see any errors above, please share them with the developer.
pause 