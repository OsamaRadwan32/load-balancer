const { queueManager } = require("../services/loadBalancerService");

const numberOfServers = 4;
let serverIterator = 0;

const processRequest = async (req, res) => {
  try {
    serverIterator++;
    if (serverIterator > 4) {
      serverIterator = 1;
    }

    const serverResponse = await queueManager(req, res, serverIterator);
    res.status(200).json(serverResponse);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  processRequest,
};
