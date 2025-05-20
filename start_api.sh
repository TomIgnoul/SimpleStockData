#!/bin/bash
cd "$(dirname "$0")"
source venv/bin/activate
export FLASK_APP=stockdata.py
export FLASK_ENV=development
flask run --port=8080

