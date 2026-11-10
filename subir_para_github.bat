@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================================
echo   ENVIAR PROJETO SKINA DO PAO PARA O GITHUB
echo ========================================================
echo.
echo 1. Crie um repositorio vazio no GitHub (https://github.com/new)
echo    Sugestao de nome: skina-do-pao
echo.
set /p REPO_URL="2. Cole aqui o link do repositorio (ex: https://github.com/delfinog-dot/skina-do-pao.git): "

if "%REPO_URL%"=="" (
    echo [ERRO] Nenhum link informado. Operacao cancelada.
    pause
    exit /b 1
)

echo.
echo Configurando repositorio remoto e enviando arquivos...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo ========================================================
echo   PROCESSO FINALIZADO!
echo ========================================================
pause
