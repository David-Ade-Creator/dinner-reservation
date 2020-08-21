"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _menuModel = _interopRequireDefault(require("../models/menuModel"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  const type = req.query.type ? {
    type: req.query.type
  } : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder ? req.query.sortOrder === 'lowest' ? {
    price: 1
  } : {
    price: -1
  } : {
    _id: -1
  };
  const menus = await _menuModel.default.find({ ...type,
    ...searchKeyword
  });
  res.send(menus);
});
router.post('/', _util.isAuth, _util.isAdmin, async (req, res) => {
  const menu = new _menuModel.default({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews
  });
  const newMenu = await menu.save();

  if (newMenu) {
    return res.status(201).send({
      message: 'New Meal Added',
      data: newMenu
    });
  }

  return res.status(500).send({
    message: ' Error in Creating Product.'
  });
});
router.put('/:id', _util.isAuth, _util.isAdmin, async (req, res) => {
  const menuId = req.params.id;
  const menu = await _menuModel.default.findById(menuId);

  if (menu) {
    menu.name = req.body.name;
    menu.price = req.body.price;
    menu.image = req.body.image;
    menu.type = req.body.type;
    menu.category = req.body.category;
    menu.countInStock = req.body.countInStock;
    menu.description = req.body.description;
    const updatedMenu = await menu.save();

    if (updatedMenu) {
      return res.status(200).send({
        message: 'Menu Updated',
        data: updatedMenu
      });
    }
  }

  return res.status(500).send({
    message: ' Error in Updating Menu.'
  });
});
router.delete('/:id', _util.isAuth, _util.isAdmin, async (req, res) => {
  const deletedMenu = await _menuModel.default.findById(req.params.id);

  if (deletedMenu) {
    await deletedMenu.remove();
    res.send({
      message: 'Menu Deleted'
    });
  } else {
    res.send('Error in Deletion.');
  }
});
router.get('/:id', async (req, res) => {
  const menu = await _menuModel.default.findOne({
    _id: req.params.id
  });

  if (menu) {
    res.send(menu);
  } else {
    res.status(404).send({
      message: 'menu Not Found.'
    });
  }
});
router.post('/:id/reviews', _util.isAuth, async (req, res) => {
  const menu = await _menuModel.default.findById(req.params.id);

  if (menu) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment
    };
    menu.reviews.push(review);
    menu.numReviews = menu.reviews.length;
    menu.rating = menu.reviews.reduce((a, c) => c.rating + a, 0) / menu.reviews.length;
    const updatedMenu = await menu.save();
    res.status(201).send({
      data: updatedMenu.reviews[updatedMenu.reviews.length - 1],
      message: 'Review saved successfully.'
    });
  } else {
    res.status(404).send({
      message: 'Menu Not Found'
    });
  }
});
var _default = router;
exports.default = _default;