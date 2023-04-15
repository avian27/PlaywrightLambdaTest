import { test, expect, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';
const baseUrl: string = 'https://www.lambdatest.com/selenium-playground/';



test('Test Scenario 1', async ({ page }) => {
  await page.goto(baseUrl);
  await page.locator(`a[href='https://www.lambdatest.com/selenium-playground/simple-form-demo']`).click();
  await page.waitForLoadState('networkidle');
  expect(page.url()).toContain('simple-form-demo');
  const msgVar: string = 'Welcome to LambdaTest';
  await page.locator('input#user-message').fill(msgVar);
  await page.locator('#showInput').click();
  expect(await page.locator('#message').textContent()).toEqual(msgVar);

});

test('Test Scenario 2', async ({ page }) => {
  await page.goto(baseUrl);
  await page.getByText('Drag & Drop Sliders').click();
  await page.waitForLoadState('networkidle');
  const ele: Locator = page.locator(`//h4[text()=' Default value 15']//following-sibling::div//child::input`);
  const ele2: Locator = page.locator(`#rangeSuccess`);
  const targetVal: number = 95;
  let targetFlag = false;
  let srcBound = await ele.boundingBox();
  let i = 0.01;
  while (!targetFlag) {
    if (srcBound) {
      await ele.dragTo(ele, {
        force: true,
        targetPosition: {
          // moving the slider to the target value in %
          x: srcBound.width * i,
          y: 0,
        },
      });
    }
    let text = await ele2.textContent();
    if (text == targetVal.toString()) {
      targetFlag = true;
    }
    i = i + 0.01;
  }
  expect(await ele2.textContent()).toEqual('95');
});

test('Test Scenario 3', async ({ page }) => {
  page.on("dialog", async (alert) => {
    const msg = alert.message();
  });
  await page.goto(baseUrl);
  await page.locator(`a[href='https://www.lambdatest.com/selenium-playground/input-form-demo']`).click();
  await page.waitForLoadState('networkidle');
  expect(page.url()).toContain('input-form-demo');
  //await page.locator(`//button[text()='Submit']`).click();
  await page.locator('#name').fill(faker.name.firstName());
  await page.locator('#inputEmail4').type(faker.internet.email());
  await page.locator('#inputPassword4').type(`A@${faker.internet.password()}a1`);
  await page.locator('#company').fill(faker.company.name());
  await page.locator('#websitename').fill(faker.company.name());
  await page.locator('#inputCity').fill(faker.address.cityName());
  await page.locator('#inputAddress1').fill(faker.address.buildingNumber());
  await page.locator('#inputAddress2').fill(faker.address.secondaryAddress());
  await page.locator('#inputState').fill(faker.address.state());
  await page.locator('#inputZip').fill(faker.address.zipCode());
  await page.selectOption(`//select[@name='country']`, {
    label: "United States"
  });
  await page.locator(`//button[text()='Submit']`).click();
  await page.waitForLoadState('networkidle');
  expect(await page.locator('.success-msg.hidden').textContent()).toEqual('Thanks for contacting us, we will get back to you shortly.');
});
