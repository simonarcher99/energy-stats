import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { z } from "zod";
import { sendResponse } from "../auth/utils";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const getMetersSchema = z.object({
  userId: z.string(),
});

const METER_TABLE_NAME = process.env.meter_table as string;

export const handler = async (event: any) => {
  console.log(event.queryStringParameters);
  try {
    const parsedEvent = getMetersSchema.safeParse(event.queryStringParameters);

    if (!parsedEvent.success) {
      return sendResponse(400, { message: "Invalid input" });
    }
    console.log(parsedEvent.data);

    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

    const params = {
      TableName: METER_TABLE_NAME,
      KeyConditionExpression: "#userId = :userId",
      ExpressionAttributeNames: {
        "#userId": "userId",
      },
      ExpressionAttributeValues: {
        ":userId": { S: parsedEvent.data.userId },
      },
    };

    console.log("Querying table");
    const result = await dynamoClient.send(new QueryCommand(params));

    if (result.$metadata.httpStatusCode !== 200) {
      console.log(result);
      return sendResponse(500, "Internal error");
    }

    if (!result.Items) {
      return sendResponse(200, { message: "No meters exist for user" });
    }

    return sendResponse(200, {
      message: "Successfully retreived meters",
      data: result.Items.map((item) => unmarshall(item)),
    });
  } catch (error) {
    return sendResponse(500, error);
  }
};
