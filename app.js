const puppeteer = require('puppeteer');

async function scrapeSwappaProduct(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    var phones = ["apple-iphone-7","apple-iphone-8","apple-iphone-8-plus","apple-iphone-x","apple-iphone-xr","apple-iphone-xs",'apple-iphone-xs-max','samsung-galaxy-s8','samsung-galaxy-s8-plus','samsung-galaxy-s9','samsung-galaxy-s9-plus','samsung-galaxy-s10-plus','samsung-galaxy-note-9','samsung-galaxy-note-10-plus'];


    for(var j = 0; j < phones.length; j++){
        
    const url = `https://swappa.com/mobile/buy/${phones[j]}/unlocked?condition=mint&sort=price_min`
    await page.goto(url, { waitUntil: 'networkidle2' });

    const [en] = await page.$x(`//*[@id="section_billboard"]/div/div[2]/div[3]/h1`);
    const src3 = await en.getProperty('innerText');
    const name = await src3.jsonValue();

    console.log(`*************************${name}****************************`);
  
    for(var i = 1; i < 4; i++){
       
        const [el] = await page.$x(`//*[@id="listing_previews"]/div[${i}]/a`);
        const src = await el.getProperty('href');
        const link = await src.jsonValue();

        //const [ez] = await page.$x(`//*[@id="listing_previews"]/div[${i}]/a`);
        const [ez] = await page.$x(`//*[@id="listing_previews"]/div[${i}]/a/div/div[2]/div/div/div[1]`);
        const src2 = await ez.getProperty('innerText');
        const info = await src2.jsonValue();

        const [ep] = await page.$x(`//*[@id="listing_previews"]/div[${i}]/a/div/div[2]/div/div/div[2]/div[1]`);
        const src3 = await ep.getProperty('innerText');
        const price = await src3.jsonValue();

        console.log(`${i}: ${link} Price: ${price} \n ${info}`);
        console.log(`================================================================================ \n`);  
        }
    }
    browser.close();
}
scrapeSwappaProduct();


