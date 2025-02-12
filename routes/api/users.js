const router = require('express').Router();
// const {pick} = require('lodash');
const {User} = require('../../models');

// Create
router.post('/', async (req, res) => {
  try {
    const {email, password} = req.body;
    const values = {email, password};
    const newUser = await User.create(values);
    res.send({
      email: newUser.email, 
      id: newUser.id, 
      createdAt: newUser.createdAt, 
      updatedAt: newUser.updatedAt
    });
  } catch (e) {
    // bad luck charly
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
