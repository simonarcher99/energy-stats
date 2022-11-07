import AWS from "aws-sdk";
import { sendResponse } from "./utils";
import { z } from "zod";

const cognito = new AWS.CognitoIdentityServiceProvider();

const signupSchema = z.object({
  password: z.string().min(6),
  email: z.string(),
  givenName: z.string(),
  familyName: z.string(),
});

export const handler = async (event: any) => {
  try {
    const parsedEvent = signupSchema.safeParse(JSON.parse(event.body));
    console.log(`body: ${event.body}`)
    console.log(`Input is valid: ${parsedEvent.success}`);
    if (!parsedEvent.success) {
      return sendResponse(400, { message: "Invalid input" });
    }

    const { givenName, familyName, email, password } = parsedEvent.data;
    const user_pool_id = process.env.user_pool_id as string;
    const params = {
      UserPoolId: user_pool_id,
      Username: email,
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
        {
          Name: "given_name",
          Value: givenName,
        },
        {
          Name: "family_name",
          Value: familyName,
        },
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
      MessageAction: "SUPPRESS",
    };
    console.log(`Sending to cognito`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    let response;
    try {
      response = await cognito.adminCreateUser(params).promise();
    } catch (error) {
      console.log(JSON.stringify(error));
      return;
    }

    console.log(`Sent to cognito`);
    if (response.User) {
      const paramsForSetPass = {
        Password: password,
        UserPoolId: user_pool_id,
        Username: email,
        Permanent: true,
      };
      await cognito.adminSetUserPassword(paramsForSetPass).promise();
    }
    return sendResponse(200, { message: "User registraion succesful" });
  } catch (error) {
    return sendResponse(500, error);
  }
};
