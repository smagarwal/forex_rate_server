import express from "express";
import {forex_db_day} from '../controller/forex_db.js'

const router = express.Router();

//POST
router.post("/day", forex_db_day); 

export default router;