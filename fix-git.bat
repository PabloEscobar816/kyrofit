@echo off
echo ===================================================
echo     KyroFit - FORCE Sync (Fix Errors)
echo ===================================================
echo.
echo [WARNING] This will overwrite the GitHub repository with your local files.
echo.

:: Ensure remote exists
git remote add origin https://github.com/PabloEscobar816/kyrofit.git 2>nul

:: Add and Commit
echo [1/3] Saving changes...
git add .
git commit -m "Force Sync Fix"

:: Force Push
echo [2/3] Uploading (Forcing)...
git push -u origin main --force

echo.
echo [SUCCESS] If no red errors above, it worked!
echo.
pause
