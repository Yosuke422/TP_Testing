const { Builder, By, until } = require('selenium-webdriver');
const { spawn } = require('child_process');
const path = require('path');

describe('Reservation System Test', () => {
  let driver;
  let server;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();

    // Start the server
    const serverPath = path.resolve(__dirname, '../../src/app.js');
    server = spawn('node', [serverPath]);

    // Wait for the server to start
    await new Promise((resolve) => {
      server.stdout.on('data', (data) => {
        if (data.includes('Server is running on http://localhost:3000')) {
          resolve();
        }
      });
    });
  });

  afterAll(async () => {
    await driver.quit();

    // Stop the server
    server.kill();
  });

  test('should complete the reservation process', async () => {
    // Register a member
    await driver.get('http://localhost:3000/memberRegistration');

    await driver.findElement(By.name('name')).sendKeys('Jane');
    await driver.findElement(By.name('surname')).sendKeys('Doe');
    await driver.findElement(By.name('email')).sendKeys('jane.doe@example.com');
    await driver.findElement(By.name('password')).sendKeys('password123');

    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('http://localhost:3000/gymSelection'), 5000);

    // Select a gym
    await driver.findElement(By.id('gym')).sendKeys('Gym A');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('http://localhost:3000/machineSelection'), 5000);

    // Select machines
    await driver.findElement(By.id('Treadmill')).click();
    await driver.findElement(By.id('Bike')).click();
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.urlIs('http://localhost:3000/reservationConfirmation'), 5000);

    // Check reservation confirmation
    const url = await driver.getCurrentUrl();
    expect(url).toBe('http://localhost:3000/reservationConfirmation');
  });
});
