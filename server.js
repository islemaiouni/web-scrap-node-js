const puppeteer = require("puppeteer");
const express = require('express')
const app = express()
const port = 3000

const baseURL = "http://bbc.com/"

app.get('/', (req, res) => {
    async function getData(url) {
        const browser = await puppeteer.launch(); //Step 1
        const page = await browser.newPage(); //Step 2
        await page.goto(url); //Step 3

        const news = await page.evaluate(() => {
            const NEWS  = []
            const listOfAllNews = Array.from(document.querySelectorAll('.media-list__item')) //page one
            for (var i = 0; i < 5; i++) {
                const title = listOfAllNews[i].childNodes[1].children[1].childNodes[1].outerText
                NEWS.includes(title) ? i++ : topNews.push(title)
            }
            return topNews
        }) //Step 4

        console.log(news)

        res.send(news); //Step 5
        browser.close(); // Step 6
    }
    getData(baseURL)
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))