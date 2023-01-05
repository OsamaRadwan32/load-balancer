var request = require("request");
// var queue = require("../");

let serverIterator = 0;
// var queueArr = [];

const serverList = [
  {
    server_id: 1,
    ip_address: "http://10.110.99.38",
    workspace: 11,
  },
  {
    server_id: 2,
    ip_address: "http://10.110.99.49",
    workspace: 12,
  },
  {
    server_id: 3,
    ip_address: "http://10.110.99.8",
    workspace: 13,
  },
  {
    server_id: 4,
    ip_address: "http://10.110.99.56",
    workspace: 14,
  },
  {
    server_id: 5,
    ip_address: "http://10.110.199.11",
    workspace: 15,
  },
  {
    server_id: 6,
    ip_address: "http://10.110.99.23",
    workspace: 16,
  },
  {
    server_id: 7,
    ip_address: "http://10.110.199.57",
    workspace: 17,
  },
  {
    server_id: 8,
    ip_address: "http://10.110.199.55",
    workspace: 20,
  },
  {
    server_id: 9,
    ip_address: "http://10.110.199.15",
    workspace: 21,
  },
];

// @desc
const requestHandler = async (req, res) => {
  try {
    serverIterator++;
    if (serverIterator > 9) {
      serverIterator = 1;
    }
    const serverResponse = await handlerMiddleware(req, serverIterator);
    // console.log("Server Id:", serverResponse.serverId);
    // console.log("Server IP Address:", serverResponse.ipAddress);
    // console.log("Workspace:", serverResponse.workspace);
    // console.log("Server Response:", serverResponse.serverResponse);
    // console.log(
    //   "--------------------------------------------------------------------"
    // );
    return serverResponse.serverResponse;
  } catch (error) {
    return error;
  }
};

// @desc
const handlerMiddleware = async (req, serverId) => {
  try {
    serverIdIndex = serverId - 1;
    ipAddress = serverList[serverIdIndex].ip_address;
    const serverResponse = await sendRequestToServer(req, ipAddress);
    console.log("Server Id:", serverId);
    console.log("Server IP Address:", ipAddress);
    console.log("Workspace:", serverList[serverIdIndex].workspace);
    console.log("Server Response:", serverResponse.body);
    console.log(
      "--------------------------------------------------------------------"
    );
    return {
      serverId: serverId,
      ipAddress: ipAddress,
      workspace: serverList[serverIdIndex].workspace,
      serverResponse: serverResponse.body,
    };
  } catch (error) {
    return error;
  }
};

// @desc
const sendRequestToServer = async (appName, ipAddress) => {
  var options = {
    method: "POST",
    url: ipAddress + ":5000/alibabaslider",
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

// @desc
// const queueManager = async (req, res) => {
//   try {
//     serverIterator++;
//     if (serverIterator > 4) {
//       serverIterator = 1;
//     }
//     queueArr.push({ serverIterator, req });
//     const serverResponse = await sendRequestToServer(req, serverIterator);
//     console.log(`Server ${serverIterator + 10} Response:`, serverResponse.body);
//     console.log("----------------------------------");
//     return serverResponse.body;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  requestHandler,
  // queueManager,
};
