const { Builder, By, until } = require('selenium-webdriver');

describe('Member System Test', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should register a new member through the form', async () => {
    await driver.get('http://localhost:3000/memberRegistration');

    await driver.findElement(By.name('name')).sendKeys('Jane');
    await driver.findElement(By.name('surname')).sendKeys('Doe');
    await driver.findElement(By.name('email')).sendKeys('jane.doe@example.com');
    await driver.findElement(By.name('password')).sendKeys('password123');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlIs('http://localhost:3000/gymSelection'), 5000);
    const url = await driver.getCurrentUrl();
    expect(url).toBe('http://localhost:3000/gymSelection');
  });
});
