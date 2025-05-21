@echo off
cd /d %~dp0

echo Checking for Python...
where python >nul 2>nul || (
  echo ❌ Python is not installed. Please install it from https://www.python.org/downloads/windows/
  exit /b
)

echo Creating virtual environment...
python -m venv venv

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies from requirements.txt, this might take a minute...
pip install -r requirements.txt --progress-bar on --no-cache-dir

echo Starting Flask API...
set FLASK_APP=stockdata.py
set FLASK_ENV=development
flask run --port=8080
