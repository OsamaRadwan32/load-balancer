var request = require("request");

let serverIterator = 0;

const serverList = [
  {
    server_id: 1,
    ip_address: "http://10.110.99.38",
    port_number: 1,
  },
  {
    server_id: 2,
    ip_address: "http://10.110.99.49",
    port_number: 2,
  },
  {
    server_id: 3,
    ip_address: "http://10.110.99.8",
    port_number: 3,
  },
  {
    server_id: 4,
    ip_address: "http://10.110.99.56",
    port_number: 4,
  },
];

// @desc
const queueManager = async (req, res) => {
  try {
    serverIterator++;
    if (serverIterator > 4) {
      serverIterator = 1;
    }
    const serverResponse = await sendRequestToServer(req, serverIterator);
    console.log(`Server ${serverIterator + 10} Response:`, serverResponse.body);
    console.log("----------------------------------");
    return serverResponse.body;
  } catch (error) {
    return error;
  }
};

// @desc
const sendRequestToServer = async (appName, serverIterator) => {
  serverId = serverIterator - 1;
  console.log(serverList[serverId].ip_address);

  var options = {
    method: "POST",
    url: serverList[serverId].ip_address + ":5000/alibabaslider",
    headers: {},
  };

  return new Promise((resolve, reject) => {
    let req = request(options, function (error, response) {
      if (error) throw new Error(error);
    });

    req.on("response", (res) => {
      resolve(res);
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
};

module.exports = {
  queueManager,
};
