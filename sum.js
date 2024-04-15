// Import AWS SDK for DynamoDB
const AWS = require("aws-sdk");

// Create DynamoDB client
const dynamodb = new AWS.DynamoDB();

// Define parameters for checking if the table exists
const params = {
  TableName: "sumit-test", // Specify the table name
};

// Check if the table exists
const tableExists = async () => {
  try {
    await dynamodb.describeTable(params).promise();
    return true; // Table exists
  } catch (error) {
    if (error.code === "ResourceNotFoundException") {
      return false; // Table does not exist
    } else {
      throw error; // Other error occurred
    }
  }
};

// Define parameters for creating the tabl
const createTableParams = {
  TableName: "YourTableName", // Specify the table name
  KeySchema: [
    { AttributeName: "YourPartitionKey", KeyType: "HASH" }, // Specify the partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "YourPartitionKey", AttributeType: "S" }, // Specify the data type of the partition key
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5, // Adjust according to your read capacity needs
    WriteCapacityUnits: 5, // Adjust according to your write capacity needs
  },
};

// Example function to create a table in DynamoDB if it does not exist
exports.handler = async (event, context) => {
  try {
    // Check if the table exists
    const exists = await tableExists();

    // If the table does not exist, create it
    if (!exists) {
      await dynamodb.createTable(createTableParams).promise();
      return {
        statusCode: 200,
        body: JSON.stringify("DynamoDB table created successfully"),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify("DynamoDB table already exists"),
      };
    }
  } catch (error) {
    // Handle errors
    console.error("Error creating or checking DynamoDB table:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating or checking DynamoDB table",
      }),
    };
  }
};
