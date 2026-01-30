@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo.
echo  OFM - Demarrage du serveur...
echo.

where npm >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] npm introuvable.
    echo.
    echo Installe Node.js : https://nodejs.org
    echo Puis ferme et rouvre ce terminal.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installation des dependances (npm install)...
    call npm install
    if errorlevel 1 (
        echo [ERREUR] npm install a echoue.
        pause
        exit /b 1
    )
    echo.
)

echo Demarrage backend (3001) + frontend (5173)...
echo  Les deux sont necessaires pour : Connexion, paiement Stripe, Mes donnees.
echo.
echo  Une fois demarre, ouvre : http://localhost:5173
echo  - Page vente : http://localhost:5173/sales.html
echo  - Connexion / Acces : Log in (header ou footer) puis email.
echo.

REM NOTE: on evite "concurrently" (souvent manquant sur Windows)
REM et on lance 2 processus en parallele.
start "OFM Backend" cmd /k "npm run server"
start "OFM Frontend" cmd /k "npm run dev"


