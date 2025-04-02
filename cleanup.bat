@echo off
echo Cleaning up GOAL DIGGER...
cd /d "%~dp0"
taskkill /F /IM node.exe 2>nul
echo Cleanup complete!
pause 