module.exports = {
    run: async(client, message, args) => {
let numberOfComments2 = 1;
let args2 = message.content.substring(5).replace(/\s+/g, '').toString();
console.log(args2);
(async () => {
    const puppeteer = require('puppeteer');
    puppeteer.launch({ headless: false, args: ['--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {

    const timer = ms => new Promise(res => setTimeout(res, ms))
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'codeggio_');
    await page.type('input[name="password"]', 'Codeggio1327*');
    await page.click('button[type="submit"]', {delay: 100});
    // await page.waitForSelector('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR');
    // await page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.bIiDR');
    await page.waitForSelector('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm');
    await page.click('body > div.RnEpo.Yx5HN > div > div > div > div.mt3GC > button.aOOlW.HoLwm');
    await page.goto(args2, {
        waitUntil: 'networkidle2'
    });
    message.channel.send("Lütfen bekleyiniz!");
    while(page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > li > div > button > span')){
        //await page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > li > div > button > span');
    let user = await page.evaluate(() => 
    Array.from(document.getElementsByClassName("_6lAjh")).map(username => [username.textContent])
    ); 
    let comments = await page.evaluate(() => 
    // Array.from(document.getElementsByClassName("sqdOP yWX7d     _8A5w5   ZIAjV")).map(comment => [comment.href, comment.textContent])
       Array.from(document.querySelectorAll("div.C4VMK > span")).map(comment => [comment.textContent])
    );
    var arrayOfObject = user.map(function (value, index){
        return [value, comments[index]]
     });
    //  for(var value of arrayOfObject.entries()){
    //      console.log(value);
    //  }
    
    const numberOfComments = user.length;
    console.log(numberOfComments, numberOfComments2)
        if(numberOfComments !== numberOfComments2){
            numberOfComments2 = numberOfComments;
            if(page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > li > div > button > span')&&(numberOfComments2 = numberOfComments))
            {
                await page.click('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > li > div > button > span');
                await page.waitForSelector('#react-root > section > main > div > div.ltEKP > article > div.eo2As > div.EtaWk > ul > li > div > button > span');
                await timer(2000);
            }
            continue;
        }
        else {
            let randomNumber = Math.floor(Math.random()*numberOfComments);
            console.log(arrayOfObject[randomNumber][0]);
            await browser.close();
            await message.channel.send("Kazanan: "+ arrayOfObject[randomNumber][0]);
            break;
        }
            
    }
    }).catch(function(error) {
        console.error(error);
    });
    }
  )();
    },
    aliases: ['cekilis'],
    description: "Çekiliş botu"
}