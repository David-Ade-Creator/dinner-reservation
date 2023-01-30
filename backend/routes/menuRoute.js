import express from 'express';
import Menu from '../models/menuModel.js';
import { isAuth, isAdmin } from '../util.js';


const router = express.Router();

router.get("/", async (req,res)=> {
  const type = req.query.type ? { type: req.query.type} : {};
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const sortOrder = req.query.sortOrder? req.query.sortOrder === 'lowest' 
  ? {price: 1} 
  : {price: -1}
  :{_id: -1};
  const menus = await Menu.find({...type, ...searchKeyword});
  res.send(menus);
});


router.post('/', isAuth, isAdmin, async (req, res) => {
  const menu = new Menu({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    type: req.body.type,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const newMenu = await menu.save();
  if (newMenu) {
    return res
      .status(201)
      .send({ message: 'New Meal Added', data: newMenu });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const menuId = req.params.id;
  const menu = await Menu.findById(menuId);
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
      return res
        .status(200)
        .send({ message: 'Menu Updated', data: updatedMenu });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Menu.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedMenu = await Menu.findById(req.params.id);
  if (deletedMenu) {
    await deletedMenu.remove();
    res.send({ message: 'Menu Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.get('/:id', async (req, res) => {
  const menu = await Menu.findOne({ _id: req.params.id });
  if (menu) {
    res.send(menu);
  } else {
    res.status(404).send({ message: 'menu Not Found.' });
  }
});


router.post('/:id/reviews', isAuth, async (req, res) => {
  const menu = await Menu.findById(req.params.id);
  if (menu) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    menu.reviews.push(review);
    menu.numReviews = menu.reviews.length;
    menu.rating =
      menu.reviews.reduce((a, c) => c.rating + a, 0) /
      menu.reviews.length;
    const updatedMenu = await menu.save();
    res.status(201).send({
      data: updatedMenu.reviews[updatedMenu.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Menu Not Found' });
  }
});

export default router;