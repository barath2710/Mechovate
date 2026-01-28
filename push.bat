@echo off
cd /d "c:\Users\BARATH KUMAR\OneDrive\Desktop\FRONTEND\mech"
git config core.editor "cmd /c exit"
git merge --abort 2>nul
git reset --hard HEAD
git push origin main
pause
