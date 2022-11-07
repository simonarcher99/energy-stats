import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { z } from "zod";
import { sendResponse } from "../auth/utils";

const addMeterSchema = z.object({
  userId: z.string(),
  retailer: z.string(),
  gasOrElectric: z.enum(["electric", "gas"]),
  meterName: z.string(),
  meterSerialNumber: z.string(),
  mpxn: z.string(),
  apiKey: z.string(),
});

const METER_TABLE_NAME = process.env.meter_table as string;

export const handler = async (event: any) => {
  try {
    const parsedEvent = addMeterSchema.safeParse(JSON.parse(event.body));
    console.log(`body: ${event.body}`);
    console.log(`Input is valid: ${parsedEvent.success}`);
    if (!parsedEvent.success) {
      return sendResponse(400, { message: "Invalid input" });
    }

    const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

    const params = {
      TableName: METER_TABLE_NAME,
      // TODO: can marshall be used here
      Item: {
        userId: { S: parsedEvent.data.userId },
        meterSerialNumber: { S: parsedEvent.data.meterSerialNumber },
        retailer: { S: parsedEvent.data.retailer },
        gasOrElectric: { S: parsedEvent.data.gasOrElectric },
        meterName: { S: parsedEvent.data.meterName },
        mpxn: { S: parsedEvent.data.mpxn },
        apiKey: { S: parsedEvent.data.apiKey },
      },
    };

    console.log("Sending to dynamo");
    try {
      const data = await dynamoClient.send(new PutItemCommand(params));
    } catch (error) {
      console.log(JSON.stringify(error));
      return;
    }
    console.log("Sent to dynamo");
    return sendResponse(200, { message: "Meter succcesfully added to db" });
  } catch (error) {
    return sendResponse(500, error);
  }
};
