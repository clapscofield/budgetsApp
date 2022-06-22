//in e2e/tests/autocomplete.js
const webdriver = require("selenium-webdriver");
const { By, until } = webdriver; 
const driver = new webdriver.Builder().forBrowser("firefox").build();

describe("add budget form", () => {

  // e2e tests are too slow for default Mocha timeout
  beforeAll(function(done) {
    driver
      .navigate()
      .to("http://localhost:3000/")
      .then(() => done());
  });

  it('should show the right title', async () => {
    expect(await driver.getTitle()).toBe('React App');
  });

  it("open modal for adding new budget", function(done) {
    driver.findElement(By.id("addBudget")).click();
    driver
      .findElement(By.id("modal-content")).isDisplayed();
  });

  afterAll(() => driver.quit());
});