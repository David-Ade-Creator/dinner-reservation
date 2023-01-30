import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import tableRoute from './routes/tableRoute.js';
import menuRoute from './routes/menuRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser : true,
    useUnifiedTopology: true ,
    useCreateIndex: true
}).catch(error => console.log(error.reason));


const app = express();
app.use(bodyParser.json());
app.use("/api/uploads", uploadRoute);
app.use("/api/tables", tableRoute);
app.use("/api/users", userRoute);
app.use("/api/menus", menuRoute);
app.use("/api/orders", orderRoute);
app.get('/api/config/paypal', (req, res) => {
    res.send(config.PAYPAL_CLIENT_ID);
  });


//   app.use(express.static(path.join(__dirname, '/../realstate/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/../realstate/build/index.html`));
//     });

app.listen(8000, () => {
    console.log("server started at http://localhost:8000")
})
