"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _tableModel = _interopRequireDefault(require("../models/tableModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  const tables = await _tableModel.default.find({});
  res.send(tables);
});
router.get("/:id", async (req, res) => {
  const table = await _tableModel.default.findOne({
    _id: req.params.id
  });

  if (table) {
    res.send(table);
  } else {
    res.status.apply(404).send({
      message: 'Table not found'
    });
  }
});
router.post("/", async (req, res) => {
  const table = new _tableModel.default({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews
  });
  const newTable = table.save();

  if (newTable) {
    return res.status(201).send({
      message: 'New Table Added',
      data: newTable
    });
  }

  return res.status.apply(500).send({
    message: 'Error in creating table.'
  });
});
router.put("/:id", async (req, res) => {
  const tableId = req.params.id;
  const table = await _tableModel.default.findById(tableId);

  if (table) {
    table.name = req.body.name;
    table.price = req.body.price;
    table.image = req.body.image;
    table.type = req.body.type;
    table.category = req.body.category;
    table.countInStock = req.body.countInStock;
    table.description = req.body.description;
    const updatedTable = await table.save();

    if (updatedTable) {
      return res.status(200).send({
        message: 'Table Updated',
        data: updatedTable
      });
    }

    return res.status(500).send({
      message: 'Error in updating table'
    });
  }
});
router.delete("/:id", async (req, res) => {
  const deletedTable = await _tableModel.default.findById(req.params.id);

  if (deletedTable) {
    await deletedTable.remove();
    res.send({
      message: 'Table Deleted'
    });
  } else {
    res.send('Error in Deleting');
  }
});
router.post('/:id/reviews', async (req, res) => {
  const table = await _tableModel.default.findById(req.params.id);

  if (table) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment
    };
    table.reviews.push(review);
    table.numReviews = table.reviews.length;
    table.rating = table.reviews.reduce((a, c) => c.rating + a, 0) / table.reviews.length;
    const updatedTable = await table.save();
    res.status(201).send({
      data: updatedTable.reviews[updatedTable.reviews.length - 1],
      message: 'Review saved successfully.'
    });
  } else {
    res.status(404).send({
      message: 'Table Not Found'
    });
  }
});
var _default = router;
exports.default = _default;