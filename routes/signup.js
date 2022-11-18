const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const saltSteps = 12;

router.get('/', (req, res) => {
   res.render('signup')
})

router.post('/', async (req, res) => {
    const { email, username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, saltSteps)
    User.create({email, username, password: passwordHash})
    .then((newUser) => res.redirect(`/signup/${newUser.username}`))
}
)

router.get('/:username', (req, res) => {
    const { username } = req.params;
    User.findOne({username:username})
    .then(foundUser => res.render('user', {user:foundUser}))
})

module.exports = router;