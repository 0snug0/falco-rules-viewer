#!/bin/bash
set -e
echo "Generating data..."
python3 ../generate_data.py
echo "Data generated."
echo "Building frontend..."
npm run build
echo "Frontend built."