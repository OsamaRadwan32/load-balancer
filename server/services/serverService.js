const http = require("node:http");

// @desc
const processHandler = async (req, res) => {
  request = req.body;
  response = {
    status: "success",
    message: "Request successfully handled!",
  };
};

// @desc
const setProcessStatus = async (req, res) => {
  const postData = JSON.stringify({
    activity_status: "true",
  });

  const processStatus = {
    hostname: "http://localhost",
    port: 3000,
    path: "/process",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const request = http.request(processStatus, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (error) => {
    console.error(`problem with request: ${error.message}`);
  });

  // Write data to request body
  req.write(postData);
  req.end();
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateArray() {
  let x = 460;
  let i = 1;
  let j = 1;
  let sliderValue = 1;
  let rand = null;
  const array = [];
  let z = 1;
  while (z <= 4) {
    array.push(sliderValue);
    console.log(sliderValue);
    sliderValue += 1;
    z += 1;
  }
  while (x - sliderValue > 50) {
    rand = randomIntFromInterval(i, i + 3);
    console.log("start of " + rand);
    let numberOfTimes = randomIntFromInterval(5, 10);
    console.log("number of times" + numberOfTimes);
    while (j <= numberOfTimes && x - sliderValue > 50) {
      sliderValue += rand;
      array.push(sliderValue);
      j += 1;
      console.log(sliderValue);
    }
    console.log("end of " + rand);
    i = rand;
    j = 1;
  }
  while (sliderValue != x) {
    sliderValue += 1;
    array.push(sliderValue);
    console.log(sliderValue);
  }
  return array;
}

module.exports = {
  processHandler,
  setProcessStatus,
  randomIntFromInterval,
  generateArray,
};

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// ---------------------------------------------------------------
// const returnRequestResult = async (req, res) => {
//   const postData = JSON.stringify({
//     activity_status: "true",
//   });

//   const processStatus = {
//     hostname: "http://localhost",
//     port: 3000,
//     path: "/requestResult",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": Buffer.byteLength(postData),
//     },
//   };

//   const req = http.request(processStatus, (res) => {
//     console.log(`STATUS: ${res.statusCode}`);
//     console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//     res.setEncoding("utf8");
//     res.on("data", (chunk) => {
//       console.log(`BODY: ${chunk}`);
//     });
//     res.on("end", () => {
//       console.log("No more data in response.");
//     });
//   });

//   req.on("error", (error) => {
//     console.error(`problem with request: ${error.message}`);
//   });

//   // Write data to request body
//   req.write(postData);
//   req.end();
// };
