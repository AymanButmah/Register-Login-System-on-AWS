function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode, //The client will have a different URL than API endpoint
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

module.exports.buildResponse = buildResponse;
