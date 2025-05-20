@echo off
cd /d %~dp0
call venv\Scripts\activate
set FLASK_APP=stockdata.py
set FLASK_ENV=development
flask run --port=8080
