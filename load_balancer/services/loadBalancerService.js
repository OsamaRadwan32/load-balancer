var request = require("request");

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

const queueManager = async (request, response, serverIterator) => {
  try {
    const serverResponse = await sendRequestToServer(request, serverIterator);
    return serverResponse.body;
  } catch (error) {
    return error;
  }
};

// @desc Get Account Managers
const sendRequestToServer = async (appName, serverId) => {
  console.log(serverList[serverId - 1].ip_address);

  var options = {
    method: "POST",
    url: serverList[serverId - 1].ip_address + ":5000/alibabaslider",
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
