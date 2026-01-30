@echo off
chcp 65001 >nul
cd /d "%~dp0"
title OFM - Terminal

cls
echo.
echo  ========================================
echo    OFM - Lancer le projet a la main
echo  ========================================
echo.
echo  Tape ces 2 commandes UNE PAR UNE :
echo.
echo    1.  npm install
echo        (Attends que ça se termine.)
echo.
echo    2.  npm run dev
echo        (Le serveur demarre. Garde cette fenetre ouverte.)
echo.
echo  Puis ouvre ton navigateur sur :  http://localhost:5173
echo.
echo  ========================================
echo.

