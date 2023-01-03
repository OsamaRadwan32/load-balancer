const { queueManager } = require("../services/loadBalancerService");

const processRequest = async (req, res) => {
  try {
    const serverResponse = await queueManager(req, res);
    res.status(200).json(serverResponse);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  processRequest,
};
