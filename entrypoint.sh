#!/bin/sh
set -e

echo "Generating data from rules..."
python3 generate_data.py

echo "Starting development server..."
cd frontend
npm start
