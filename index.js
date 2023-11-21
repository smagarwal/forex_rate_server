import express from "express"
import helmet from "helmet";
import morgan from "morgan";
import forex_db_route from './routes/forex_db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from "body-parser";

dotenv.config();

/* CONFIGURATION */
const app = express(); // configuring express 
app.use(express.json()); //middleware available in express to parse json paylod and use the res easily by endpoints

app.use(helmet()); //prevent common web vulnerability
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); //policies for type of resources over cross-origin

app.use(cors()); //allow cross-origin for api endpoint req and resource share 

app.use(morgan("common")); //loggiing the req on console in a particular format - here using "common"
app.use(bodyParser.json({limit: "30mb" , extended: true}));  // configure as per req**

/*ROUTES*/
app.use('/forex_db', forex_db_route);

//start 
const PORT = process.env.PORT

app.listen(PORT, () => console.log (`Server Port: ${PORT}`));



