const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

let driver;

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://books.toscrape.com");
}, 30000); // Increase the timeout for beforeAll

afterAll(async () => {
  setTimeout(() => {
    driver.quit();
  }, 10000);
});

test("Books to scrape", async () => {
  let categories = await driver.findElements(By.css(".nav li ul li a"));

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const cat = await category.getText();

    await category.click();
    await driver.wait(until.elementLocated(By.css(".product_pod")), 10000);

    const articles = await driver.findElements(By.css(".product_pod"));
    expect(articles.length).toBeGreaterThan(0);

    let allTitles = [];
    for (let article of articles) {
      let titleElement = await article.findElement(By.css("h3 a"));
      let title = await titleElement.getAttribute("title");
      let price = await article.findElement(By.css(".price_color")).getText();
      let avail = await article.findElement(By.css(".instock.availability")).getText();

      // Click on the title link to navigate to the detail page
      await titleElement.click();
      await driver.wait(until.elementLocated(By.css(".product_page")), 10000);

      // Get the description from the book detail page
      let description = '';

      // Check if the XPath exists before attempting to find the element
      const xpathExists = await driver.findElements(By.xpath('//*[@id="content_inner"]/article/p'));
      if (xpathExists.length > 0) {
        let descriptionElement = await driver.findElement(By.xpath('//*[@id="content_inner"]/article/p'));
        description = await descriptionElement.getText();
      }

      // Navigate back to the category page
      await driver.navigate().back();
      await driver.wait(until.elementLocated(By.css(".product_pod")), 10000);

      allTitles.push({ title, description, price, avail });
    }

    // Write the book details to a JSON file for the category
    fs.writeFileSync(`${cat}.json`, JSON.stringify(allTitles, null, 2));

    // Navigate back to the main page to select the next category
    await driver.navigate().back();
    await driver.wait(until.elementLocated(By.css(".side_categories")), 10000);

    // Re-fetch the category elements to avoid stale element references
    categories = await driver.findElements(By.css(".nav li ul li a"));
  }
}, 1000000); // Increase the timeout for the test
