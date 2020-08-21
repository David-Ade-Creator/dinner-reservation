"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _tableRoute = _interopRequireDefault(require("./routes/tableRoute"));

var _menuRoute = _interopRequireDefault(require("./routes/menuRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

var _uploadRoute = _interopRequireDefault(require("./routes/uploadRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongodbUrl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use("/api/uploads", _uploadRoute.default);
app.use("/api/tables", _tableRoute.default);
app.use("/api/users", _userRoute.default);
app.use("/api/menus", _menuRoute.default);
app.use("/api/orders", _orderRoute.default);
app.get('/api/config/paypal', (req, res) => {
  res.send(_config.default.PAYPAL_CLIENT_ID);
}); // app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));

app.use(_express.default.static(path.join(__dirname, '/../realstate/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../realstate/build/index.html`));
});
app.listen(8000, () => {
  console.log("server started at http://localhost:8000");
});