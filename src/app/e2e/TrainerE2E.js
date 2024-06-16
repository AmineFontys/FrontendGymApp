const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function testCreateTrainerForm(driver) {
  
  await driver.get('http://localhost:4200/create-trainer');

  await driver.findElement(By.id('firstName')).sendKeys('John');
  await driver.findElement(By.id('surName')).sendKeys('Doe');
  await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
  await driver.findElement(By.id('phoneNumber')).sendKeys('1234567890');
  await driver.findElement(By.id('birthDate')).sendKeys('1990-01-01', Key.TAB);
  await driver.findElement(By.id('male')).click();

  await driver.findElement(By.css('button[type="submit"]')).click();
  console.log('Trainer created successfully');
  
  await driver.wait(until.urlIs('http://localhost:4200/trainer'), 10000); 

  return driver;
}

async function testDeleteTrainer(driver) {
  
  await driver.wait(until.elementLocated(By.css('.custom-table')), 10000);

  
  const trainerRow = await driver.findElement(By.xpath("//td[contains(text(), 'john.doe@example.com')]"));
  await trainerRow.click();

  await driver.wait(until.elementLocated(By.css('tr.selected')), 5000); 

    
  const deleteButton = await driver.wait(until.elementLocated(By.id('deleteTrainer')), 5000); 
  await deleteButton.click();
  await driver.sleep(1000);
  let trainers = await driver.findElements(By.xpath("//td[contains(text(), 'john.doe@example.com')]"));
  assert.strictEqual(trainers.length, 0, "Trainer should be deleted");
  console.log('Trainer deleted successfully');
}
async function testInvalidEmailForm(driver) {
  try {
   
    await driver.get('http://localhost:4200/create-trainer');

    
    await driver.findElement(By.id('firstName')).sendKeys('Jane');
    await driver.findElement(By.id('surName')).sendKeys('Smith');
    await driver.findElement(By.id('email')).sendKeys('jane.smith'); 
    await driver.findElement(By.id('phoneNumber')).sendKeys('1234567890');
    await driver.findElement(By.id('birthDate')).sendKeys('1985-12-15', Key.TAB);
    await driver.findElement(By.id('female')).click();

    
    await driver.findElement(By.css('button[type="submit"]')).click();

    
    let errorMessage = await driver.wait(until.elementLocated(By.css('.error-message')), 5000);
    assert(await errorMessage.getText(), 'Invalid email format', "The error message should indicate an invalid email format");

  } catch (error) {
    console.error('An error occurred during the invalid email test:', error);
    throw error; 
  }
}

async function runTestsWithInvalidInput() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await testInvalidEmailForm(driver);
    console.log("Test for invalid email completed successfully.");
  } finally {
    await driver.quit();
    console.log("Driver closed after testing invalid inputs.");
  }
}




async function runTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await testCreateTrainerForm(driver)
      .then(() => testDeleteTrainer(driver))
      .catch(err => {
        console.error('Creation failed or navigation did not verify:', err);
        throw err; 
      });
  } finally {
    await driver.quit();
  }
}

runTests().catch(console.error);
//runTestsWithInvalidInput().catch(console.error);


