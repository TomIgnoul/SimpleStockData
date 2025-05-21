#!/bin/bash
cd "$(dirname "$0")"

echo "Checking for Python..."
if ! command -v python3 &> /dev/null; then
  echo "Python3 is not installed. Please install Python first."
  exit 1
fi

echo "Creating virtual environment..."
python3 -m venv venv

echo "Activating virtual environment..."
source venv/bin/activate

echo "⬇Installing dependencies, this might take a minute..."
pip install -r backend/requirements.txt --progress-bar on --no-cache-dir

echo "Starting Flask API..."
export FLASK_APP=backend/stockdata.py
export FLASK_ENV=development
flask run --port=8080
