import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import tableRoute from './routes/tableRoute';
import menuRoute from './routes/menuRoute';
import orderRoute from './routes/orderRoute';
import uploadRoute from './routes/uploadRoute';
dotenv.config();

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


//app.get("/api/menus/:id", (req,res) => {
 //   const productId = req.params.id;
//    const menu = data.menus.find(x=>x._id === productId);
//    if(menu)
//    res.send(menu);
//    else
//    res.status(404).send({msg: "Menu Not Found"})
//});

app.get("/api/tables/:id", (req,res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
    res.send(product);
    else
    res.status(404).send({msg: "Tables Not Found"})
});

//app.get("/api/tables", (req,res) => {
//    res.send(data.products);
//});

app.listen(8000, () => {
    console.log("server started at http://localhost:8000")
})