import { KendraClient, QueryCommand } from "@aws-sdk/client-kendra"; // ES Modules import
  
// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");  
const fetchSearchResults = async (searchTerm) => {
  console.log(process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID);
  console.log(process.env.NEXT_PUBLIC_AWS_DB_INDEX_ID);
  const SESConfig = {
    // apiVersion: "2010-12-01",
    apiVersion: process.env.NEXT_PUBLIC_AWS_API_VERSION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_PASS_KEY,
    },
    region: process.env.NEXT_PUBLIC_AWS_REGION
  }

  AWS.config.update(SESConfig);

  console.log(AWS.config);
  // Create the IAM service object
  var iam = new AWS.IAM({ apiVersion: process.env.NEXT_PUBLIC_AWS_API_VERSION });
  var params = {
    UserName: process.env.NEXT_PUBLIC_AWS_IAM_USERNAME,
  };
  iam.getUser(params, function (err, data) {
    if (err && err.code === "NoSuchEntity") {
      iam.createUser(params, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
        }
      });
    } else {
      console.log(
        "User " + data.User.UserName + " already exists",
        data.User.UserId
      );
    }
  });

  // Kendra - query from client

  const client = new KendraClient(AWS.config);
  const input = {
    IndexId: process.env.NEXT_PUBLIC_AWS_DB_INDEX_ID,
    QueryText: searchTerm,
  };
  console.log(input); 
  const command = new QueryCommand(input);
  const searchPromise = await client.send(command);
 
  return searchPromise;
}
export default fetchSearchResults;