//necessary imports are made
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

//backend routing mechanisms for the main applications URLs
const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//to allow for large images and for requests

app.use(cors());
//express routing
app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.get('/', (req, res) => {
    res.send('Application Run Successful.'); //request response function for when the backend of the application is successful
});
//const CONNECTION_URL = 'mongodb+srv://shildev:shildev123@cluster0.wthei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000; //express porting
//mongoose connection to cloud
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}) //connection to mongoose database
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))) //message displayed if connection is successful and connection to the port is made
    .catch((error) => console.error(error.message));
