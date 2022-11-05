import { sendResponse } from "./utils";

export const handler = async (event: any) => {
  return sendResponse(200, {
    message: `Email ${event.requestContext.authorizer.claims.email} has been authorized`,
  });
};
