const express = require("express");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const { generateArray } = require("../server_1/services/serverService");

dotenv.config();

const app = express();

// ----------------------------------
// Routes
// ----------------------------------
app.get("/", (req, res) => {
  res.send("Hello World from Server 1!");
});

app.post("/alibabaslider", async (req, res) => {
  console.log("Posting");
  try {
    const array = generateArray();
    console.log(array);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1366, height: 768 },
    });
    const page = await browser.newPage();
    page.setRequestInterception(true);
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => false,
      });
    });
    let url = null;
    page.on("request", (request) => {
      if (request.url().includes("cf.aliyun.com/nocaptcha/analyze")) {
        request.abort();
        url = request.url();
        return;
      }
      request.continue();
    });
    await page.goto("https://damo.alibaba.com/user/signup/?");
    // const elements = await page.$x('/html/body/div[3]/div[1]/form/div[1]/div/div[1]')
    // await elements[0].click()
    await page.focus(".phone");
    page.keyboard.type("18555032657");
    const elements = await page.$x("//div[3]/div[1]/form/div[2]/button");
    await elements[0].click();
    await new Promise((r) => setTimeout(r, 5000));
    const sliderElement = await page.$(".slidetounlock");
    const slider = await sliderElement.boundingBox(); //kbire
    const sliderHandle = await page.$(".nc_iconfont.btn_slide");
    const handle = await sliderHandle.boundingBox(); //s8eer
    await page.mouse.move(
      handle.x + handle.width / 2,
      handle.y + handle.height / 2
    );
    await page.mouse.down();
    let i = 0;
    while (i < array.length) {
      await page.mouse.move(handle.x + array[i], handle.y + handle.height / 2);
      i += 1;
    }
    await page.mouse.up();
    res.send(url);
    await browser.close();
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

// ----------------------------------
// Run App
// ----------------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error while starting server: ${error}`);
  } else {
    console.log(`----------------------------------`);
    console.log(`Server 1 running on port ${PORT}`);
    console.log(`----------------------------------`);
  }
});
