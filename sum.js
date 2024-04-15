// sum.js

module.exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      `Hello from Lambda => ${event.body.first + event.body.second}`
    ),
  };
};
