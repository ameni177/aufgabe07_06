const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get("http://books.toscrape.com");
});


afterAll(async () => {
    setTimeout(() => {
        driver.quit()
    }, 10000); ;
  });

test("Books to scrape", async () => {
 

//await driver.wait(until.elementsLocated(By.css(".athing")), 10000) // Evtl einbauen, falls die Elemente noch länger laden
  


  //let allTitles = [];
  //let travelbooks = [];
  //const articles = await driver.findElements(By.css(".product_pod"));
    //    expect(articles.length).toBeGreaterThan(0);
  //for (let article of articles) {
    
    //let title = await article.findElement(By.css("h3 a")).getAttribute("title");
    //let price = await article.findElement(By.css(".price_color")).getText();
    //let avail = await article.findElement(By.css(".instock.availability")).getText();
    //allTitles.push({title,price,avail});
   // fs.writeFileSync("books.json", JSON.stringify(allTitles, null, 2));
  //}
  //const travelkat = await driver.findElement(By.css(".nav li ul li a"));

    //travelkat.click();
    //const cat = await driver.findElement(By.css(".nav li ul li a"))
    //cat.click()
 
    //for (let c in cat) {
    
        // console.log(l.getText())
      //   await c.click();
        // await driver.navigate().back();
         //await driver.sleep(2000);
     // }

  //await travel.click();


//await travel.click()
const categories = await driver.findElements(By.css(".nav li ul li a"));

    let allCategories = [];
   
    for (let category of categories) {
      const cat = await category.getText();
     
      await category.click();
      const articles = await driver.findElements(By.css(".product_pod"));
      expect(articles.length).toBeGreaterThan(0);
      //if (cat=="Art"){
        let allTitles = [];
for (let article of articles) {
  //let beschreibung = await article.findElements(By.css("h3 a"))

  let title = await article.findElement(By.css("h3 a")).getAttribute("title");
  let price = await article.findElement(By.css(".price_color")).getText();
  let avail = await article.findElement(By.css(".instock.availability")).getText();
  //await beschreibung.click()
  //await driver.wait(until.elementLocated(By.css(".product_page")), 10000);
  //let beschreibung1 = await article.findElements(By.css(".product_page p")).getText();
  //await driver.navigate().back();
  allTitles.push({title,price,avail});
  fs.writeFileSync(cat+ ".json", JSON.stringify(allTitles, null, 2));
//}
}

      await driver.navigate().back();
      
      
      await driver.wait(until.elementLocated(By.css(".side_categories")), 10000);
    }
},100000);



