from playwright.sync_api import sync_playwright
from camoufox.sync_api import Camoufox
from pathlib import Path
import time

# Example 1: Basic Firefox (No Camoufox)
def test_basic_firefox():
    print('Testing Basic Firefox (no stealth)...')

    with sync_playwright() as p:
        browser = p.firefox.launch(headless=True)
        page = browser.new_page()

        page.goto('https://abrahamjuliot.github.io/creepjs/')
        time.sleep(10)

        data_dir = Path(__file__).parent.parent / 'data'
        data_dir.mkdir(exist_ok=True)
        page.screenshot(path=str(data_dir / 'camoufox-basic.png'), full_page=True)
        browser.close()

# Example 2: Camoufox with Stealth + Xvfb
def test_stealth_camoufox():
    print('Testing Camoufox with Stealth + Xvfb...')

    with Camoufox(
        headless=False,  # Use Xvfb virtual display
        humanize=True,
        geoip=True,
    ) as browser:
        page = browser.new_page()

        page.goto('https://abrahamjuliot.github.io/creepjs/')
        time.sleep(10)

        data_dir = Path(__file__).parent.parent / 'data'
        data_dir.mkdir(exist_ok=True)
        page.screenshot(path=str(data_dir / 'camoufox-stealth.png'), full_page=True)
        browser.close()

if __name__ == '__main__':
    test_basic_firefox()
    print('\n---\n')
    test_stealth_camoufox()
