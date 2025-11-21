#!/bin/bash

echo "Testing all frameworks against CreepJS..."
echo "========================================"

echo -e "\n1. Testing Puppeteer..."
docker compose up puppeteer-scraper

echo -e "\n2. Testing Playwright..."
docker compose up playwright-scraper

echo -e "\n3. Testing Selenium..."
docker compose up selenium-scraper

echo -e "\n4. Testing Golang + chromedp..."
docker compose up golang-chromedp-scraper

echo -e "\n5. Testing Camoufox..."
docker compose up camoufox-scraper

echo -e "\n========================================"
echo "All tests completed! Check ./data/ for screenshots."
echo "Screenshot files:"
ls -lh ./data/*.png 2>/dev/null || echo "No screenshots found yet."
