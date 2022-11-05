export const sendResponse = (statusCode: number, body: any) => {
  const response = {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-origin": "*",
      "Access-Control=Allow-Credentials": true,
    },
  };

  return response;
};
