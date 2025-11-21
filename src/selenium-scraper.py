from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import undetected_chromedriver as uc
import time
from pathlib import Path

# Example 1: Selenium with Undetected ChromeDriver (Headless)
def test_stealth_selenium_headless():
    print('Testing Selenium with Undetected ChromeDriver (Headless)...')

    options = uc.ChromeOptions()
    options.add_argument('--headless=new')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')

    driver = uc.Chrome(options=options, version_main=142)

    try:
        driver.get('https://abrahamjuliot.github.io/creepjs/')
        time.sleep(10)

        data_dir = Path(__file__).parent.parent / 'data'
        data_dir.mkdir(exist_ok=True)
        driver.save_screenshot(str(data_dir / 'selenium-stealth-headless.png'))

        trust_score = driver.find_element(By.CLASS_NAME, 'lies').text
        print(f'Stealth Selenium (Headless) Trust Score: {trust_score}')

    except Exception as e:
        print(f'Error: {e}')
    finally:
        driver.quit()

# Example 2: Selenium with Undetected ChromeDriver + Xvfb (Virtual Display)
def test_stealth_selenium_xvfb():
    print('Testing Selenium with Undetected ChromeDriver + Xvfb...')

    options = uc.ChromeOptions()
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--window-size=1920,1080')

    driver = uc.Chrome(options=options, version_main=142)

    try:
        driver.get('https://abrahamjuliot.github.io/creepjs/')
        time.sleep(10)

        data_dir = Path(__file__).parent.parent / 'data'
        data_dir.mkdir(exist_ok=True)
        driver.save_screenshot(str(data_dir / 'selenium-stealth-xvfb.png'))
    except Exception as e:
        print(f'Error: {e}')
    finally:
        driver.quit()

if __name__ == '__main__':
    test_stealth_selenium_headless()
    print('\n---\n')
    test_stealth_selenium_xvfb()
