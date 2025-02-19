const router = require('express').Router();
const {pick} = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../../models');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create
router.post('/', async (req, res) => {
  try {
    const {email, password} = req.body;
    const values = {email, password};
    
    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
      return res.status(409).json({error: 'E-mail already taken'});
    }

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

// Get
router.get('/', async (req, res) => {
  const options = {};

  try {
    const users = await User.findAndCountAll(options);
    res.send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

// Get Specific
router.get('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findOne({where: {id}});
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  }
});

// Update
router.patch('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findOne({where: {id}});
    if (!user) return res.sendStatus(404);

    const updatedUser = await user.update(pick(req.body,
      'password'
    ));
    res.send(updatedUser);
  } catch (e) {
    console.error('Error updating user:', e);
    res.status(500).json({error: 'Could not update user'});
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findOne({where: {id}});
    if (!user) return res.sendStatus(404);

    user.destroy();
    return res.send({});
  } catch (e) {
    res.sendStatus(500);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});
    if (!user) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    // Compare password w/ passwordHash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({error: 'Invalid credentials'});
    }

    // Genereate a JWT token
    const shortUser = {id: user.id, email: user.email};
    const token = jwt.sign(shortUser, JWT_SECRET, {expiresIn: '1h'});

    res.json({token, user: shortUser});
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = router;
