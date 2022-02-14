const express = require('express');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const connectDatabase = require('./helpers/database/connect');
const errorHandler = require('./middlewares/errors/errorHandler');

const app = express();

dotenv.config({
    path: "./config/env/config.env"
})
connectDatabase();

app.use(express.json());

const PORT = process.env.PORT;

app.use("/api/users", userRoute);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App Started on ${PORT} in ${process.env.NODE_ENV}`);
});