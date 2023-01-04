const express = require("express");
const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const { generateArray } = require("../server/services/serverService");
const UserAgent = require("user-agents");

dotenv.config();

const app = express();

// ----------------------------------
// Routes
// ----------------------------------
app.post("/alibabaslider", async (req, res) => {
  try {
    const userAgent = new UserAgent({
      deviceCategory: "desktop",
      platform: "Linux x86_64",
    });
    const array = generateArray();
    console.log(array);
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1366, height: 768 },
      ignoreDefaultArgs: [],
      timeout: 3000,
    });
    const page = await browser.newPage();
    page.setRequestInterception(true);
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", {
        get: () => false,
      });
    });
    let analayzetoken = null;
    let tbtokenurl = null;
    page.on("request", (request) => {
      if (request.url().includes("cf.aliyun.com/nocaptcha/analyze")) {
        request.abort();
        analayzetoken = request.url();
        console.log("Analyze Token:", analayzetoken);
        console.log("----------------------------------");
        return;
      }
      if (request.url().includes("checkPhoneNumberInput/?&_tb_token")) {
        tbtokenurl = request.url();
      }
      request.continue();
    });
    await page.setUserAgent(userAgent.data.userAgent);
    await page.goto("https://damo.alibaba.com/user/signup/?", { timeout: 0 });
    const html = await page.content();
    const reg = 'token" content="([^"]*)';
    const matches = html.match(reg);
    matches[1];

    // const elements = await page.$x('/html/body/div[3]/div[1]/form/div[1]/div/div[1]')
    // await elements[0].click()
    await page.focus(".phone");
    page.keyboard.type("18555032657");
    const elements = await page.$x("//div[3]/div[1]/form/div[2]/button");
    await elements[0].click();
    await new Promise((r) => setTimeout(r, 7000));
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
    res.send({
      analayze: analayzetoken,
      tbtokenurl: tbtokenurl,
      csrftoken: matches[1],
      userAgent: userAgent.data.userAgent,
    });
    await browser.close();
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// ----------------------------------
// Run App
// ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Error while starting server: ${error}`);
  } else {
    console.log(`----------------------------------`);
    console.log(`Server ${process.env.SERVER_ID} running on port ${PORT}`);
    console.log(`----------------------------------`);
  }
});
