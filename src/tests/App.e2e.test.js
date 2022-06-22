//in e2e/tests/autocomplete.js
const webdriver = require("selenium-webdriver");
const script = require('jest');
const { By, until } = webdriver; 
const driver = new webdriver.Builder().forBrowser("firefox").build();
const url = 'http://localhost:3000/'

describe("add budget form", () => {

    // e2e tests are too slow for default Mocha timeout
    beforeAll(function(done) {
        driver
        .navigate()
        .to("http://localhost:3000/")
        .then(() => done());
    });

    test('it performs a validation of title on the home page', async () => {
        const title = await driver.findElement(By.tagName('h1')).getText()
        expect(title).toContain('Budgets')
    })

    test('it verify the modal for adding new budget and showing in home page', async () => {
        await driver.findElement(By.xpath('//*[@id="addBudget"]')).click()
        await driver.findElement(By.xpath('//*[@id="name"]')).sendKeys("Novo budget")
        await driver.findElement(By.xpath('//*[@id="max"]')).sendKeys("1000")
        await driver.findElement(By.xpath('//*[@id="addButton"]')).click()
        const newBudget = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[1]')).getText()
        expect(newBudget).toContain('Novo budget')
    })

    test('it verify the modal for adding new expense and showing in home page', async () => {
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/button[2]')).click()
        await driver.findElement(By.xpath('//*[@id="description"]')).sendKeys("Tênis")
        await driver.findElement(By.xpath('//*[@id="amount"]')).sendKeys("300")
        await driver.findElement(By.xpath('//*[@id="addExpense"]')).click()
        const newBudget = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div[1]/div[2]')).getText()
        expect(newBudget).toContain('300')
    })

    test('it add new budget and add new expense to it', async () => {
        //add new budget
        await driver.findElement(By.xpath('//*[@id="addBudget"]')).click()
        await driver.findElement(By.xpath('//*[@id="name"]')).sendKeys("Novo budget")
        await driver.findElement(By.xpath('//*[@id="max"]')).sendKeys("1000")
        await driver.findElement(By.xpath('//*[@id="addButton"]')).click()

        //add expense to it
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[1]/button[2]')).click()
        await driver.findElement(By.xpath('//*[@id="description"]')).sendKeys("Tênis")
        await driver.findElement(By.xpath('//*[@id="amount"]')).sendKeys("300")
        await driver.findElement(By.xpath('//*[@id="budgetId"]')).sendKeys("Novo budget")
        await driver.findElement(By.xpath('//*[@id="addExpense"]')).click()
        const newBudget = await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[1]/div/div[1]/div[2]')).getText()
        expect(newBudget).toContain('300')
    })

    test('it verify the view expenses after adding it', async () => {
        //click to view expenses
        await driver.findElement(By.xpath('//*[@id="root"]/div/div[2]/div[1]/div/div[3]/button[2]')).click()
        const title = await driver.findElement(By.xpath('//*[@id="expenses"]')).getText()
        expect(title).toContain('Expenses - Novo budget')
    })

    afterAll(() => driver.quit());
});