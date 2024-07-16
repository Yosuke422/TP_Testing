const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const app = require('../../src/app');

describe('Reservation System Test', () => {
  let driver;
  let server;

  beforeAll((done) => {
    server = app.listen(3002, () => {
      console.log('Test server running on port 3002');
      done();
    });
  }, 10000);

  afterAll((done) => {
    server.close(done);
  }, 10000);

  beforeEach(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterEach(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('should complete the reservation process', async () => {
    try {
      await driver.get('http://localhost:3002/memberRegistration');

      await driver.findElement(By.name('name')).sendKeys('Jane');
      await driver.findElement(By.name('surname')).sendKeys('Doe');
      await driver.findElement(By.name('email')).sendKeys('jane.doe@example.com');
      await driver.findElement(By.name('password')).sendKeys('password123');
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.urlIs('http://localhost:3002/gymSelection'), 10000);

      await driver.findElement(By.id('gym')).sendKeys('Gym A');
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.urlIs('http://localhost:3002/machineSelection'), 10000);

      await driver.findElement(By.id('Treadmill')).click();
      await driver.findElement(By.id('Bike')).click();
      await driver.findElement(By.css('button[type="submit"]')).click();
      await driver.wait(until.urlIs('http://localhost:3002/reservationConfirmation'), 10000);

      const url = await driver.getCurrentUrl();
      expect(url).toBe('http://localhost:3002/reservationConfirmation');
    } catch (error) {
      console.error('Error during reservation process:', error);
      throw error;
    }
  }, 30000);
});
