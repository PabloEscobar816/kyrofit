@echo off
echo ===================================================
echo     KyroFit - Easy GitHub Sync
echo ===================================================
echo.

:: Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed. Please install Git for Windows first.
    pause
    exit /b
)

:: Initialize if not repo
if not exist .git (
    echo [INFO] Initializing new Git repository...
    git init
    git branch -M main
)

:: Check for remote
git remote -v >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ACTION] No GitHub repository linked.
    echo Please paste your GitHub Repository URL (e.g., https://github.com/username/repo.git)
    set /p REPO_URL="URL: "
    git remote add origin %REPO_URL%
)

:: Add all files
echo.
echo [1/3] Adding files...
git add .

:: Commit
echo [2/3] Saving changes...
set "TIMESTAMP=%DATE% %TIME%"
git commit -m "Update: %TIMESTAMP%"

:: Push
echo [3/3] Uploading to GitHub...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] Code successfully uploaded to GitHub!
) else (
    echo [ERROR] Something went wrong. Check your internet or GitHub permissions.
)
echo.
pause
