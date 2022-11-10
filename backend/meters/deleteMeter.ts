import { sendResponse } from "../auth/utils";
import { z } from "zod";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const deleteMeterSchema = z.object({
  userId: z.string(),
  meterSerialNumber: z.string(),
});

const METER_TABLE_NAME = process.env.meter_table as string;

export const handler = async (event: any) => {
  try {
    const parsedEvent = deleteMeterSchema.safeParse(JSON.parse(event.body));
    console.log(`body: ${event.body}`);
    console.log(`Input is valid: ${parsedEvent.success}`);
    if (!parsedEvent.success) {
      return sendResponse(400, { message: "Invalid input" });
    }
    const { userId, meterSerialNumber } = parsedEvent.data;

    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

    const params = {
      TableName: METER_TABLE_NAME,
      Key: {
        userId,
        meterSerialNumber,
      },
    };

    try {
      await dynamoClient.send(new DeleteCommand(params));
      console.log("Success - item deleted");
    } catch (error) {
        console.log(error)
      console.log("Did not manage to delete item");
      return sendResponse(500, { message: "Unable to delete meter" });
    }
    return sendResponse(200, { message: "Success" });
  } catch (error) {
    return sendResponse(500, error);
  }
};
