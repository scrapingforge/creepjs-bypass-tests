# CreepJS Browser Fingerprinting Bypass Testing

This project tests various browser automation frameworks against CreepJS fingerprinting detection. It includes Docker configurations for Puppeteer, Playwright, Selenium, Golang chromedp, and Camoufox.

## Project Structure

```
creepjs/
├── docker-compose.yml
├── Dockerfile.puppeteer
├── Dockerfile.playwright
├── Dockerfile.selenium
├── Dockerfile.golang
├── Dockerfile.camoufox
├── package.json
├── requirements.txt
├── requirements-camoufox.txt
├── go.mod
├── go.sum
├── src/
│   ├── puppeteer-scraper.js
│   ├── playwright-scraper.js
│   ├── selenium-scraper.py
│   ├── golang-scraper.go
│   └── camoufox-scraper.py
├── data/                    # Screenshots will be saved here
└── README.md
```

## Prerequisites

- Docker
- Docker Compose V2 (comes with Docker Desktop)

## Quick Start

### Run All Tests

To test all frameworks at once:

```bash
# Run each framework individually
docker compose up puppeteer-scraper
docker compose up playwright-scraper
docker compose up selenium-scraper
docker compose up golang-chromedp-scraper
docker compose up camoufox-scraper
```

### Run Individual Framework Tests

**Puppeteer:**
```bash
docker compose up puppeteer-scraper
```

**Playwright:**
```bash
docker compose up playwright-scraper
```

**Selenium:**
```bash
docker compose up selenium-scraper
```

**Golang chromedp:**
```bash
docker compose up golang-chromedp-scraper
```

**Camoufox:**
```bash
docker compose up camoufox-scraper
```

## Results

After running tests, screenshots will be saved in the `./data/` directory:

- `puppeteer-stealth-headless.png` - Puppeteer with stealth (headless mode)
- `puppeteer-stealth-xvfb.png` - Puppeteer with stealth + Xvfb
- `playwright-stealth-headless.png` - Playwright with stealth (headless mode)
- `playwright-stealth-xvfb.png` - Playwright with stealth + Xvfb
- `selenium-stealth-headless.png` - Selenium with UC (headless mode)
- `selenium-stealth-xvfb.png` - Selenium with UC + Xvfb
- `golang-stealth-headless.png` - Golang chromedp (headless mode)
- `golang-stealth-xvfb.png` - Golang chromedp + Xvfb
- `camoufox-basic.png` - Basic Firefox (no stealth)
- `camoufox-stealth.png` - Camoufox with all features + Xvfb

## Expected Stealth Scores

Based on testing against CreepJS:

### Headless Mode
- Puppeteer + Stealth: **67%**
- Playwright + Stealth: **71%**
- Selenium + UC: **76%**
- Golang chromedp: **69%**
- Basic Firefox: **61%**

### Xvfb (Virtual Display) Mode
- Puppeteer + Stealth + Xvfb: **88%**
- Playwright + Stealth + Xvfb: **90%**
- Selenium + UC + Xvfb: **91%**
- Golang chromedp + Xvfb: **87%**
- Camoufox + Xvfb: **95%** ⭐ **Best**

## Framework Details

### Puppeteer
- **Language:** Node.js
- **Stealth Plugin:** puppeteer-extra-plugin-stealth
- **Best Use Case:** Node.js projects, large ecosystem
- **Stealth Score:** 88% (with Xvfb)

### Playwright
- **Language:** Node.js
- **Stealth Plugin:** puppeteer-extra-plugin-stealth (via playwright-extra)
- **Best Use Case:** Multi-browser support, modern API
- **Stealth Score:** 90% (with Xvfb)

### Selenium
- **Language:** Python
- **Stealth Library:** undetected-chromedriver
- **Best Use Case:** Python projects, mature ecosystem
- **Stealth Score:** 91% (with Xvfb)

### Golang chromedp
- **Language:** Golang
- **Stealth Approach:** Chrome flags
- **Best Use Case:** High-performance, production-scale scraping
- **Stealth Score:** 87% (with Xvfb)

### Camoufox
- **Language:** Python
- **Stealth Approach:** Firefox with built-in anti-fingerprinting
- **Best Use Case:** Maximum stealth, privacy-focused scraping
- **Stealth Score:** 95% (with Xvfb) ⭐ **Winner**

## Troubleshooting

### Build Issues

If you encounter build errors, try rebuilding without cache:

```bash
docker compose build --no-cache puppeteer-scraper
```

### Permission Issues

If you have permission issues with the data directory:

```bash
chmod -R 755 ./data
```

### Chrome/Chromium Not Found

The Dockerfiles handle Chrome/Chromium installation. If you see errors, ensure Docker has enough resources allocated (at least 2GB RAM).

## Customization

### Modify Wait Time

Edit the source files and change the sleep/timeout duration:

```javascript
// JavaScript (Puppeteer/Playwright)
await page.waitForTimeout(10000); // Change 10000 to desired milliseconds
```

```python
# Python (Selenium/Camoufox)
time.sleep(10)  # Change 10 to desired seconds
```

```go
// Golang
chromedp.Sleep(10*time.Second), // Change 10 to desired seconds
```

### Change Target URL

Modify the target URL in each scraper file:

```javascript
await page.goto('https://your-target-url.com/', { waitUntil: 'networkidle2' });
```

## Clean Up

To remove all containers and images:

```bash
docker compose down
docker system prune -a
```

To clean up only the data directory:

```bash
rm -rf ./data/*
```

## Contributing

Feel free to submit issues or pull requests to improve the testing setup.

## License

MIT

## Related Resources

- [CreepJS Project](https://github.com/abrahamjuliot/creepjs)
- [Puppeteer Extra](https://github.com/berstend/puppeteer-extra)
- [Playwright](https://playwright.dev/)
- [Selenium](https://www.selenium.dev/)
- [chromedp](https://github.com/chromedp/chromedp)
- [Camoufox](https://github.com/daijro/camoufox)

## Blog Post

For a detailed explanation of these tests and results, read the full blog post:
[How to Bypass CreepJS Browser Fingerprinting in 2025](https://yoursite.com/blog/bypass-creepjs)
