const express = require('express');
const connectDB = require('./config/dbConnection');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();
require('./utils/routes')(app);

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}...`);
});