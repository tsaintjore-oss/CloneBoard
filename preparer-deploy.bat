j@echo off
chcp 65001 >nul
echo.
echo === Préparation pour mettre le site en ligne ===
echo.

where git >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Git n'est pas installé ou pas dans le PATH.
    echo.
    echo 1. Télécharge Git pour Windows : https://git-scm.com/download/win
    echo 2. Installe-le (tout laisser par défaut).
    echo 3. Ferme et rouvre Cursor, puis relance ce script.
    echo.
    pause
    exit /b 1
)

cd /d "%~dp0"

if not exist .git (
    echo Initialisation du dépôt Git...
    git init
    echo.
)

echo Ajout des fichiers...
git add .
echo.

echo Premier commit...
git commit -m "Première version - prêt pour déploiement"
echo.

if errorlevel 0 (
    echo [OK] Ton projet est prêt pour GitHub / Vercel.
    echo.
    echo Prochaine étape :
    echo 1. Va sur https://github.com et crée un compte si besoin.
    echo 2. Clique "New repository", donne un nom (ex: saas-ofm).
    echo 3. Ne coche PAS "Add README".
    echo 4. Dans un terminal ici, tape :
    echo    git remote add origin https://github.com/TON_COMPTE/saas-ofm.git
    echo    git branch -M main
    echo    git push -u origin main
    echo    (remplace TON_COMPTE et saas-ofm par ton compte et le nom du repo)
    echo.
) else (
    echo Si tu as déjà fait un commit avant, c'est normal. Tu peux continuer avec "git push" après avoir ajouté le remote.
    echo.
)

pause
