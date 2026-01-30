@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "SRC=C:\Users\ordi2137649\.cursor\projects\c-Users-ordi2137649-Desktop-saas-ofm\assets\c__Users_ordi2137649_AppData_Roaming_Cursor_User_workspaceStorage_d01bb52e3e66952deb68ed1faec76847_images_image-647256e6-39a7-4b59-9498-7eff59fc8918.png"
set "DEST=%~dp0public\icon-subscriptions.png"
if not exist "%SRC%" (
  echo Fichier source introuvable.
  echo Copie manuellement ton icone (bookmark + plus, teal) dans:
  echo   %DEST%
  pause
  exit /b 1
)
copy /Y "%SRC%" "%DEST%" >nul
if errorlevel 1 (echo Erreur copie. & pause & exit /b 1)
echo OK: icon-subscriptions.png mis a jour dans public\
pause
