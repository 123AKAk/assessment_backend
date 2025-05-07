const serverless = require('serverless-http');
const app = require('../app');

console.log("Serverless function initialized");

module.exports = serverless(app);
