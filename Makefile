.PHONY: help build test-all test-puppeteer test-playwright test-selenium test-golang test-camoufox clean clean-data logs

help:
	@echo "CreepJS Bypass Testing - Available Commands:"
	@echo ""
	@echo "  make build           - Build all Docker images"
	@echo "  make test-all        - Run all framework tests"
	@echo "  make test-puppeteer  - Test Puppeteer only"
	@echo "  make test-playwright - Test Playwright only"
	@echo "  make test-selenium   - Test Selenium only"
	@echo "  make test-golang     - Test Golang chromedp only"
	@echo "  make test-camoufox   - Test Camoufox only"
	@echo "  make clean           - Remove containers and images"
	@echo "  make clean-data      - Remove screenshot data"
	@echo "  make logs            - View logs from last run"
	@echo ""

build:
	@echo "Building all Docker images..."
	docker compose build

test-all:
	@echo "Running all framework tests..."
	./test-all.sh

test-puppeteer:
	@echo "Testing Puppeteer..."
	docker compose up puppeteer-scraper

test-playwright:
	@echo "Testing Playwright..."
	docker compose up playwright-scraper

test-selenium:
	@echo "Testing Selenium..."
	docker compose up selenium-scraper

test-golang:
	@echo "Testing Golang chromedp..."
	docker compose up golang-chromedp-scraper

test-camoufox:
	@echo "Testing Camoufox..."
	docker compose up camoufox-scraper

clean:
	@echo "Cleaning up containers and images..."
	docker compose down
	docker system prune -f

clean-data:
	@echo "Removing screenshot data..."
	rm -rf ./data/*

logs:
	@echo "Showing logs..."
	docker compose logs

results:
	@echo "Screenshot results:"
	@ls -lh ./data/*.png 2>/dev/null || echo "No screenshots found yet. Run tests first."
