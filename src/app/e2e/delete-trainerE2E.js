const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function deleteTrainerTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Assume the trainer is listed on a specific URL
    await driver.get('http://localhost:4200/trainer');

    // Find the trainer entry by some identifiable information, e.g., email
    // This example assumes there's a delete button directly in the row of the created trainer
    const trainerRow = await driver.findElement(By.xpath(`//td[text()='john.doe@example.com']/following-sibling::td/button[@class='delete-button']`));
    await trainerRow.click();

    // Confirm the deletion if there's a confirmation dialog
    const confirmButton = await driver.wait(until.elementLocated(By.id('confirm-delete')), 5000);
    await confirmButton.click();

    // Wait for the page to reflect the deletion, could be a message or checking the absence of the row
    await driver.wait(until.stalenessOf(trainerRow), 10000);

    // Optional: Assert that the trainer no longer appears in the list
    let isPresent = await driver.findElements(By.xpath(`//td[text()='john.doe@example.com']`));
    assert.strictEqual(isPresent.length, 0, "Trainer should no longer be present in the list.");

  } finally {
    await driver.quit();
  }
}

deleteTrainerTest().catch(console.error);
