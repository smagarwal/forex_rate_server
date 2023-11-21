import { DynamoDBClient, GetItemCommand, QueryCommand  } from "@aws-sdk/client-dynamodb";


export const forex_db_day = async (req, res) => {

  try{

    const client = new DynamoDBClient({region: 'us-east-2', credentials:{accessKeyId:process.env.ACCESS_KEY_ID ,secretAccessKey:process.env.SECRET_ACCESS_KEY}});
    const input_query = {
      "ExpressionAttributeValues": {
        ":v1": {
          "S": req.body.my_date
        }
      },
      "KeyConditionExpression": "my_date = :v1",
      "TableName": "my_forex_table"
    };

    const command_query = new QueryCommand(input_query);
    const response = await client.send(command_query);

    const plainResponse = response.Items.map((dbStyle)=>{

      const plainStyle ={};
      
      Object.keys(dbStyle).forEach((key)=>{
        const val = dbStyle[key]["S"]; 
        plainStyle[key] = val;
      }) 

      return plainStyle; 

    })


    res.status(200).json(plainResponse);

  }catch(err){
    res.status(404).json({Error: err});
  }
};

