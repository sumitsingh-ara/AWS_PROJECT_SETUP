const lambdaLocal = require("lambda-local");
const path = require("path");

var jsonPayload = {
  body: { first: 20, second: 3 },
};
lambdaLocal
  .execute({
    event: jsonPayload,
    lambdaPath: path.join(__dirname, "sum.js"),
    timeoutMs: 3000,
  })
  .then(function (done) {
    console.log(done);
  })
  .catch(function (err) {
    console.log(err);
  });
