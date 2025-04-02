@echo off
echo Starting GOAL DIGGER...
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

REM Check if package.json exists
if not exist package.json (
    echo Error: package.json not found
    echo Please make sure you're in the correct directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the development server
echo Starting the development server...
call npm run dev

REM If the server fails to start, pause to show any error messages
if %errorlevel% neq 0 (
    echo Error: Failed to start the development server
    pause
    exit /b 1
) 