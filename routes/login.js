const User = require('../models/User.model');

const router = require('express').Router();

const bcrypt = require('bcryptjs');

const { loggedIn, loggedOut } = require('../middleware/route-guard.js');

router.get('/', loggedOut, (req, res)=> {
    res.render('login')
})



router.post('/', async (req, res) => {
    console.log('SESSION:', req.session)
    const { userData, password } = req.body;
    const findUser = () => userData.includes('@') ? User.findOne({ email:userData }) : User.findOne({ username:userData })
    await findUser()
    .then (foundUser => {
        if(!foundUser) {
            res.render('login', {erorMessage: "User not registered"})
        }
        else if(bcrypt.compareSync(password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect('/login/user')
            
        }
        else {
            res.render('login', {errorMessage : 'Incorrect password'})
        };
    }) .catch (err => res.send(err));

    if(userData === "" || password === ""){
        res.render('login', {errorMessage: 'Please enter both valid email/username and password'})
    }
    
})

router.get('/user', (req, res) => {
    res.render('user', { userInSession: req.session.currentUser});
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {res.send(err)}
        else res.redirect('/')
    })
})

router.get('/main', loggedIn, (req, res)=> {
 res.render('main', {successMessage: 'You are logged in! Enjoy this cat'})
})

router.get('/private', loggedIn, (req, res)=> {
    res.render('private', {successMessage: 'You are logged in! Enjoy the best meme in the world'})
})





module.exports = router;